const { ApolloServer, gql, UserInputError } = require("apollo-server");
const axios = require("axios");
const typeDefs = gql`

  type Token {
    _id: ID!
    token: String
  }

  type User {
    name: String
    email: String
    password: String
    booksRented: [Book]
    tokens: [Token]
    token: String
    _id: ID!
  }

  type Comment {
    comment: String,
    author: User
  }

  type Book {
    title: String
    description: String
    editorial: String
    _id: ID!
    average: Float
    comments: [Comment]
    currentRenter: User,
    renters: [User]
  }

  type Query {
    allUsers: [User]
    allBooks: [Book]
    getBookById(id: ID!): Book
    getCommentsByBookId(bookId: ID!): [Comment]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    deleteUser(id: ID!): User
    commentBook(bookId: ID!, comment: String): Comment
    rateBook(id: ID!, stars: Int): Book
    rentBook(id: ID!): Book
    returnBook(id: ID!): Book
    login(email: String, password: String): User
  }
`;

let token = '';

const resolvers = {
  Query: {
    allUsers: async (root, args, context) => {
      const response = await axios.get("http://localhost:8000/users", {headers: {
        'Authorization': context.token
      }});
      return response.data.users;
    },
    allBooks: async (root, args, context) => {
      const response = await axios.get("http://localhost:8000/books", {headers: {
        'Authorization': context.token,
      }});
      return response.data.books;
    },
    getBookById: async (root, args, context) => {
      const {id} = args
      const response = await axios.get("http://localhost:8000/book", {headers: {
        'Authorization': context.token
      }, data: {id}});
      return response.data.book;
    },
    getCommentsByBookId: async (root, args, context) => {
      const response = await axios.get(`http://localhost:8000/comments/book/${args.bookId}`, {headers: {
        'Authorization': context.token
      }});
      return response.data;
    }
  },
  Book: {
    currentRenter: (root) => root.renters[root.renters-1],
    average: (root) => root.amountOfStars / root.amountOfVoters
  },
  User: {
    token: (root) => root.tokens[root.tokens.length - 1].token
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
    commentBook: async (root, args, context) => {
      const comment = await axios.post("http://localhost:8000/comments/book/create", { ...args }, {headers: {
        'Authorization': context.token
      }});
      return comment.data
    },
    rateBook: async (root, args, context) => {
      const book = await axios.post("http://localhost:8000/book/rate", { ...args }, {headers: {
        'Authorization': context.token
      }});
      return book.data
    },
    rentBook: async (root, args, context) => {
      const book = await axios.post("http://localhost:8000/book/rent", { ...args }, {headers: {
        'Authorization': context.token
      }});
      return book.data
    },
    returnBook: async (root, args, context) => {
      const book = await axios.post("http://localhost:8000/book/return", { ...args }, {headers: {
        'Authorization': context.token
      }});
      return book.data
    },
    login: async (root, args) => {
      try {
        const response = await axios.post("http://localhost:8000/user/login", { ...args });
        return response.data.user
      } catch (e) {
        throw new UserInputError('Error on credentials')
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
  // get the user token from the headers
  token = req.headers.authorization || '';
  return {token}
 } });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
