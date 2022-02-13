import { walk } from '@lapidev/walker';
import type { WalkOptions, WalkResult } from '@lapidev/walker';

const HttpMethods = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE',
} as const;

type HttpMethod = typeof HttpMethods[keyof typeof HttpMethods];

const isValidHttpMethod = (method: string): method is HttpMethod =>
  (HttpMethods as Record<string, string | undefined>)[method] !== undefined;

type WalkRoutesResult<T extends object> = WalkResult<T> & {
  method: HttpMethod;
  path: string;
};

type WalkRoutesOptions = WalkOptions;

/**
 * Walks the given directory for the file extensions and imports the contents. Filters out any file that is not named a
 * valid HTTP method.
 */
const walkRoutes = async <T extends object>(
  options: WalkRoutesOptions = {},
): Promise<WalkRoutesResult<T>[]> => {
  const files = await walk<T>(options);

  return files
    .map((result) => {
      const method = result.filePathParts.at(-1)?.toUpperCase() as HttpMethod;

      const newResult: WalkRoutesResult<T> = {
        ...result,
        method,
        path: `/${result.filePathParts.slice(0, -1).join('/')}`,
      };

      return newResult;
    })
    .filter((result) => isValidHttpMethod(result.method));
};

export type { WalkRoutesResult, WalkRoutesOptions };
export { walkRoutes };
