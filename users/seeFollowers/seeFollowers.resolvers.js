import client from '../../client';

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const pageSize = 2;
      try {
        const followers = await client.user.findUnique({ where: { username } }).followers({ take: pageSize, skip: (page - 1) * pageSize });

        const totalFollowers = await client.user.count({
          where: { followings: { some: { username } } },
        });
        return {
          ok: true,
          followers,
          totalPages: Math.ceil(totalFollowers / pageSize),
        };
      } catch (e) {
        return {
          ok: false,
          error: e,
        };
      }
    },
  },
};
