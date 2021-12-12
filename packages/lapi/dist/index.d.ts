import * as hapi from '@hapi/hapi'
interface ServerOptions extends hapi.ServerOptions {
  baseDir?: string
}
declare const DEFAULT_CONFIG: {
  baseDir: string
  port: string | number
}
declare const bareServer: (options?: ServerOptions) => Promise<hapi.Server>
declare const server: (options?: ServerOptions) => Promise<hapi.Server>
export * from '@hapi/hapi'
export { DEFAULT_CONFIG, server, bareServer }
export type { ServerOptions }
