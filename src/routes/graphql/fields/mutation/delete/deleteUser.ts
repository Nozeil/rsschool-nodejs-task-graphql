import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { ContextValue } from '../../../types.js';

export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    await fastify.prisma.user.delete({
      where: {
        id: args.id,
      },
    });
  },
};
