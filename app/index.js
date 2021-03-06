'use strict';

const path = require('path');
const generators = require('yeoman-generator');

const WEBROOT = 'wwwroot';

let appname = 'sandbox';

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    console.log('initializing');
  },

  prompting: function() {
    console.log('prompting');
  },

  configuring: function() {
    appname = path.basename(process.cwd());
    console.log('configuring');
  },

  writing: {
    'index': function() {
      this.fs.copyTpl(
        this.templatePath('src/_index.html'),
        this.destinationPath('src/index.html'),
        {
          title: appname
        }
      );
    },

    'app': function() {
      this.fs.copy(
        this.templatePath('src/app/_app.component.ts'),
        this.destinationPath('src/app/app.component.ts')
      );

      this.fs.copy(
        this.templatePath('src/app/_main.ts'),
        this.destinationPath('src/app/main.ts')
      );
    },

    '.tsdrc': function() {
      this.fs.copyTpl(
        this.templatePath('tsdrc'),
        this.destinationPath('.tsdrc')
      );
    },

    'tsd.json': function() {
      this.fs.copyTpl(
        this.templatePath('_tsd.json'),
        this.destinationPath('tsd.json')
      );
    },

    '.gitignore': function() {
      this.fs.copyTpl(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'),
        {
          webroot: WEBROOT
        }
      );
    },

    'gulpfile.js': function() {
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          webroot: WEBROOT
        }
      );
    },

    'tsconfig.json': function() {
      this.fs.copy(
        this.templatePath('_tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );
    },

    'package.json': function() {
      this.fs.writeJSON(this.destinationPath('package.json'), {
        name: appname,
        version: '0.1.0',
        private: true,
        scripts: {
          test: 'echo \"Error: no test specified\" && exit 1'
        },
        dependencies: {
          'angular2': '2.0.0-beta.7',
          'bootstrap': '^3.3.6',
          'material-css': '^0.97.5',
          'es6-promise': '^3.0.2',
          'es6-shim': '^0.33.3',
          'jquery': '^2.2.0',
          'lodash': '4.5.0',
          'moment': '^2.11.2',
          'reflect-metadata': '0.1.2',
          'rxjs': '5.0.0-beta.2',
          'systemjs': '^0.19.21',
          'zone.js': '0.5.15'
        },
        devDependencies: {
          'browser-sync': '^2.11.1',
          'connect-history-api-fallback': '^1.1.0',
          'del': '^2.2.0',
          'gulp': '^3.9.1',
          'gulp-inject': '^3.0.0',
          'gulp-typescript': '^2.11.0',
          'typescript': '^1.9.0-dev.20160217'
        }
      });
    }
  },

  conflicts: function() {
    console.log('conflicts');
  },

  install: function() {
    console.log('install');
  },

  end: function() {
    console.log('end');
  }
});