import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools';
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
// const resolversArray = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);
const resolversArray = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(resolversArray);
