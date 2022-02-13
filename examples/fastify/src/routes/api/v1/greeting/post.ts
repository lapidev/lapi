import type { RouteHandler } from '../../../../types/route-handler';

const handler: RouteHandler<{ Body: { name: string }; Reply: { message: string } }> = async (
  request,
  reply,
) => {
  await reply.status(200).send({ message: `Hello, ${request.body.name}!` });
};

export { handler };
