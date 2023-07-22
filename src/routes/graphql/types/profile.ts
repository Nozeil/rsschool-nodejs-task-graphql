import { GraphQLObjectType, GraphQLFloat, GraphQLBoolean } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeIdGQLEnumType } from './memberTypeId.js';
import { memberType } from './memberType.js';
import { MemberTypeId } from '../../member-types/schemas.js';
import { ContextValue } from '../types.js';

type Source = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
}

export const profile = new GraphQLObjectType<Source, ContextValue>({
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
    memberType: {
      type: memberType,
      resolve(source, _args, context) {
        const { fastify } = context;
        const result = fastify.prisma.memberType.findUnique({
          where: {
            id: source.memberTypeId,
          },
        });
        return result;
      },
    },
  }),
});
