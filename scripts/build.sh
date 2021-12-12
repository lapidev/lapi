
babel() {
  yarn babel --extensions '.ts' ./src -d ./dist
}

tsc() {
  yarn tsc --emitDeclarationOnly -p tsconfig.json
}

babel
tsc
