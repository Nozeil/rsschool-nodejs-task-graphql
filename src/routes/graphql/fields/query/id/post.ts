import { GraphQLNonNull } from 'graphql';
import { post } from '../../../types/post.js';
import { UUIDType } from '../../../types/uuid.js';
import { ContextValue } from '../../../types.js';

const postById = {
  type: post,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve(_source, args: { id: string }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default postById;
