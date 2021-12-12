import * as correlationId from 'correlation-id'
import * as Utils from '@lapidev/utils'
import type * as hapi from '@hapi/hapi'

const getCorrelationId = () => correlationId.getId()

const name = 'correlationId'

const pkg = Utils.getPkg('../package.json')

const register = (server: hapi.Server) => {
  server.ext('onRequest', (_: hapi.Request, h: hapi.ResponseToolkit) =>
    correlationId.withId(() => h.continue),
  )
}

const version = '0.0.1'

export { getCorrelationId, name, pkg, register, version }
