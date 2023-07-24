import { GraphQLNonNull } from 'graphql';
import { MemberTypeId } from '../../../../member-types/schemas.js';
import { MemberTypeIdGQLEnumType } from '../../../types/memberTypeId.js';
import { memberType } from '../../../types/memberType.js';
import { ContextValue } from '../../../types.js';

const memberTypeId = {
  type: memberType,
  args: {
    id: {
      type: new GraphQLNonNull(MemberTypeIdGQLEnumType),
    },
  },
  resolve(_source, args: { id: MemberTypeId }, context: ContextValue) {
    const { fastify } = context;
    const result = fastify.prisma.memberType.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default memberTypeId;
