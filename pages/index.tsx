import Head from 'next/head';
import Link from 'next/link';
import Layout from '../Components/Layout';
import RocketItem from '../Components/RocketItem';
import { useQueryRockets } from '../Hooks/useQueryRockets';
import styles from '../styles/Home.module.css';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';

export default function Home() {
  const { status, data } = useQueryRockets();

  if (status === 'loading') return <Layout title="">Loading..</Layout>;
  if (status === 'error') return <Layout title="">Error</Layout>;

  return (
    <Layout title="">
      <p className=" text-blue-600 m-4 font-bold text-lg">Fetch Data!!</p>
      <ul>
        {data?.map((rocket) => (
          <RocketItem key={rocket.id} rocket={rocket} />
        ))}
      </ul>
      <Link href="/read-cache">
        <div className="flex flex-col justify-center items-center hover:text-green-700">
          <ChevronDoubleRightIcon className=" h-5 w-5 m-1" />
        </div>
      </Link>
    </Layout>
  );
}
