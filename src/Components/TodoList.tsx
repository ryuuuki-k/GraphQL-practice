import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

import { ListTodosQuery, OnCreateTodoSubscription } from '../API';
import { listTodos } from '../graphql/queries';
import { onCreateTodo } from '../graphql/subscriptions';

type Todo = {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

type TodoSubscription = { value: { data: OnCreateTodoSubscription } };

const TodoList = () => {
  const [posts, setPosts] = useState<Todo[]>([]);

  const fetchData = async () => {
    const result = await API.graphql(graphqlOperation(listTodos));
    if ('data' in result && result.data) {
      const posts = result.data as ListTodosQuery;
      if (posts.listTodos) setPosts(posts.listTodos.items as Todo[]);
    }
  };

  const todoSubscription = () => {
    const client = API.graphql(graphqlOperation(onCreateTodo));

    if ('subscribe' in client) {
      const next = ({ value: { data } }: TodoSubscription) => {
        if (data.onCreateTodo) {
          const post: Todo = data.onCreateTodo;
          setPosts((prev) => [...prev, post]);
        }
      };

      client.subscribe({
        next,
      });
    }
  };

  useEffect(() => {
    fetchData();
    todoSubscription();
  }, []);

  return (
    <>
      {posts?.map(({ id, name, description, createdAt, updatedAt }) => (
        <div key={id}>
          <p>name: {name}</p>
          <p>desciption: {description}</p>
          <p>createdAt: {createdAt}</p>
          <p>updatedAt: {updatedAt}</p>
        </div>
      ))}
    </>
  );
};

export default TodoList;
