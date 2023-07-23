import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { post } from './post.js';
import { profile } from './profile.js';
import { ContextValue } from '../types.js';
import DataLoader from 'dataloader';

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
      resolve(source, _args, context, info) {
        const { fastify, dataLoaders } = context;

        let dl = dataLoaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const profiles = await fastify.prisma.profile.findMany({
              where: {
                userId: { in: [...ids] },
              },
            });
            const sortedProfilesInIdsOrder = ids.map((id) =>
              profiles.find((profile) => profile.userId === id),
            );
            return sortedProfilesInIdsOrder;
          });

          dataLoaders.set(info.fieldNodes, dl);
        }

        return dl.load(source.id);
      },
    },

    posts: {
      type: new GraphQLList(post),
      resolve(source, _args, context, info) {
        const { fastify, dataLoaders } = context;

        let dl = dataLoaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const posts = await fastify.prisma.post.findMany({
              where: {
                authorId: { in: [...ids] },
              },
            });
            const sortedPostsInIdsOrder = ids.map((id) =>
              posts.find((post) => post.authorId === id),
            );
            return sortedPostsInIdsOrder;
          });

          dataLoaders.set(info.fieldNodes, dl);
        }

        return dl.loadMany([source.id]);
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(user),
      resolve(source, _args, context, info) {
        const { fastify, dataLoaders } = context;

        if (info.variableValues.userId) {
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
        }

        let dl = dataLoaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const users = await fastify.prisma.user.findMany({
              where: {
                subscribedToUser: {
                  some: {
                    subscriberId: { in: [...ids] },
                  },
                },
              },
            });
            const sortedUsersInIdsOrder = ids.map((id) =>
              users.find((user) => user.id === id),
            );
            return sortedUsersInIdsOrder;
          });

          dataLoaders.set(info.fieldNodes, dl);
        }

        return dl.loadMany([source.id]);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(user),
      resolve(source, _args, context, info) {
        const { fastify, dataLoaders } = context;

        if (info.variableValues.userId) {
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
        }
        let dl = dataLoaders.get(info.fieldNodes);

        if (!dl) {
          dl = new DataLoader(async (ids: readonly string[]) => {
            const users = await fastify.prisma.user.findMany({
              where: {
                userSubscribedTo: {
                  some: {
                    authorId: { in: [...ids] },
                  },
                },
              },
            });
            const sortedUsersInIdsOrder = ids.map((id) =>
              users.find((user) => user.id === id),
            );
            return sortedUsersInIdsOrder;
          });

          dataLoaders.set(info.fieldNodes, dl);
        }

        return dl.loadMany([source.id]);
      },
    },
  }),
});
