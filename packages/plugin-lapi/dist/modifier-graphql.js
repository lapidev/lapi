import * as path from 'path'
import * as apollo from 'apollo-server-hapi'
import * as globby from 'globby'
import * as utils from './utils'
const DEFAULT_OPTIONS = {
  baseDir: path.join(process.cwd(), 'src'),
}

const apply = async (hapiServer, options) => {
  const { baseDir } = { ...DEFAULT_OPTIONS, ...options }
  const resolversPath = path.join(baseDir, 'resolvers')
  const paths = await globby.globby([utils.addJSTSGlob(resolversPath)])
  const resolvers = {}
  await Promise.all(
    paths.map(async (p) => {
      const resolver = utils.cleansePath(p, resolversPath)
      const split = resolver.split('/')

      if (split.length > 3) {
        throw new Error(
          `Resolver path ${resolver} is too deep. Only two levels of folders are allowed.`,
        )
      }

      const root = utils.capitalize(split[1])
      const name = split[2]
      const { handler } = await import(p)

      if (!resolvers[root]) {
        resolvers[root] = {}
      }

      resolvers[root][name] = handler
    }),
  )
  const plugins = options?.plugins ?? []
  const apolloServer = new apollo.ApolloServer({
    resolvers,
    ...options,
    plugins: [
      ...plugins,
      apollo.ApolloServerPluginStopHapiServer({
        hapiServer,
      }),
    ],
  })
  hapiServer.startServer = hapiServer.start

  hapiServer.start = async () => {
    await apolloServer.start()
    await apolloServer.applyMiddleware({
      app: hapiServer,
    })
    await hapiServer.startServer()
  }
}

export { apply, DEFAULT_OPTIONS }
