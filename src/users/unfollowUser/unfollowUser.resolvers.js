import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    unfollowUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      try {
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            followings: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        console.log('Error: ', e);
        return {
          ok: false,
          error: 'User does not exist',
        };
      }
    }),
  },
};
