const js = {
  env: {
    jest: true,
    node: true,
  },
  extends: ['eslint-config-get-off-my-lawn'],
}

const ts = {
  env: js.env,
  extends: [
    ...js.extends,
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: { 'react/jsx-filename-extension': 'off' },
}

module.exports = {
  js,
  ts,
}
