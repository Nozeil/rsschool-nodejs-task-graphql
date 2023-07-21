import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import memberTypes from './fields/all/memberTypes.js';
import posts from './fields/all/posts.js';
import users from './fields/all/users.js';
import profiles from './fields/all/profiles.js';
import memberTypeById from './fields/id/memberType.js';
import postById from './fields/id/post.js';
import userById from './fields/id/user.js';
import profileById from './fields/id/profile.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberType: memberTypeById,
    post: postById,
    user: userById,
    profile: profileById,
    memberTypes,
    posts,
    users,
    profiles,
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
});
