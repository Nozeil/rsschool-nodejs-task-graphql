import { FastifyInstance } from 'fastify';
import { GraphQLList } from 'graphql';
import { user } from '../../../types/user.js';

export const users = {
  type: new GraphQLList(user),
  resolve(_source, _args, context: FastifyInstance) {
    const result = context.prisma.user.findMany();
    return result;
  },
};

export default users;
