import { FastifyInstance } from 'fastify';
import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { user } from '../../../types/user.js';
import { UserDtoArgs, userDto } from '../dto/user.js';

export const changeUser = {
  type: user,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: {
      type: new GraphQLInputObjectType({
        name: 'ChangeUserInput',
        fields: userDto,
      }),
    },
  },
  resolve(
    _source,
    args: { id: string; dto: UserDtoArgs },
    context: FastifyInstance,
  ) {
    const result = context.prisma.user.update({
      where: { id: args.id },
      data: args.dto,
    });
    return result;
  },
};