import { FastifyInstance } from 'fastify';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';
import { memberType } from './types/memberType.js';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve(_source, _args, context: FastifyInstance) {
        const result = context.prisma.memberType.findMany();
        return result;
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  query: Query,
});
