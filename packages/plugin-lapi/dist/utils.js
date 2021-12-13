import * as path from 'path'
const VALID_HTTP_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])

const addJSGlob = (dir) => path.join(dir, '**/*.{js,ts}')

const isValidHttpMethod = (method) => VALID_HTTP_METHODS.has(method.toUpperCase())

const cleansePath = (p, toRemove) => p.replace(toRemove, '').replace(/.[jt]s$/u, '')

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export { addJSGlob as addJSTSGlob, isValidHttpMethod, cleansePath, capitalize }
