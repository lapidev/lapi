import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const getPkg = (file) => require(file)

export { getPkg }
