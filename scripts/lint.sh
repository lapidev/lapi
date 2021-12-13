
lint() {
  pnpm eslint "${@}" "src/**/*.{ts,js}"
}

lint "${@}"
