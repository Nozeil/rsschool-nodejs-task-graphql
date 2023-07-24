import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { ProfileDtoArgs, profileDto } from '../dto/profile.js';
import { profile } from '../../../types/profile.js';
import { ContextValue } from '../../../types.js';

export const changeProfile = {
  type: profile,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: {
      type: new GraphQLInputObjectType({
        name: 'ChangeProfileInput',
        fields: profileDto,
      }),
    },
  },
  resolve(_source, args: { id: string; dto: ProfileDtoArgs }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.profile.update({
      where: { id: args.id },
      data: args.dto,
    });
    return result;
  },
};
