import { FastifyInstance } from 'fastify';
import { GraphQLInputObjectType } from 'graphql';
import { profile } from '../../../types/profile.js';
import { ProfileDtoArgs, profileDto } from '../dto/profile.js';
import { UUIDType } from '../../../types/uuid.js';

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
    context: FastifyInstance,
  ) {
    const result = context.prisma.profile.create({
      data: args.dto,
    });
    return result;
  },
};
