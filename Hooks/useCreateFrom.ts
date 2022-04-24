import { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { CreateUserMutation } from './../types/generated/graphql';
import { CREATE_USER } from '../queries/queries';
import { useMutation } from '@apollo/client';

export const useCreateFrom = () => {
  const [text, setText] = useState('');
  const [userName, setUserName] = useState('');

  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data: { insert_users_one } }) {
      const cacheId = cache.identify(insert_users_one);
      cache.modify({
        fields: {
          users(existingUsers, { toReference }) {
            return [toReference(cacheId), ...existingUsers];
          },
        },
      });
    },
  });

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const userNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const clg = useCallback(() => {
    console.log('hello');
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await insert_users_one({
          variables: { name: userName },
        });
      } catch (error) {
        alert(error);
      }
      setUserName('');
    },
    [userName]
  );

  return {
    text,
    handleSubmit,
    userName,
    userNameChange,
    clg,
    handleTextChange,
  };
};
