import client from '../../client';

export default {
  Query: {
    searchUsers: async (_, { keyword, lastUsername }) => {
      const pageSize = 5;
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: pageSize,
        skip: lastUsername ? 1 : 0,
        ...(lastUsername && { cursor: { username: lastUsername } }),
      });
      return users;
    },
  },
};
