import { VFC } from 'react';
import Layout from '../Components/Layout';
import LocalStateB from '../Components/LocalStateB';

const localStateB: VFC = () => {
  return (
    <div>
      <Layout title="Local State B">
        <LocalStateB />
      </Layout>
    </div>
  );
};

export default localStateB;
