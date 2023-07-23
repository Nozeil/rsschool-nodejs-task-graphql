import DataLoader from "dataloader";
import { FastifyInstance } from "fastify";
import { GraphQLResolveInfo } from "graphql";

export interface ContextValue {
  fastify: FastifyInstance,
  dataLoaders: WeakMap<GraphQLResolveInfo["fieldNodes"], InstanceType<typeof DataLoader>>
}