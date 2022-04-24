import Head from 'next/head';
import Link from 'next/link';
import { ReactNode, VFC } from 'react';

interface Props {
  children: ReactNode;
  title: string;
}

const Layout: VFC<Props> = ({
  children,
  title = 'GraphQL x Apollo Client',
}) => {
  const navStyle = 'hover:bg-gray-600 px-3 py-2 rounded';
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-300 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className={navStyle}>Home</a>
              </Link>
              <Link href="/local-state-a">
                <a className={navStyle}>makeVar</a>
              </Link>
              <Link href="/hasura-main">
                <a className={navStyle}>fetch(Hasura)</a>
              </Link>
              <Link href="/hasura-crud">
                <a className={navStyle}>CRUD</a>
              </Link>
              <Link href="/hasura-ssg">
                <a className={navStyle}>SSG</a>
              </Link>
              <Link href="/hooks-memo">
                <a className={navStyle}>hook + memo</a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="text-gray-800 flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;
