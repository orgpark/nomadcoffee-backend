import { gql } from 'apollo-server';

export default gql`
  type User {
    id: String!
    createdAt: String! # type is DateTime in schema.prisma
    updatedAt: String! # type is DateTime in schema.prisma
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    followings: [User]
    followers: [User]
    totalFollowers: Int! # calculated field
    totalFollowings: Int! # calculated field
    isMe: Boolean! # calculated field
    isFollowing: Boolean! # calculated field
  }
`;
