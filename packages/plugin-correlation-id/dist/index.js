import * as correlationId from 'correlation-id'
import * as Utils from '@lapidev/utils'

const getCorrelationId = () => correlationId.getId()

const name = 'correlationId'
const pkg = Utils.getPkg('../package.json')

const register = (server) => {
  server.ext('onRequest', (_, h) => correlationId.withId(() => h.continue))
}

const version = '0.0.1'
export { getCorrelationId, name, pkg, register, version }
