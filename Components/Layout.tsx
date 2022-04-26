import Head from 'next/head';
import { ReactNode, VFC } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

const Layout: VFC<Props> = ({ children, title = 'NextJs' }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <main className="">{children}</main>
    </div>
  );
};

export default Layout;
