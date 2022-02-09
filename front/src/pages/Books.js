import React, { useContext } from 'react';
import { BOOKS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import TokenContext from 'contexts/TokenContext';

export default function Books() {
  let [token] = useContext(TokenContext);
  const {loading, error, data } = useQuery(BOOKS, {context:{headers:{"Authorization": token}}})
  if(error) return 'Error on loading';
  return (
    <>
    <div>List of books</div>
    <p>Books:</p>
    {loading ? 'Loading...' : data?.allBooks.map(b => <p key={b._id}>{b.title} - {b.description}</p>)}
    </>
  );
}
