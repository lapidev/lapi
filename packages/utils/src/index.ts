import { join } from 'path'
import { createRequire } from 'module'

const VALID_HTTP_METHODS = new Set(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'])

const addJSTSGlob = (dir: string) => join(dir, '**/*.{js,ts}')

const isValidHttpMethod = (method: string) => VALID_HTTP_METHODS.has(method.toUpperCase())

const cleansePath = (p: string, toRemove: string) => p.replace(toRemove, '').replace(/.[jt]s$/u, '')

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const require = createRequire(import.meta.url)

const getPkg = (file: string) => require(file)

export { getPkg, require, addJSTSGlob, isValidHttpMethod, cleansePath, capitalize }
