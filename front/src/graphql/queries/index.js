const { gql } = require("@apollo/client");

const USERS = gql`
  {
    allUsers {
      name
      _id
    }
  }
`;

export { USERS };
