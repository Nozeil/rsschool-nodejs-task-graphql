import { GraphQLObjectType, GraphQLFloat, GraphQLInt } from "graphql";
import { memberTypeId } from "./memberTypeId.js";

export const memberType = new GraphQLObjectType({
  name: 'memberType',
  fields: () => ({
    id: {
      type: memberTypeId,
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  }),
});
