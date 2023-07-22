import { FastifyInstance } from 'fastify';
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { post } from '../../../types/post.js';
import { UUIDType } from '../../../types/uuid.js';
import { PostDtoArgs, postDto } from '../dto/post.js';

export const changePost = {
  type: post,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: {
      type: new GraphQLInputObjectType({
        name: 'ChangePostInput',
        fields: postDto,
      }),
    },
  },
  resolve(
    _source,
    args: { id: string; dto: PostDtoArgs },
    context: FastifyInstance,
  ) {
    const result = context.prisma.post.update({
      where: { id: args.id },
      data: args.dto,
    });
    return result;
  },
};
