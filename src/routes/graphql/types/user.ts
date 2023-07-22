import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { post } from './post.js';
import { profile } from './profile.js';
import { ContextValue } from '../types.js';

type Source = {
  id: string;
  name: string;
  balance: number;
};

export const user: GraphQLObjectType<Source, ContextValue> = new GraphQLObjectType<
  Source,
  ContextValue
>({
  name: 'user',
  fields: () => ({
    id: {
      type: UUIDType,
    },

    name: {
      type: GraphQLString,
    },

    balance: {
      type: GraphQLFloat,
    },

    profile: {
      type: profile,
      resolve(source, _args, context) {
        const { fastify } = context;
        const result = fastify.prisma.profile.findUnique({
          where: {
            userId: source.id,
          },
        });
        return result;
      },
    },

    posts: {
      type: new GraphQLList(post),
      resolve(source, _args, context) {
        const { fastify } = context;
        const result = fastify.prisma.post.findMany({
          where: {
            authorId: source.id,
          },
        });
        return result;
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(user),
      resolve(source, _args, context) {
        const { fastify } = context;
        const result = fastify.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: source.id,
              },
            },
          },
        });
        return result;
      },
    },

    subscribedToUser: {
      type: new GraphQLList(user),
      resolve(source, _args, context) {
        const { fastify } = context;
        const result = fastify.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: source.id,
              },
            },
          },
        });
        return result;
      },
    },
  }),
});
