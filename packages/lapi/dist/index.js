import * as path from 'path'
import * as CorrelationId from '@lapidev/plugin-correlation-id'
import * as globby from 'globby'
import * as hapi from '@hapi/hapi'
import * as utils from './utils'
const DEFAULT_CONFIG = {
  baseDir: path.join(process.cwd(), 'src'),
  port: process.env.PORT || 3000,
}

const bareServer = async (options = DEFAULT_CONFIG) => {
  const hapiOptions = { ...options }
  delete hapiOptions.baseDir
  const hapiServer = hapi.server(hapiOptions)
  const { baseDir } = { ...DEFAULT_CONFIG, ...options }
  const paths = await globby.globby([utils.addJSGlob(utils.getRoutesPath(baseDir))])
  await Promise.all(
    paths.map(async (p) => {
      const route = p
        .replace(utils.getRoutesPath(baseDir), '')
        .replace('.js', '')
        .replace('.ts', '')
      const split = route.split('/')
      const method = split[split.length - 1].toUpperCase()

      if (!utils.isValidHttpMethod(method)) {
        throw new Error(`Invalid HTTP method: ${method}`)
      }

      split.pop()
      const { handler, options: opts, rules, vhost } = await import(p)
      hapiServer.route({
        handler,
        method,
        options: opts,
        path: split.join('/'),
        rules,
        vhost,
      })
    }),
  )
  return hapiServer
}

const server = async (options = DEFAULT_CONFIG) => {
  const hapiServer = await bareServer(options)
  hapiServer.register(CorrelationId)
  return hapiServer
}

export * from '@hapi/hapi'
export { DEFAULT_CONFIG, server, bareServer }
