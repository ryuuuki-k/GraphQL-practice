import { VFC } from 'react';
import CreateUser from '../Components/CreateUser';
import Layout from '../Components/Layout';

const HooksMemo: VFC = () => {
  return (
    <Layout title="Hooks + memo">
      <CreateUser />
    </Layout>
  );
};

export default HooksMemo;
