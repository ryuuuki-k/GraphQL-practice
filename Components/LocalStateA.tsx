import { ChangeEvent, FormEvent, useState, VFC } from 'react';
import { todoVar } from '../cache';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';

const LocalStateA: VFC = () => {
  const [input, setInput] = useState('');
  const todos = useReactiveVar(todoVar);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    todoVar([...todoVar(), { title: input }]);
    setInput('');
  };

  return (
    <>
      <p className=" mb-3 font-bold ">makeVar</p>
      {todos.map((todo, i) => (
        <p key={i} className=" mb-3 my-1">
          {todo.title}
        </p>
      ))}
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-center items-center"
      >
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="New task ?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          type="submit"
          disabled={!input}
          className="disabled:opacity-40 mb-3 p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        >
          Add!!
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  );
};

export default LocalStateA;
