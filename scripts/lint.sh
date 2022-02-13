
eslintArgs=()

# Add script name
eslintArgs+=("--ignore-path" "../../.gitignore" ".")

# Passthrough arguments and flags
eslintArgs+=($@)

npm exec -- eslint "${eslintArgs[@]}"
