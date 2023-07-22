import { GraphQLList } from 'graphql';
import { memberType } from '../../../types/memberType.js';
import { ContextValue } from '../../../types.js';

const memberTypes = {
  type: new GraphQLList(memberType),
  resolve(_source, _args, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.memberType.findMany();
    return result;
  },
};

export default memberTypes;
