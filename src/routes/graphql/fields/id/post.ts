import { FastifyInstance } from 'fastify';
import { GraphQLNonNull } from 'graphql';
import { post } from '../../types/post.js';
import { UUIDType } from '../../types/uuid.js';

const postById = {
  type: post,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve(_source, args: { id: string }, context: FastifyInstance) {
    const result = context.prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default postById;
