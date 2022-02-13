import { join } from 'node:path';
import { cwd } from 'node:process';

import type { FastifyInstance } from 'fastify';
import { walkResolvers } from '@lapidev/resolvers-walker';
import type { IResolvers } from '@graphql-tools/utils';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import type { ApolloServerPlugin } from 'apollo-server-plugin-base';

const fastifyAppClosePlugin = (app: FastifyInstance): ApolloServerPlugin => ({
  // eslint-disable-next-line @typescript-eslint/require-await
  serverWillStart: async () => ({
    drainServer: async (): Promise<void> => {
      await app.close();
    },
  }),
});

const typeDefs = `
  type Query {
    helloWorld: String!
  }
`;

const addApollo = async (fastify: FastifyInstance): Promise<void> => {
  const resolvers = await walkResolvers<IResolvers | IResolvers[]>({
    baseDir: join(cwd(), 'src', 'resolvers'),
  });

  const server = new ApolloServer({
    // eslint-disable-next-line new-cap
    plugins: [fastifyAppClosePlugin(fastify), ApolloServerPluginDrainHttpServer({ httpServer: fastify.server })],
    resolvers,
    typeDefs,
  });

  await server.start();
  await fastify.register(server.createHandler());
};

export { addApollo };
