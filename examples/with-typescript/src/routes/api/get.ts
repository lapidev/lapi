import type * as lapi from '@lapidev/lapi'

const handler: lapi.RequestEventHandler = () => ({ message: 'Hello, World!' })

export { handler }
