import { FastifyInstance } from 'fastify';
import { user } from '../../../types/user.js';
import { UUIDType } from '../../../types/uuid.js';

export const subscribeTo = {
  type: user,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  resolve(_source, args: { userId: string; authorId: string }, context: FastifyInstance) {
    const result = context.prisma.user.update({
      where: {
        id: args.userId,
      },
      data: {
        userSubscribedTo: {
          create: {
            authorId: args.authorId,
          },
        },
      },
    });
    return result;
  },
};
