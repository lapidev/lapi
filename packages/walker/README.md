# @lapidev/walker

Simple package that walks a directory and imports the files.

## Example

The following example will walk the directory `<CWD>/src/walk` for files with extensions `ts, tsx`

```ts
import { join } from 'node:path';
import { cwd } from 'node:process';

import { walk } from '@lapidev/walker';
import type { WalkOptions, WalkResult } from '@lapidev/walker';

type Exports = {
  name: string;
  run: (name: string) => void;
};

const run = async () => {
  const options: WalkOptions = {
    baseDir: join(cwd(), 'src', 'walk'),
    extensions: ['ts', 'tsx'],
  };

  const result: WalkResult<Exports>[] = await walk<Exports>(options);

  console.log(result);
};

void run();
```
