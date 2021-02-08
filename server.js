const { ApolloServer, gql } = require('apollo-server');
const typeDef = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};
