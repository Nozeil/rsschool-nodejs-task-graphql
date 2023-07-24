import { GraphQLInputObjectType } from 'graphql';
import { user } from '../../../types/user.js';
import { UserDtoArgs, userDto } from '../dto/user.js';
import { ContextValue } from '../../../types.js';

export const createUser = {
  type: user,
  args: {
    dto: {
      type: new GraphQLInputObjectType({
        name: 'CreateUserInput',
        fields: userDto,
      }),
    },
  },
  resolve(_source, args: { dto: UserDtoArgs }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.user.create({
      data: args.dto,
    });
    return result;
  },
};
