import { loadFilesSync, mergeTypeDefs, mergeResolvers, makeExecutableSchema } from 'graphql-tools';
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const resolversArray = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(resolversArray);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
