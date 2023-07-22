import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import memberTypes from './fields/query/all/memberTypes.js';
import posts from './fields/query/all/posts.js';
import users from './fields/query/all/users.js';
import profiles from './fields/query/all/profiles.js';
import memberTypeById from './fields/query/id/memberType.js';
import postById from './fields/query/id/post.js';
import userById from './fields/query/id/user.js';
import profileById from './fields/query/id/profile.js';
import { createPost } from './fields/mutation/create/createPost.js';
import { createUser } from './fields/mutation/create/createUser.js';
import { createProfile } from './fields/mutation/create/createProfile.js';
import { deletePost } from './fields/mutation/delete/deletePost.js';
import { deleteProfile } from './fields/mutation/delete/deleteProfile.js';
import { deleteUser } from './fields/mutation/delete/deleteUser.js';
import { changePost } from './fields/mutation/change/changePost.js';
import { changeProfile } from './fields/mutation/change/changeProfile.js';
import { changeUser } from './fields/mutation/change/changeUser.js';
import { subscribeTo } from './fields/mutation/change/subscribe.js';
import { unsubscribeFrom } from './fields/mutation/delete/unsubscribe.js';

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost,
    createUser,
    createProfile,
    deletePost,
    deleteProfile,
    deleteUser,
    changePost,
    changeProfile,
    changeUser,
    subscribeTo,
    unsubscribeFrom
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
