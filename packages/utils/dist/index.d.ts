/// <reference types="node" />
declare const addJSTSGlob: (dir: string) => string
declare const isValidHttpMethod: (method: string) => boolean
declare const cleansePath: (p: string, toRemove: string) => string
declare const capitalize: (s: string) => string
declare const require: NodeRequire
declare const getPkg: (file: string) => any
export { getPkg, require, addJSTSGlob, isValidHttpMethod, cleansePath, capitalize }
