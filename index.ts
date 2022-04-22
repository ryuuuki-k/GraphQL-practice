import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import axios, { Axios, AxiosResponse } from 'axios';

import { User, Post } from './type';

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    myPosts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    userId: ID!
  }

  type Query {
    hello(name: String!): String
    users: [User]
    user(id: ID!): User
    posts: [Post]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String!): User
    deleteUser(id: Int!): User
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: async () => {
      // const users: AxiosResponse<User[]> = await axios.get(
      //   'https://jsonplaceholder.typicode.com/users'
      // );
      // return users.data;
      return prisma.user.findMany();
    },
    user: async (parent, args) => {
      const user: AxiosResponse<User> = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${args.id}`
      );
      const userPosts: AxiosResponse<Post[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const myPosts = userPosts.data.filter(
        (post) => post.userId.toString() === args.id
      );
      const result = {
        ...user.data,
        myPosts,
      };
      return result;
    },
    posts: async () => {
      const res: AxiosResponse<Post[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      return res.data;
    },
  },
  Mutation: {
    createUser: (_, args) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    updateUser: (_, args) => {
      return prisma.user.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    deleteUser: (_, args) => {
      return prisma.user.delete({
        where: { id: args.id },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log('🚀 ~ file: index.ts ~ line 17 ~ url', url);
});
