import Fastify from 'fastify';

import { addRoutes } from './infrastructure/add-routes.js';
import { addApollo } from './infrastructure/add-apollo.js';

const run = async (): Promise<void> => {
  // eslint-disable-next-line new-cap
  const fastify = Fastify({
    logger: true,
  });

  await Promise.all([addRoutes(fastify), addApollo(fastify)]);

  fastify.listen(3000, (err, address) => {
    if (err) throw err;

    // eslint-disable-next-line no-console
    console.log(`Server is now listening on ${address}`);
  });
};

void run();
