import { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { post } from './post.js';
import { profile } from './profile.js';
import { ContextValue } from '../types.js';
import DataLoader from 'dataloader';
import { USERS_DL_KEY, USERS_DL_PRIME_KEY } from '../constants.js';

type Source = {
  id: string;
  name: string;
  balance: number;
};

type Sub = { authorId: string; subscriberId: string }

interface SourceWithSubs extends Source {
  subscribedToUser: Sub[];
  userSubscribedTo: Sub[];
}

type Users = SourceWithSubs[];

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
      async resolve(source, _args, context, info) {
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

        const usersDl = dataLoaders.get(USERS_DL_KEY);
        const users = (await usersDl?.load(USERS_DL_PRIME_KEY)) as Users;
        const userFromDl = users.find(user => user.id === source.id);

        return userFromDl?.userSubscribedTo ?? null;
      },
    },

    subscribedToUser: {
      type: new GraphQLList(user),
      async resolve(source, _args, context, info) {
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
        const usersDl = dataLoaders.get(USERS_DL_KEY);
        const users = (await usersDl?.load(USERS_DL_PRIME_KEY)) as Users;
        const userFromDl = users.find(user => user.id === source.id);

        return userFromDl?.subscribedToUser ?? null;
      },
    },
  }),
});
