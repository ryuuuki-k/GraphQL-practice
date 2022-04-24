import { ChangeEvent, FormEvent, memo, VFC } from 'react';

interface Props {
  clg: () => void;
}

const Childe: VFC<Props> = ({ clg }) => {
  return (
    <>
      {console.log('Child rendered')}
      <p className=" text-pink-400">Child Components</p>
      <button onClick={clg} className="bg-yellow-300 rounded-lg p-1">
        click
      </button>
    </>
  );
};

// Propsで受取るclg関数が親コンポーネントで再生性されるため、
// Childコンポーネントをmemo化しただけでは最適化できない
export default memo(Childe);
