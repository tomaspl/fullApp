import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER } from "graphql/mutations";
import { USERS } from "graphql/queries";

function Users() {
  const { loading, error, data } = useQuery(USERS);
  const [deleteUser, { loadingDelete, errorDelete }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: [{ query: USERS }],
    }
  );
  if (loading || loadingDelete) return <p>Loading...</p>;
  if (error || errorDelete) return <p>Error :(</p>;

  const onHandleClick = (id) => {
    deleteUser({ variables: { id } });
  };

  return (
    <>
      {data.allUsers.map(({ name, _id }) => (
        <div key={_id}>
          <p>{name}</p>
          <button onClick={(e) => onHandleClick(_id)}>X</button>
          <hr />
        </div>
      ))}
    </>
  );
}
export default Users;
