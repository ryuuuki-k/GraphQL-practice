import { ApolloServer, gql } from 'apollo-server';
import axios, { Axios, AxiosResponse } from 'axios';

import { User, Post } from './type';

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
`;

const resolvers = {
  Query: {
    hello: (parent, args) => `Hello ${args.name}`,
    users: async () => {
      const users: AxiosResponse<User[]> = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      return users.data;
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
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log('🚀 ~ file: index.ts ~ line 17 ~ url', url);
});
