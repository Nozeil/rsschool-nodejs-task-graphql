import { FastifyInstance } from 'fastify';
import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export const deleteProfile = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_source, args: { id: string }, context: FastifyInstance) {
    await context.prisma.profile.delete({
      where: {
        id: args.id,
      },
    });
  },
};
