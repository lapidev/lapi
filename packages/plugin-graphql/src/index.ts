import * as path from 'path'

import { ApolloServer, ApolloServerPluginStopHapiServer, Config } from 'apollo-server-hapi'
import { getPkg, addJSTSGlob, cleansePath, capitalize } from '@lapidev/utils'
import { globby } from 'globby'
import type { Plugin } from '@hapi/hapi'

interface Options extends Config {
  baseDir?: string
}

const DEFAULT_OPTIONS = {
  baseDir: path.join(process.cwd(), 'src'),
}

const pkg = getPkg('../package.json')

const pluginGraphql: Plugin<Options> = {
  name: '@lapidev/plugin-graphql',
  pkg,
  register: async (server, options) => {
    const { baseDir } = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    const resolversPath = path.join(baseDir, 'resolvers')

    const paths = await globby([addJSTSGlob(resolversPath)])

    const resolvers: any = {}

    await Promise.all(
      paths.map(async (p) => {
        const resolver = cleansePath(p, resolversPath)

        const split = resolver.split('/')

        if (split.length > 3) {
          throw new Error(
            `Resolver path ${resolver} is too deep. Only two levels of folders are allowed.`,
          )
        }

        const root = capitalize(split[1])
        const name = split[2]

        const { handler } = await import(p)

        if (!resolvers[root]) {
          resolvers[root] = {}
        }

        resolvers[root][name] = handler
      }),
    )

    const plugins = options?.plugins ?? []

    const apolloServer = new ApolloServer({
      resolvers,
      ...options,
      // eslint-disable-next-line new-cap
      plugins: [...plugins, ApolloServerPluginStopHapiServer({ hapiServer: server })],
    })

    await apolloServer.start()
    await apolloServer.applyMiddleware({ app: server })
  },
  version: pkg.version,
}

export default pluginGraphql
export { DEFAULT_OPTIONS }
export type { Options }
