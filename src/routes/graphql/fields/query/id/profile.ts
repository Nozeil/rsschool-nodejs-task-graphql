import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { profile } from '../../../types/profile.js';
import { ContextValue } from '../../../types.js';

const profileById = {
  type: profile,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.profile.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default profileById;
