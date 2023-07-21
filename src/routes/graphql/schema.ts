import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import memberTypes from './fields/memberTypes.js';
import posts from './fields/posts.js';
import users from './fields/users.js';
import profiles from './fields/profiles.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes,
    posts,
    users,
    profiles,
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
});
