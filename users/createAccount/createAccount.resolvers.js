import client from '../../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      // check if username or email are already on DB: should be last defense line
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        console.log('existingUser: ', existingUser);
        // hash password
        if (existingUser) {
          throw new Error('This username/email is already taken.');
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        console.log('uglyPassword: ', uglyPassword);
        // save and return the user

        return client.user.create({
          data: { firstName, lastName, username, email, password: uglyPassword },
        });
      } catch (e) {
        console.log('ERROR: ', e);
        return e;
      }
    },
  },
};
