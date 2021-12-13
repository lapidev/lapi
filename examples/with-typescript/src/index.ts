import PluginLapi from '@lapidev/plugin-lapi'
import * as hapi from '@hapi/hapi'

const start = async () => {
  const server = hapi.server({ port: 3000 })

  await server.register({
    plugin: PluginLapi,
  })

  await server.start()
}

start()
