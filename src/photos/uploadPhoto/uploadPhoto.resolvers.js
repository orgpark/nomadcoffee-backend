import client from '../../client';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      let hashtagObj = null;
      if (caption) {
        hashtagObj = processHashtags(caption);
      }
      return client.photo.create({
        data: {
          file,
          caption,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          ...(hashtagObj.length > 0 && {
            hashtag: {
              connectOrCreate: hashtagObj,
            },
          }),
        },
      });
    }),
  },
};