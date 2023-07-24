import { GraphQLEnumType } from "graphql";

export const MemberTypeIdGQLEnumType = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});