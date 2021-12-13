import * as path from 'path'
import { getPkg } from '@lapidev/utils'
import { ApolloServer, ApolloServerPluginStopHapiServer } from 'apollo-server-hapi'
import { globby } from 'globby'
import * as utils from './utils'
const DEFAULT_OPTIONS = {
  baseDir: path.join(process.cwd(), 'src'),
}
const pkg = getPkg('../package.json')
const pluginGraphql = {
  name: '@lapidev/plugin-graphql',
  pkg,
  register: async (server, options) => {
    const { baseDir } = { ...DEFAULT_OPTIONS, ...options }
    const resolversPath = path.join(baseDir, 'resolvers')
    const paths = await globby([utils.addJSTSGlob(resolversPath)])
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
        console.log(`adding resolver ${root}.${name} from path ${resolver}`)
        const { handler } = await import(p)

        if (!resolvers[root]) {
          resolvers[root] = {}
        }

        resolvers[root][name] = handler
      }),
    )
    console.log(resolvers)
    const plugins = options?.plugins ?? []
    const apolloServer = new ApolloServer({
      resolvers,
      ...options,
      plugins: [
        ...plugins,
        ApolloServerPluginStopHapiServer({
          hapiServer: server,
        }),
      ],
    })
    await apolloServer.start()
    await apolloServer.applyMiddleware({
      app: server,
    })
  },
  version: pkg.version,
}
export default pluginGraphql
export { DEFAULT_OPTIONS }
