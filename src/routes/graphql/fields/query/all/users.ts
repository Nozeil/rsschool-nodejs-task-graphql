import { GraphQLList } from 'graphql';
import { user } from '../../../types/user.js';
import { ContextValue } from '../../../types.js';

export const users = {
  type: new GraphQLList(user),
  resolve(_source, _args, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.user.findMany();
    return result;
  },
};

export default users;
