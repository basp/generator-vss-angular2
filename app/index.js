"use strict";

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
    'index.html': function() {
      this.fs.copyTpl(
        this.templatePath('src/_index.html'),
        this.destinationPath('src/index.html'),
        {
          title: appname
        }
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
        private: true
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