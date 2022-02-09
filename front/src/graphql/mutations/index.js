const { gql } = require("@apollo/client");

const NEW_USER = gql`
  mutation addUser($name: String, $email: String, $password: String) {
    addUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

const LOG_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name,
      token
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
      _id
    }
  }
`;

export { NEW_USER, DELETE_USER, LOG_USER };
