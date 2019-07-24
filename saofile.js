const { random } = require('superb');

module.exports = {
  prompts() {
    return [
      {
        name: 'pm',
        message: 'NPM or Yarn',
        type: 'list',
        default: 'yarn',
        choices: ['npm', 'yarn'],
      },
      {
        name: 'name',
        message: 'Project name',
        default: this.outFolder,
      },
      {
        name: 'description',
        message: 'Project description',
        default: `My ${random()} TypeScript library`,
      },
      {
        name: 'author',
        type: 'string',
        message: 'Author name',
        default: this.gitUser.name,
        store: true,
      },
      {
        name: 'private',
        type: 'confirm',
        message: 'Private package',
        default: false,
      },
      {
        name: 'username',
        type: 'string',
        message: 'GitHub username',
        default: ({ author }) => this.gitUser.username || author,
        store: true,
      },
      {
        name: 'email',
        type: 'string',
        message: 'GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v),
      },
      {
        name: 'repo',
        message: 'Repository name',
        default: ({ name }) => name,
      },
      {
        name: 'lint',
        message: 'Enable linting with TSLint',
        type: 'confirm',
        default: true,
      },
      {
        name: 'test',
        message: 'Enable testing with Mocha',
        type: 'confirm',
        default: true,
      },
      {
        name: 'tslib',
        message: 'Include tslib',
        type: 'confirm',
        default: true,
      },
      {
        name: 'ts_decorators',
        message: 'Enable TypeScript decorators',
        type: 'confirm',
        default: false,
      },
      {
        name: 'ts_sourcemap',
        message: 'Enable TypeScript sourcemaps',
        type: 'confirm',
        default: true,
      },
      {
        name: 'appveyor',
        message: 'Enable AppVeyor CI',
        type: 'confirm',
        default: true,
      },
      {
        name: 'travis',
        message: 'Enable Travis CI',
        type: 'confirm',
        default: true,
      },
      {
        name: 'travis_deploy',
        message: 'Enable deployment with Travis CI',
        type: 'confirm',
        default: true,
        when: ({ travis }) => travis,
      },
      {
        name: 'npm_api_key',
        message: 'Encrypted NPM auth token',
        type: 'password',
        when: ({ travis_deploy }) => travis_deploy,
      },
    ];
  },

  actions() {
    switch (this.answers.pm) {
    case 'npm':
      this.answers.pm_run = (script, ...args) => `npm run ${script} --${['', args].join(' ')}`;
      break;
    case 'yarn':
      this.answers.pm_run = (script, ...args) => `yarn ${script}${['', args].join(' ')}`;
      break;
    }

    const actions = [];

    actions.push({
      type: 'add',
      files: '**',
      filters: {
        'test/**': this.answers.test,
        'tslint.json': this.answers.lint,
        '.travis.yml': this.answers.travis,
        'appveyor.yml': this.answers.appveyor,
      },
    });

    actions.push({
      type: 'move',
      patterns: {
        '_.gitignore': '.gitignore',
        '_.npmignore': '.npmignore',
        '_package.json': 'package.json',
      },
    });

    actions.push({
      type: 'modify',
      files: 'package.json',
      handler: data => require('./src/make-package')(this.answers, data)
    });

    return actions;
  },

  async completed() {
    await this.gitInit();
    await this.npmInstall({ packageManager: this.answers.pm });
    this.showProjectTips();
  },
};
