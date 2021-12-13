import { join } from 'path'
import { createRequire } from 'module'
const VALID_HTTP_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])

const addJSTSGlob = (dir) => join(dir, '**/*.{js,ts}')

const isValidHttpMethod = (method) => VALID_HTTP_METHODS.has(method.toUpperCase())

const cleansePath = (p, toRemove) => p.replace(toRemove, '').replace(/.[jt]s$/u, '')

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const require = createRequire(import.meta.url)

const getPkg = (file) => require(file)

export { getPkg, require, addJSTSGlob, isValidHttpMethod, cleansePath, capitalize }
