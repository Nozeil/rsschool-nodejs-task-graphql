import { FastifyInstance } from "fastify";

export interface ContextValue {
  fastify: FastifyInstance,
  dataLoaders: WeakMap<object, any>
}