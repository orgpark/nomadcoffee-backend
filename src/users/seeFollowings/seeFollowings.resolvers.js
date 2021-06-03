import client from '../../client';

export default {
  Query: {
    seeFollowings: async (_, { username, lastId }) => {
      const pageSize = 5;
      try {
        const followings = await client.user.findUnique({ where: { username } }).followings({
          take: pageSize,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });

        return {
          ok: true,
          followings,
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
