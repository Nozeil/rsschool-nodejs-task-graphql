import { GraphQLList } from 'graphql';
import { profile } from '../../../types/profile.js';
import { ContextValue } from '../../../types.js';

const profiles = {
  type: new GraphQLList(profile),
  resolve(_source, _args, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.profile.findMany();
    return result;
  },
};

export default profiles;
