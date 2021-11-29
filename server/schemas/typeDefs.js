const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    _id: ID!
    email: String
    username: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input BookInput {
    authors: [String]
    bookId: String!
    description: String!
    image: String
    title: String!
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: ID!): User
    saveBook(bookData: BookInput!): User
  }
  
  type Query {
    me: User
  }

  type Book {
    authors: [String]
    bookId: ID!
    description: String
    image: String
    title: String!
    link: String
  }
`;

module.exports = typeDefs;
