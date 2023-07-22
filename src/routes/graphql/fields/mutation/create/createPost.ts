import { FastifyInstance } from 'fastify';
import { GraphQLInputObjectType } from 'graphql';
import { post } from '../../../types/post.js';
import { postDto } from '../dto/post.js';

export const createPost = {
  type: post,
  args: {
    dto: {
      type: new GraphQLInputObjectType({
        name: 'CreatePostInput',
        fields: postDto
      }),
    },
  },
  resolve(
    _source,
    args: { dto: { title: string; content: string; authorId: string } },
    context: FastifyInstance,
  ) {
    const result = context.prisma.post.create({
      data: args.dto,
    });
    return result;
  },
};