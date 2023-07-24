import { GraphQLInputObjectType } from 'graphql';
import { profile } from '../../../types/profile.js';
import { ProfileDtoArgs, profileDto } from '../dto/profile.js';
import { UUIDType } from '../../../types/uuid.js';
import { ContextValue } from '../../../types.js';

export const createProfile = {
  type: profile,
  args: {
    dto: {
      type: new GraphQLInputObjectType({
        name: 'CreateProfileInput',
        fields: {
          ...profileDto,
          userId: {
            type: UUIDType,
          },
        },
      }),
    },
  },
  resolve(
    _source,
    args: {
      dto: ProfileDtoArgs;
    },
    context: ContextValue,
  ) {
    const { fastify } = context;
    const result = fastify.prisma.profile.create({
      data: args.dto,
    });
    return result;
  },
};
