const js = {
  overrides: [
    {
      plugins: ['babel-plugin-replace-ts-export-assignment'],
      presets: [
        [
          '@babel/preset-typescript',
          {
            allExtensions: true,
            allowNamespaces: false,
            onlyRemoveTypeImports: true,
            optimizeConstEnums: true,
          },
        ],
      ],
      test: /\.tsx?$/u,
    },
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        exclude: [
          '@babel/plugin-transform-async-to-generator',
          '@babel/plugin-transform-regenerator',
        ],
        loose: true,
        modules: false,
        shippedProposals: true,
        targets: {
          esmodules: true,
          node: '16',
        },
      },
    ],
  ],
  // plugins: [['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }]],
}

const ts = js

module.exports = {
  js,
  ts,
}
