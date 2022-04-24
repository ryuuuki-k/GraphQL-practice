import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { VFC } from 'react';
import Layout from '../../Components/Layout';
import { initializeApollo } from '../../lib/apolloClient';
import { GET_USERS_ID, GET_USER_BY_ID } from '../../queries/queries';
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from '../../types/generated/graphql';

interface Props {
  user: {
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>;
}
const User: VFC<Props> = ({ user }) => {
  if (!user)
    return (
      <Layout title="">
        <p>Laoding ...</p>
      </Layout>
    );

  return (
    <Layout title="">
      <p className="">User</p>
      <p className="">
        {'ID: '}
        {user.id}
      </p>
      <p className="">{user.name}</p>
      <p className="">{user.created_at}</p>
      <Link href="/hasura-ssg">
        <a className="">Back to SSG Page</a>
      </Link>
    </Layout>
  );
};

export default User;

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERS_ID,
  });

  const paths = data.users.map(({ id }) => ({
    params: {
      id,
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    query: GET_USER_BY_ID,
    variables: { id: params.id },
  });

  return {
    props: {
      user: data.users_by_pk,
    },
    revalidate: 3,
  };
};

