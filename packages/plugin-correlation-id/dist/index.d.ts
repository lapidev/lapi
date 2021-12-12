import type * as hapi from '@hapi/hapi'
declare const getCorrelationId: () => string | undefined
declare const name = 'correlationId'
declare const pkg: any
declare const register: (server: hapi.Server) => void
declare const version = '0.0.1'
export { getCorrelationId, name, pkg, register, version }
