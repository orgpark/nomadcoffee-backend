import { gql } from 'apollo-server';

export default gql`
  type CreateAccountResult {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String! # type is DateTime in schema.prisma
    updatedAt: String! # type is DateTime in schema.prisma
  }
  type Mutation {
    createAccount(firstName: String!, lastName: String, username: String!, email: String!, password: String!): CreateAccountResult!
  }
`;
