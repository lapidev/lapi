import * as lapi from '@lapidev/lapi'
import graphi from 'graphi'

const schema = `
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

const resolvers = {
  Person: {
    fullName: ({ first, last }) => `${first} ${last}`,
  },
  Query: {
    hello: (_, { name }) => `Hello ${name}`,
    person: () => ({
      first: 'John',
      last: 'Doe',
    }),
  },
}

const start = async () => {
  const server = await lapi.server()

  await server.register({
    options: {
      resolvers,
      schema,
    },
    plugin: graphi,
  })

  await server.start()
}

start()
