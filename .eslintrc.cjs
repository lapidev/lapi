module.exports = {
  extends: ['get-off-my-lawn'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'import/extensions': 'off',
      },
    },
  ],
};
