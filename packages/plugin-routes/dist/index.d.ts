import type { Plugin } from '@hapi/hapi'
interface Options {
  baseDir?: string
}
declare const DEFAULT_OPTIONS: {
  baseDir: string
}
declare const pluginRoutes: Plugin<Options>
export default pluginRoutes
export { DEFAULT_OPTIONS }
export type { Options }
