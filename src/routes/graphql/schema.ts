import { FastifyInstance } from 'fastify';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import { memberType } from './types/memberType.js';
import { post } from './types/posts.js';
import { user } from './types/users.js';
import { profile } from './types/profile.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve(_source, _args, context: FastifyInstance) {
        const result = context.prisma.memberType.findMany();
        return result;
      },
    },
    posts: {
      type: new GraphQLList(post),
      resolve(_source, _args, context: FastifyInstance) {
        const result = context.prisma.post.findMany();
        return result;
      },
    },
    users: {
      type: new GraphQLList(user),
      resolve(_source, _args, context: FastifyInstance) {
        const result = context.prisma.user.findMany();
        return result;
      },
    },
    profiles: {
      type: new GraphQLList(profile),
      resolve(_source, _args, context: FastifyInstance) {
        const result = context.prisma.profile.findMany();
        return result;
      },
    }
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
});
