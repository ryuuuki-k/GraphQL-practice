import { ChangeEvent, FormEvent, useState, VFC } from 'react';
import { todoVar } from '../cache';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';

// makeVar(todoVar)が他のコンポーネントから読み込めるかを検証するコンポーネント
const LocalStateB: VFC = () => {
  const todos = useReactiveVar(todoVar);
  return (
    <div>
      {todos.map((todo, i) => (
        <p key={i}>{todo.title}</p>
      ))}
      <Link href="/local-state-a">
        <a>back</a>
      </Link>
    </div>
  );
};

export default LocalStateB;
