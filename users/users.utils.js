require('dotenv').config();
import client from '../client';
import jwt from 'jsonwebtoken';

export const getUser = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);

    if (!token) {
      return null;
    }
    const user =
      (await client.user.findUnique({
        where: { id },
      })) || null;
    return user;
  } catch (e) {
    console.log('Error: ', e);
    return null;
  }
};

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: 'Please log in to perform this action',
    };
  }
  return ourResolver(root, args, context, info);
};
