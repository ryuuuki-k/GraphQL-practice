import { useState, ChangeEvent } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { CreateTodoMutationVariables } from '../API';
import { createTodo } from '../graphql/mutations';

const AddTodo = () => {
  const [task, setTask] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setTaskDescription(e.target.value);

  const handleSubmit = async () => {
    if (!task || !taskDescription) return;

    const newTodo: CreateTodoMutationVariables = {
      input: { name: task, description: taskDescription },
    };

    try {
      await API.graphql(graphqlOperation(createTodo, newTodo));
    } catch (e) {
      console.log(e);
    }

    setTask('');
    setTaskDescription('');
  };

  return (
    <>
      <input onChange={handleChangeTask} placeholder="new Task" />
      <input
        onChange={handleChangeDescription}
        placeholder="New Task Description"
      />
      <button onClick={handleSubmit}>Add Task!!</button>
    </>
  );
};

export default AddTodo;
