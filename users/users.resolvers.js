import client from '../client';

export default {
  User: {
    totalFollowings: ({ id }) => {
      return client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      });
    },
    totalFollowers: ({ id }) => {
      return client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      });
    },
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user
        .findUnique({
          where: {
            username: loggedInUser.username,
          },
        })
        .followings({
          where: {
            id,
          },
        });

      return exists.length !== 0;
    },
  },
};
