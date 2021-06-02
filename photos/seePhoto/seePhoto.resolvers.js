import { gql } from 'apollo-server';
import client from '../../client';

export default {
  Query: {
    seePhoto: (_, { id }) =>
      client.photo.findUnique({
        where: {
          id,
        },
      }),
  },
};
