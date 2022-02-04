const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
    _id: ID
  }

  type Query {
    allUsers: [User]
  }

  type Mutation {
    addUser(name: String, email: String, password: String): User
    deleteUser(id: ID): User
  }
`;

const resolvers = {
  Query: {
    allUsers: async () => {
      const response = await axios.get("http://localhost:8000/users");
      return response.data.users;
    },
  },
  Mutation: {
    addUser: async (root, args) => {
      const user = { ...args };
      await axios.post("http://localhost:8000/user", { ...user });
      return user;
    },
    deleteUser: async (root, args) => {
      const user = await axios.delete(`http://localhost:8000/users/${args.id}`);
      return user.data;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
