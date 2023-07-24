import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { user } from '../../../types/user.js';
import { ContextValue } from '../../../types.js';

const userById = {
  type: user,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  async resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    const result = await fastify.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default userById;
