import { FastifyInstance } from "fastify";
import { GraphQLNonNull } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { user } from "../../types/user.js";

const userById = {
  type: user,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  async resolve(_source, args: { id: string }, context: FastifyInstance) {
    const result = await context.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default userById;