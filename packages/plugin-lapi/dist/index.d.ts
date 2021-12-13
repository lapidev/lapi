import type { Plugin } from '@hapi/hapi'
import { Options as GraphQLOptions } from '@lapidev/plugin-graphql'
import { Options as RoutesOptions } from '@lapidev/plugin-routes'
interface Options {
  graphqlOptions?: GraphQLOptions
  routesOptions?: RoutesOptions
}
declare const DEFAULT_OPTIONS: {
  hapiOptions: {
    port: string | number
  }
  modifierGraphqlOptions: {
    baseDir: string
  }
  modifierRoutesOptions: {
    baseDir: string
  }
}
declare const pluginLapi: Plugin<Options>
export default pluginLapi
export { DEFAULT_OPTIONS }
export type { Options }
