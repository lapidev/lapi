const handler = (request) => ({ message: `Hello, ${request.params.name}!` })

export { handler }
