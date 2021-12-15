import type { Plugin } from '@hapi/hapi'
import PluginGraphQL, {
  DEFAULT_OPTIONS as GRAPHQL_DEFAULT_OPTIONS,
  Options as GraphQLOptions,
} from '@lapidev/plugin-graphql'
import PluginRoutes, {
  DEFAULT_OPTIONS as ROUTES_DEFAULT_OPTIONS,
  Options as RoutesOptions,
} from '@lapidev/plugin-routes'
import { getPkg } from '@lapidev/utils'

interface Options {
  graphqlOptions?: GraphQLOptions
  routesOptions?: RoutesOptions
}

const DEFAULT_OPTIONS = {
  hapiOptions: { port: process.env.PORT || 3000 },
  modifierGraphqlOptions: GRAPHQL_DEFAULT_OPTIONS,
  modifierRoutesOptions: ROUTES_DEFAULT_OPTIONS,
}

const pkg = getPkg('../package.json')

const pluginLapi: Plugin<Options> = {
  name: '@lapidev/plugin-lapi',
  pkg,
  register: async (server, options) => {
    await server.register({
      options: options.graphqlOptions,
      plugin: PluginGraphQL,
    })

    await server.register({
      options: options.routesOptions,
      plugin: PluginRoutes,
    })
  },
  version: pkg.version,
}

export default pluginLapi
export { DEFAULT_OPTIONS }
export type { Options }
