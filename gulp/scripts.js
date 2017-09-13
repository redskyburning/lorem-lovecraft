'use strict';

let path = require('path');
let gulp = require('gulp');
let conf = require('./conf');

let browserSync = require('browser-sync');
let webpack     = require('webpack-stream');
const argv      = require('yargs').argv;

let $ = require('gulp-load-plugins')();

function webpackWrapper(watch, test, callback) {
  let webpackOptions = {
    watch : watch,
    module: {
      preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders   : [{test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']}]
    },
    output: {filename: 'index.module.js'}
  };

  if (watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  let webpackChangeHandler = function(err, stats) {
    if (err) {
      conf.errorHandler('Webpack')(err);
    }
    $.util.log(stats.toString({
      colors : $.util.colors.supportsColor,
      chunks : false,
      hash   : false,
      version: false
    }));
    browserSync.reload();
    if (watch) {
      watch = false;
      callback();
    }
  };

  let sources = [path.join(conf.paths.src, '/app/index.module.js')];
  if (test) {
    sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
  }

  let environment = argv.environment || 'development';
  let gaId        = argv.gaId || null;

  return gulp.src(sources)
             .pipe(webpack(webpackOptions, null, webpackChangeHandler))
             .pipe($.replace('<--environment-target-->', environment))
             .pipe($.replace('<--ga-id-target-->', gaId))
             .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function() {
  return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function(callback) {
  return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function() {
  return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function(callback) {
  return webpackWrapper(true, true, callback);
});
