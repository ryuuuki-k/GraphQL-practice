import { VFC, memo, Dispatch, SetStateAction } from 'react';
import { DeleteUserMutationFn, Users } from '../types/generated/graphql';

interface Props {
  user: {
    __typename?: 'users';
  } & Pick<Users, 'id' | 'name' | 'created_at'>;
  delete_users_by_pk: DeleteUserMutationFn;
  setEditedUser: Dispatch<SetStateAction<{ id: string; name: string }>>;
}

const UserItems: VFC<Props> = ({ user, delete_users_by_pk, setEditedUser }) => {
  console.log('rendring in UserItems Components');
  return (
    <div>
      <span className=" m-1">{user.name}</span>
      <span className=" m-1">{user.id}</span>
      <button
        className=" bg-green-300 rounded-md p-1"
        onClick={() => setEditedUser(user)}
      >
        Edit
      </button>
      <button
        className=" m-2 bg-gray-300 rounded-md p-1"
        onClick={async () => {
          await delete_users_by_pk({
            variables: {
              id: user.id,
            },
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default UserItems;
