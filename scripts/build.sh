#!/bin/bash
set -e

swc=()

# Add script name
swc+=("./src" "--config-file" "../../scripts/.swcrc.json" "--copy-files")

# Passthrough arguments and flags
swc+=($@)

# Execute
npm exec -- rimraf dist

npm exec -- swc "${swc[@]}" --out-dir ./dist
npm exec -- tsc --declaration --emitDeclarationOnly --outDir ./dist

