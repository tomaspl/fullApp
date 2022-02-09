import React, { useContext } from 'react';
import TokenContext from 'contexts/TokenContext'

export default function Books() {
  let [token] = useContext(TokenContext);

  return (
    <>
    <div>List of books</div>
    <p>Token: {token}</p>
    </>
  );
}
