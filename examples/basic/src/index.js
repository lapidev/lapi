import PluginLapi from '@lapidev/plugin-lapi'
import * as hapi from '@hapi/hapi'

const typeDefs = `
  type Person {
    first: String!
    last: String!
    fullName: String!
  }

  type Query {
    person: Person!
    hello(name: String!): String!
  }
`

const start = async () => {
  const server = hapi.server({ port: 3000 })

  await server.register({
    options: {
      graphqlOptions: {
        typeDefs,
      },
    },
    plugin: PluginLapi,
  })

  await server.start()
}

start()
