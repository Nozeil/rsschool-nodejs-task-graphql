import { GraphQLEnumType } from "graphql";

export const memberTypeId = new GraphQLEnumType({
  name: 'memberTypeId',
  values: {
    basic: { value: 'basic' },
    business: { value: 'business' },
  },
});