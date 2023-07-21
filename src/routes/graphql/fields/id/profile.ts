import { FastifyInstance } from "fastify";
import { GraphQLNonNull } from "graphql";
import { UUIDType } from "../../types/uuid.js";
import { profile } from "../../types/profile.js";

const profileById = {
  type: profile,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve(_source, args: { id: string }, context: FastifyInstance) {
    const result = context.prisma.profile.findUnique({
      where: {
        id: args.id,
      },
    });
    return result;
  },
};

export default profileById;