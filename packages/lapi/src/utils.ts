import * as path from 'path'

const VALID_HTTP_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])

const addJSGlob = (dir: string) => path.join(dir, '**/*.{js,ts}')

const getRoutesPath = (dir: string) => path.join(dir, 'routes')

const isValidHttpMethod = (method: string) => VALID_HTTP_METHODS.has(method.toUpperCase())

export { addJSGlob, getRoutesPath, isValidHttpMethod }
