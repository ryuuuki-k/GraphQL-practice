import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, FormEvent, useState, VFC } from 'react';
import Layout from '../Components/Layout';
import UserItems from '../Components/UserItems';
import {
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from '../queries/queries';
import {
  CreateUserMutation,
  DeleteUserMutation,
  GetUsersQuery,
  UpdateUserMutation,
} from '../types/generated/graphql';

const HasuraCRUD: VFC = () => {
  const [editUser, setEditUser] = useState({ id: '', name: '' });
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });

  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER);

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
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              (user) => delete_users_by_pk.id !== readField('id', user)
            );
          },
        },
      });
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, name } = editUser;
    if (editUser.id) {
      try {
        await update_users_by_pk({
          variables: { id, name },
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await insert_users_one({ variables: { name } });
      } catch (error) {
        alert(error.message);
      }
    }
    setEditUser({ id: '', name: '' });
  };

  if (error) return <Layout title="CRUD Error">Error: {error.message}</Layout>;

  console.log('crud rendring');

  return (
    <div>
      <Layout title="">
        <p>Hasura CRUD</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className=" border m-3"
            placeholder="New User"
            value={editUser.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditUser({ ...editUser, name: e.target.value })
            }
          />
          <button
            disabled={!editUser.name}
            type="submit"
            className=" bg-indigo-200 p-1 rounded-sm"
          >
            {editUser.id ? 'Update' : 'Create'}
          </button>
        </form>
        {data?.users.map((user) => (
          <UserItems
            key={user.id}
            user={user}
            setEditedUser={setEditUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        ))}
      </Layout>
    </div>
  );
};

export default HasuraCRUD;
