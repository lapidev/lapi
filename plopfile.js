export default function (plop) {
  plop.setGenerator('package', {
    description: 'npm package generator',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'name of the package excluding @lapidev/ prefix',
      },
      {
        type: 'input',
        name: 'description',
        message: 'description of the package',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'templates/package/package.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/src/index.ts',
        templateFile: 'templates/package/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/tsconfig.json',
        templateFile: 'templates/package/tsconfig.json.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/jest.config.cjs',
        templateFile: 'templates/package/jest.config.cjs.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/test/index.spec.ts',
        templateFile: 'templates/package/index.spec.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{name}}/babel.config.cjs',
        templateFile: 'templates/package/babel.config.cjs.hbs',
      },
    ],
  })
}
