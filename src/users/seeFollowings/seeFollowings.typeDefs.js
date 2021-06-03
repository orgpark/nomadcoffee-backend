import { gql } from 'apollo-server';

export default gql`
  type SeeFollowingsQuery {
    ok: Boolean!
    error: String
    followings: [User]
    totalPages: Int
  }
  type Query {
    seeFollowings(username: String!, lastId: Int): SeeFollowingsQuery!
  }
`;
