
babel() {
  pnpm babel --extensions '.ts' ./src -d ./dist
}

tsc() {
  pnpm tsc --emitDeclarationOnly -p tsconfig.json
}

babel
tsc
