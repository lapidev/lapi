import { join } from 'node:path';
import { cwd } from 'node:process';

import { walkRoutes } from '@lapidev/routes-walker';
import type { FastifyInstance } from 'fastify';

import type { RouteHandler } from '../types/route-handler';

type RouteImport = {
  handler: RouteHandler;
};

const addRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const routes = await walkRoutes<RouteImport>({ baseDir: join(cwd(), 'src', 'routes') });

  routes.map(({ method, path, import: { handler } }) => {
    (fastify as unknown as Record<string, (path: string, handler: RouteHandler) => void>)[method.toLowerCase()](
      path,
      handler,
    );
  });
};

export { addRoutes };
