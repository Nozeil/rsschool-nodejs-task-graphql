import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { ContextValue } from '../../../types.js';

export const deleteProfile = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    await fastify.prisma.profile.delete({
      where: {
        id: args.id,
      },
    });
  },
};
