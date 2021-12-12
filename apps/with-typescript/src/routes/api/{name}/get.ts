import type * as lapi from '@lapidev/lapi'

const handler: lapi.RequestEventHandler = (request) => ({
  message: `Hello, ${request.params.name}!`,
})

export { handler }
