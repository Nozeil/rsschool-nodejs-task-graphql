import { GraphQLList } from 'graphql';
import { post } from '../../../types/post.js';
import { ContextValue } from '../../../types.js';

const posts = {
  type: new GraphQLList(post),
  resolve(_source, _args, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.post.findMany();
    return result;
  },
};

export default posts;
