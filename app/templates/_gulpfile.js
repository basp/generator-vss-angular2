"use strict";

const path = require('path');
const gulp = require('gulp');
const inject = require('gulp-inject');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');

const TS_PROJECT = ts.createProject('tsconfig.json');

const DEV_DEPENDENCIES = [
  'es6-shim/es6-shim.min.js',
  'systemjs/dist/system-polyfills.js',
  'angular2/bundles/angular2-polyfills.js',
  'systemjs/dist/system.src.js',
  'rxjs/bundles/Rx.js',
  'angular2/bundles/angular2.dev.js',
  'angular2/bundles/router.dev.js',
  'angular2/bundles/http.dev.js',
  'jquery/dist/jquery.js',
  'materialize-css/dist/css/materialize.css',
  'materialize-css/dist/js/materialize.js',
  // 'bootstrap/dist/css/bootstrap.css',
  // 'bootstrap/dist/js/boostrap.js',
  'lodash/lodash.js',
  'moment/moment.js'
];

const WEBROOT = 'wwwroot';

gulp.task('build:app:dev', () => {
  let tsResult = gulp.src('src/**/*.ts')
    .pipe(ts(TS_PROJECT));

  return tsResult.js
    .pipe(gulp.dest(WEBROOT))
    .pipe(browserSync.stream());
});

gulp.task('build:index:dev', () => {
  let files = DEV_DEPENDENCIES
    .map(x => path.join('node_modules', x));

  let src = gulp.src(files)
    .pipe(gulp.dest(path.join(WEBROOT, 'vendor')));

  return gulp.src('src/index.html')
    .pipe(gulp.dest(WEBROOT))
    .pipe(inject(src, { relative: true }))
    .pipe(gulp.dest(WEBROOT))
    .pipe(browserSync.stream());
});

gulp.task('build:dev', ['build:index:dev', 'build:app:dev']);

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['build:app:dev']);
  gulp.watch('src/index.html', ['build:index:dev']);
});

gulp.task('serve', ['build:dev', 'watch'], () => {
  if (browserSync.active) {
    // We already have an active browser-sync tab, return early 
    return;
  }

  browserSync.init({
    server: {
      baseDir: WEBROOT,
      index: 'index.html',
      middleware: [historyApiFallback()]
    },
    logLevel: 'debug',
    logFileChanges: true,
    injectChanges: true,
    notify: true,
    reloadDelay: 50
  });
});

gulp.task('default', ['serve']);