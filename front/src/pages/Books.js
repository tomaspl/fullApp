import React, { useContext, useEffect, useState } from 'react';
import { BOOKS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import TokenContext from 'contexts/TokenContext';

export default function Books() {
  let [token] = useContext(TokenContext);
  const {loading, error, data } = useQuery(BOOKS, {context:{headers:{"Authorization": token}}})
  const [currentBooks, setCurrentBooks] = useState([])
  const handleOnChange = (e) => {
    setCurrentBooks(data?.allBooks.filter(b => b.title.indexOf(e.target.value) > -1))
  }
  useEffect(() => {setCurrentBooks(data?.allBooks)},[data])
  if(error) return 'Error on loading';
  return (
    <>
      <input type="text" onChange={handleOnChange} />
      <p>Books:</p>
      {loading ? 'Loading...' : currentBooks?.map(b => <p key={b._id}>{b.title} - {b.description}</p>)}
    </>
  );
}
