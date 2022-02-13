import type { ResolverHandler } from '../../types/resolver-handler';

const resolver: ResolverHandler<never, never> = () => 'Hello, World!';

export { resolver };
