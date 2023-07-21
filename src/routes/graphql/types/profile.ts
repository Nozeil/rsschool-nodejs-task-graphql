import { GraphQLObjectType, GraphQLFloat, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeIdGQLEnumType } from './memberTypeId.js';

export const profile = new GraphQLObjectType({
  name: 'profile',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLFloat,
    },
    userId: {
      type: UUIDType,
    },
    memberTypeId: {
      type: MemberTypeIdGQLEnumType,
    },
  }),
});
