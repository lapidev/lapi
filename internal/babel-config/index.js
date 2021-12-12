module.exports = {
  overrides: [
    {
      plugins: ['babel-plugin-replace-ts-export-assignment'],
      presets: [
        [
          '@babel/preset-typescript',
          {
            allowDeclareFields: true,
            allowNamespaces: false,
          },
        ],
      ],
      test: /\.tsx?$/u,
    },
  ],
  // plugins: [['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }]],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: false,
        shippedProposals: true,
        targets: { node: '16' },
      },
    ],
  ],
}
