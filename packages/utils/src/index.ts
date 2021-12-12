import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const getPkg = (file: string) => require(file)

export { getPkg }
