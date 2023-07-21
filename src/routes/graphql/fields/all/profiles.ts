import { FastifyInstance } from 'fastify';
import { GraphQLList } from 'graphql';
import { profile } from '../../types/profile.js';

const profiles = {
  type: new GraphQLList(profile),
  resolve(_source, _args, context: FastifyInstance) {
    const result = context.prisma.profile.findMany();
    return result;
  },
};

export default profiles;
