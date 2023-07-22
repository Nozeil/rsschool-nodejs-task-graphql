import { FastifyInstance } from 'fastify';
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { ProfileDtoArgs, profileDto } from '../dto/profile.js';
import { profile } from '../../../types/profile.js';

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
  resolve(_source, args: { id: string; dto: ProfileDtoArgs }, context: FastifyInstance) {
    const result = context.prisma.profile.update({
      where: { id: args.id },
      data: args.dto,
    });
    return result;
  },
};
