import { ContextValue } from '../../../types.js';
import { UUIDType } from '../../../types/uuid.js';
import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

export const deletePost = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    await fastify.prisma.post.delete({
      where: {
        id: args.id,
      },
    });
  },
};
