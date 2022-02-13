import { walk } from '@lapidev/walker';
import type { WalkOptions } from '@lapidev/walker';
import { camelCase, pascalCase } from 'change-case';
import _ from 'lodash-es';

type WalkResolversOptions = WalkOptions & {
  /* The name of the resolver function exported from the files. */
  resolverName?: string;
};

/**
 * Walks the given directory for the file extensions and constructs an object
 * of the functions with the given name. The top level keys are added as pascal
 * case and the rest are camel case. E.g. The resolver `query/message.ts`
 * would construct the following object.
 *
 * ```js
 * const result = {
 *   Query: {
 *     helloWorld: () => 'Hello, World',
 *   },
 * };
 * ```
 *
 */
const walkResolvers = async <T extends object>(options: WalkResolversOptions = {}): Promise<T> => {
  const { resolverName = 'resolver', ...walkOptions } = options;

  const files = await walk(walkOptions);

  const result: object = {};

  files.forEach((file) => {
    const [topLevel, ...rest] = file.filePathParts;
    const camelCased = rest.map((part) => camelCase(part));
    const transformed = [pascalCase(topLevel), ...camelCased];

    _.set(result, transformed.join('.'), _.get(file.import, resolverName));
  });

  return result as T;
};

export type { WalkResolversOptions };
export { walkResolvers };
