import { VFC } from 'react';
import { useCreateFrom } from '../Hooks/useCreateFrom';
import Childe from './Childe';

const CreateUser: VFC = () => {
  const {
    text,
    handleSubmit,
    userName,
    userNameChange,
    clg,
    handleTextChange,
  } = useCreateFrom();

  return (
    <>
      {console.log('CreateUser Components rendered')}
      <p className=" text-lg m-3">Custom Hooks</p>
      <label>Text</label>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className=" border m-3"
      />
      <div>
        <form onSubmit={handleSubmit}>
          <label>User Name →</label>
          <input
            type="text"
            value={userName}
            onChange={userNameChange}
            className=" m-3  border-2"
          />
          <button type="submit" className=" bg-green-400 rounded p-1">
            Submit
          </button>
        </form>
      </div>
      <Childe clg={clg} />
    </>
  );
};

export default CreateUser;
