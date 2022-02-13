import type { RouteHandler } from '../../../types/route-handler';

const handler: RouteHandler<{ Reply: { status: string } }> = async (_, reply) => {
  await reply.status(200).send({ status: 'OK' });
};

export { handler };
