const when = (condition, value, fallback) => (condition ? value : fallback);
const commands = (...cmds) => cmds.filter(Boolean).join(' && ') || undefined;

module.exports = (
  {
    name,
    description,
    author,
    username,
    repo,
    email,
    lint,
    test,
    ts_decorators,
    tslib,
    private,
    pm_run,
  },
  data
) => {
  return {
    name,
    version: '1.0.0',
    description,
    license: 'MIT',
    author: {
      name: author,
      url: `https://github.com/${username}`,
    },
    main: 'lib/index.js',
    types: 'lib/index.d.ts',
    homepage: `https://github.com/${username}/${repo}#readme`,
    bugs: {
      url: `https://github.com/${username}/${repo}/issues`,
    },
    repository: {
      type: 'git',
      url: `git+https://github.com/${username}/${repo}.git`,
    },
    publishConfig: when(!private, {
      access: 'public',
    }),
    scripts: {
      'build': 'tsc -p tsconfig.json',
      'lint': when(lint, `tslint -c tslint.json 'src/**/*.ts' 'test/**/*.ts'`),
      'lint:fix': when(lint, pm_run('lint', '--fix')),
      'test': when(test, 'mocha -r ts-node/register test/**/*.ts'),
      'prepublishOnly': commands(
        'yarn build',
        when(lint, pm_run('lint')),
        when(test, pm_run('test')),
      ),
    },
    dependencies: {
      'reflect-metadata': when(ts_decorators, '^0.1.13'),
      'tslib': when(tslib, '^1.10.0'),
    },
    devDependencies: {
      'tslint': when(lint, '^5.18.0'),
      '@types/chai': when(test, '^4.1.7'),
      '@types/mocha': when(test, '^5.2.7'),
      'chai': when(test, '^4.2.0'),
      'mocha': when(test, '^6.1.4'),
      'ts-node': when(test, '^8.3.0'),
      'typescript': '^3.5.3',
    },
  };
}
