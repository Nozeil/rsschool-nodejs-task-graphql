import { FastifyInstance } from 'fastify';
import { GraphQLList } from 'graphql';
import { post } from '../../../types/post.js';

const posts = {
  type: new GraphQLList(post),
  resolve(_source, _args, context: FastifyInstance) {
    const result = context.prisma.post.findMany();
    return result;
  },
};

export default posts;
