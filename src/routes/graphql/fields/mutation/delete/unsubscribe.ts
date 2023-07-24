import { UUIDType } from '../../../types/uuid.js';
import { GraphQLBoolean } from 'graphql';
import { ContextValue } from '../../../types.js';

export const unsubscribeFrom = {
  type: GraphQLBoolean,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  async resolve(
    _source,
    args: { userId: string; authorId: string },
    context: ContextValue,
  ) {
    const { fastify } = context;
    await fastify.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      },
    });
  },
};
