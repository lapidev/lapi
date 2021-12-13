import * as path from 'path'
import * as globby from 'globby'
import * as utils from './utils'
const DEFAULT_OPTIONS = {
  baseDir: path.join(process.cwd(), 'src'),
}

const apply = async (hapiServer, options) => {
  const { baseDir } = { ...DEFAULT_OPTIONS, ...options }
  const routesPath = path.join(baseDir, 'routes')
  const paths = await globby.globby([utils.addJSTSGlob(routesPath)])
  await Promise.all(
    paths.map(async (p) => {
      const route = utils.cleansePath(p, routesPath)
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
}

export { apply, DEFAULT_OPTIONS }
