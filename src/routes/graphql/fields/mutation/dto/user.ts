import { GraphQLString, GraphQLFloat } from 'graphql';

export interface UserDtoArgs {
  name: string;
  balance: number;
}

export const userDto = {
  name: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  },
};
