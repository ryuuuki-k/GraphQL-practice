import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { VFC } from 'react';
import Layout from '../Components/Layout';
import { GET_USERS, GET_USERS_LOCAL } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';

const HsuraSubFetch: VFC = () => {

  // const { data, error } = useQuery<GetUsersQuery>(GET_USERS; // Fetchでデータを受け取る
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS_LOCAL); // 一度Fetchで受けとったcache
  return (
    <div>
      <Layout title="Hasura cache">
        <p>cache</p>
        {data?.users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
        <Link href="/hasura-main">
          <a>Back</a>
        </Link>
      </Layout>
    </div>
  );
};

export default HsuraSubFetch;
