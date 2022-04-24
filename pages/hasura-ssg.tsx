import { data } from 'autoprefixer';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { VFC } from 'react';
import Layout from '../Components/Layout';
import { initializeApollo } from '../lib/apolloClient';
import { GET_USERS } from '../queries/queries';
import {
  GetUsersQuery,
  Users,
  Users_Constraint,
} from '../types/generated/graphql';

interface Props {
  users: {
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>[];
}

const HasuraSSG: VFC<Props> = ({ users }) => {
  return (
    <div>
      <Layout title="SSG + ISR">
        <p className="">{'SSG & ISR'}</p>
        {users?.map((user) => (
          <Link key={user.id} href={`users/${user.id}`}>
            <a className="">{user.name}</a>
          </Link>
        ))}
      </Layout>
    </div>
  );
};

export default HasuraSSG;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  });
  return {
    props: { users: data.users },
    revalidate: 1,
  };
};
