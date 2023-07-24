import { GraphQLBoolean, GraphQLInt } from 'graphql';
import { MemberTypeIdGQLEnumType } from '../../../types/memberTypeId.js';

export interface ProfileDtoArgs {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export const profileDto = {
  isMale: {
    type: GraphQLBoolean,
  },
  yearOfBirth: {
    type: GraphQLInt,
  },
  memberTypeId: {
    type: MemberTypeIdGQLEnumType,
  },
};
