import Link from 'next/link';
import React from 'react';
import { useQueryClient } from 'react-query';
import Layout from '../Components/Layout';
import RocketItem from '../Components/RocketItem';
import { Rocket } from '../types/type';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';

const ReadCahce = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Rocket[]>('rokets');

  return (
    <Layout title="cahe">
      <p className=" text-blue-600 m-4 font-bold text-lg">Cache Data!!</p>
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
        ))}
      </ul>
      <Link href="/">
        <div className="flex flex-col justify-center items-center hover:text-green-700">
          <ChevronDoubleLeftIcon className=" h-5 w-5 m-1" />
        </div>
      </Link>
    </Layout>
  );
};

export default ReadCahce;
