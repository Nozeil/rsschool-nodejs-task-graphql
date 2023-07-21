import { FastifyInstance } from 'fastify';
import { GraphQLList } from 'graphql';
import { memberType } from '../types/memberType.js';

const memberTypes = {
  type: new GraphQLList(memberType),
  resolve(_source, _args, context: FastifyInstance) {
    const result = context.prisma.memberType.findMany();
    return result;
  },
};

export default memberTypes;
