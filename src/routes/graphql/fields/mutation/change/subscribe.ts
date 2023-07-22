import { user } from '../../../types/user.js';
import { UUIDType } from '../../../types/uuid.js';
import { ContextValue } from '../../../types.js';

export const subscribeTo = {
  type: user,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  resolve(_source, args: { userId: string; authorId: string }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.user.update({
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
