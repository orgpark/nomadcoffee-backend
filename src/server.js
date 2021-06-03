require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { getUser, protectResolver } from './users/users.utils';
import { typeDefs, resolvers } from './schema';

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      protectResolver,
    };
  },
});

const app = express();
app.use(logger('tiny'));
app.use('/static', express.static('uploads'));
apollo.applyMiddleware({ app });

const PORT = process.env.PORT;

app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
