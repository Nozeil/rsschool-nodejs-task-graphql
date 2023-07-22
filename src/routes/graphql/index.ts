import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schema.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;
      const variableValues = req.body.variables;
      const ast = parse(source);
      const validationErrors = validate(schema, ast, [depthLimit(5)]);
      const result = validationErrors.length
        ? { errors: validationErrors }
        : await graphql({ schema, source, contextValue: fastify, variableValues });
      return result;
    },
  });
};

export default plugin;
