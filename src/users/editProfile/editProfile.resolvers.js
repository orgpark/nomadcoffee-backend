require('dotenv').config();
import fs from 'fs';
import client from '../../client';
import bcrypt from 'bcrypt';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { firstName, lastName, username, email, password: newPassword, bio, avatar }, { loggedInUser }) => {
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}/${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(process.cwd() + '/uploads/' + newFilename);
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4001/static/${newFilename}`;
        }

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        console.log('loggedInUser: ', loggedInUser);

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            avatar,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatar && { avatar: avatarUrl }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: 'Could not updated profile.',
          };
        }
      }
    ),
  },
};
