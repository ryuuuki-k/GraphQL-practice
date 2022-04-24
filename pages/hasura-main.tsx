import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { VFC } from 'react';
import Layout from '../Components/Layout';
import { GET_USERS } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';

const HasuraMainFetch: VFC = () => {
  const { data, error, loading } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  if (error)
    return (
      <Layout title="Hasura Fetch">
        <p>{error.message}</p>
      </Layout>
    );

  return (
    <div>
      <Layout title="Hasura Fetch">
        <p>Hasura main page</p>
        {data?.users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
        <Link href="/hasura-sub">
          <a>Next</a>
        </Link>
      </Layout>
    </div>
  );
};

export default HasuraMainFetch;
