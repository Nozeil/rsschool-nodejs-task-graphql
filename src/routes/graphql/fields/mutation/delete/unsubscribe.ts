import { FastifyInstance } from "fastify";
import { UUIDType } from "../../../types/uuid.js";
import { GraphQLBoolean } from "graphql";

export const unsubscribeFrom = {
  type: GraphQLBoolean,
  args: {
    userId: { type: UUIDType },
    authorId: { type: UUIDType },
  },
  async resolve(_source, args: { userId: string; authorId: string }, context: FastifyInstance) {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      },
    });
  },
};