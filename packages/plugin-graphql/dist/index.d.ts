import { Config } from 'apollo-server-hapi'
import type { Plugin } from '@hapi/hapi'
interface Options extends Config {
  baseDir?: string
}
declare const DEFAULT_OPTIONS: {
  baseDir: string
}
declare const pluginGraphql: Plugin<Options>
export default pluginGraphql
export { DEFAULT_OPTIONS }
export type { Options }
