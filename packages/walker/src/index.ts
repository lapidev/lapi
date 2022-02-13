import { join } from 'node:path';
import { cwd } from 'node:process';

import { globby } from 'globby';

const addExtensionsGlob = (dir: string, extensions: string[]): string => join(dir, `**/*.{${extensions.join(',')}}`);

const cleansePath = (p: string, toRemove: string): string => p.replace(toRemove, '');

const getExtension = (p: string): string | undefined => {
  const split = p.split('.');

  return split.length ? split.at(-1) : undefined;
};

const removeExtension = (p: string, extension: string | undefined = getExtension(p)): string =>
  p.slice(0, p.length - (extension ? extension.length + 1 : 0));

type WalkOptions = {
  /* The directory to walk */
  baseDir?: string;
  /* The file extensions to include */
  extensions?: string[];
};

type WalkResult<T extends object> = {
  /* The file extension */
  fileExtension?: string;
  /* The path to the file excluding `baseDir` */
  filePath: string;
  /* The `filePath` split at each `/` without the extension */
  filePathParts: string[];
  /* The imported file */
  import: T;
};

/* Walks the given directory for the file extensions and imports the contents. */
const walk = async <T extends object>(options: WalkOptions = {}): Promise<WalkResult<T>[]> => {
  const { baseDir = join(cwd(), 'src'), extensions = ['ts', 'tsx', 'js', 'jsx'] } = options;

  const glob = [addExtensionsGlob(baseDir, extensions)];
  const paths = await globby(glob);

  return Promise.all(
    paths.map(async (fullFilePath): Promise<WalkResult<T>> => {
      const filePath = cleansePath(fullFilePath, baseDir);
      const fileExtension = getExtension(fullFilePath);
      const fullFilePathWithoutExtension = removeExtension(fullFilePath, fileExtension);

      const filePathParts = removeExtension(filePath, fileExtension)
        .split('/')
        .filter((part) => Boolean(part));

      return {
        fileExtension,
        filePath,
        filePathParts,
        import: (await import(fullFilePathWithoutExtension)) as unknown as T,
      };
    }),
  );
};

export type { WalkOptions, WalkResult };
export { walk };
