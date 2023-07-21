import { GraphQLObjectType, GraphQLString, GraphQLFloat } from "graphql";
import { UUIDType } from "./uuid.js";

export const user = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: UUIDType,
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
  }),
});
