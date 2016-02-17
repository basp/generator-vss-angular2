"use strict";

const path = require('path');
const gulp = require('gulp');
const inject = require('gulp-inject');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync');

gulp.task('default', () => {
  console.log('Hello from Gulp!');
});