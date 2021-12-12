import * as lapi from '@lapidev/lapi'

const start = async () => {
  const server = await lapi.server()

  await server.start()
}

start()
