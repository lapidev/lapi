import * as path from 'path'

import { addJSTSGlob, cleansePath, getPkg, isValidHttpMethod } from '@lapidev/utils'
import { globby } from 'globby'
import type { Plugin } from '@hapi/hapi'

interface Options {
  baseDir?: string
}

const DEFAULT_OPTIONS = {
  baseDir: path.join(process.cwd(), 'src'),
}

const pkg = getPkg('../package.json')

const pluginRoutes: Plugin<Options> = {
  name: '@lapidev/plugin-routes',
  pkg,
  register: async (server, options) => {
    const { baseDir } = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    const routesPath = path.join(baseDir, 'routes')

    const paths = await globby([addJSTSGlob(routesPath)])

    await Promise.all(
      paths.map(async (p) => {
        const route = cleansePath(p, routesPath)

        const split = route.split('/')
        const method = split[split.length - 1].toUpperCase()

        if (!isValidHttpMethod(method)) {
          throw new Error(`Invalid HTTP method: ${method}`)
        }

        split.pop()

        const { handler, options: opts, rules, vhost } = await import(p)

        server.route({
          handler,
          method,
          options: opts,
          path: split.join('/'),
          rules,
          vhost,
        })
      }),
    )
  },
}

export default pluginRoutes
export { DEFAULT_OPTIONS }
export type { Options }
