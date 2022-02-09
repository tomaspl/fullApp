const { gql } = require("@apollo/client");

const USERS = gql`
  {
    allUsers {
      name
      _id
    }
  }
`;

const BOOKS = gql`
  {
    allBooks {
      title,
      description,
      _id
    }
  }
`;

export { USERS, BOOKS };
