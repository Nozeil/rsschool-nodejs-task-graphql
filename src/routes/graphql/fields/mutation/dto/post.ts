import { GraphQLString } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export interface PostDtoArgs {
  title: string;
  content: string;
  authorId: string;
}

export const postDto = {
  title: {
    type: GraphQLString,
  },
  content: {
    type: GraphQLString,
  },
  authorId: {
    type: UUIDType,
  },
};
