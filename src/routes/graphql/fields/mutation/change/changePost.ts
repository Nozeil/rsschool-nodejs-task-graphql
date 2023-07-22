import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { post } from '../../../types/post.js';
import { UUIDType } from '../../../types/uuid.js';
import { PostDtoArgs, postDto } from '../dto/post.js';
import { ContextValue } from '../../../types.js';

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
  resolve(_source, args: { id: string; dto: PostDtoArgs }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.post.update({
      where: { id: args.id },
      data: args.dto,
    });
    return result;
  },
};
