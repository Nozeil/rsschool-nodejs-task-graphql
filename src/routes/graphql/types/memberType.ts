import { GraphQLObjectType, GraphQLFloat, GraphQLInt } from "graphql";
import { MemberTypeIdGQLEnumType } from "./memberTypeId.js";

export const memberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: {
      type: MemberTypeIdGQLEnumType,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});
