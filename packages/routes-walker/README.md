# @lapidev/route-walker

Simple package that walks a directory and imports the files. The files in the specified directory must be valid, lowercase HTTP method (get, post, put, patch, delete, head, options, trace, connect).

## Example

The following example will walk the directory `<CWD>/src/routes` for files.

```ts
import { join } from 'node:path';
import { cwd } from 'node:process';

import { walkRoutes } from '@lapidev/routes-walker';
import type { WalkOptions, WalkRoutesResult } from '@lapidev/routes-walker';

type Exports = {
  name: string;
  run: (name: string) => void;
};

const run = async () => {
  const options: WalkOptions = {
    baseDir: join(cwd(), 'src', 'routes'),
  };

  const result: WalkRoutesResult<Exports>[] = await walkRoutes<Exports>(options);

  console.log(result);
};

void run();
```
