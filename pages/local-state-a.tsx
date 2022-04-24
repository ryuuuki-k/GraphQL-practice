import { VFC } from 'react';
import Layout from '../Components/Layout';
import LocalStateA from '../Components/LocalStateA';

const localStateA: VFC = () => {
  return (
    <div>
      <Layout title="Local State A">
        <LocalStateA />
      </Layout>
    </div>
  );
};

export default localStateA;
