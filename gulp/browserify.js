'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var tsify = require('tsify');
var envify = require('envify');
var watchify = require('watchify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var ts = require('typescript');

var src = ['./src/demo/main.tsx', './typings/jasmine/jasmine.d.ts', './typings/react/react.d.ts', './typings/flux/flux.d.ts', './typings/node/node.d.ts'];
var dest = './dist/scripts';
var dependencies = [
  'react/addons',
  'flux',
  'events',
  'babel/polyfill'
];

var tsOptions = require(__dirname + '/../src/demo/tsconfig.json').compilerOptions;
tsOptions.typescript = ts;

function readableDateHash() {
  return new Date().toISOString().replace(/:/g, '-');
}

function bundle(options) {
  var mainBundler = browserify({
    entries: src,
    debug: options.isDevelopment,
    cache: {}, packageCache: {}, fullPaths: options.isDevelopment
  })
  .external(dependencies)
  .plugin(tsify, tsOptions)
  // .plugin('tsify')
  .transform(babelify.configure({ sourceMaps: false, extensions:['.js', '.jsx', '.ts', '.tsx'] }));

  var vendorBundler = browserify({
    debug: options.isDevelopment,
    require: dependencies,
    cache: {}, packageCache: {}, fullPaths: options.isDevelopment
  });

  var errorOccurred = false;

  function rebundleMain(done) {
    return mainBundler.bundle()
      .on('end', endHandler(done))
      .on('error', notify.onError({
        title: 'APP Bundle',
        message: 'Failing to build...',
        emitError: true,
        sound: false
      }))
      .on('error', errorHandler('app', done))
      .pipe(source(options.isDevelopment ? 'main.js' : 'main-' + readableDateHash() + '.js'))
      .pipe(gulpif(!options.isDevelopment, streamify( uglify() )))
      .pipe(gulp.dest(dest))
      .pipe(gulpif(errorOccurred, notify(function () {
        errorOccurred = false;
        return {
          title: 'APP Bundle',
          message:'Building again successfully!',
          sound: false
        };
      })));
  }

  function rebundleVendor(done) {
    return vendorBundler.bundle()
      .on('end', endHandler(done))
      .on('error', errorHandler('vendor', done))
      .pipe(source(options.isDevelopment ? 'vendor.js' : 'vendor-' + readableDateHash() + '.js'))
      .pipe(gulpif(!options.isDevelopment, streamify( uglify() )))
      .pipe(gulp.dest(dest));
  }

  function endHandler(done) {
    return function() {
      if (done) {
        done();
      }
    };
  }

  function errorHandler(bundleName, done) {
    return function(error) {
      gutil.log(error);
      gutil.log(gutil.colors.bgRed.bold('There is a problem in the ' + bundleName + ' bundle!'));
      errorOccurred = true;
      if (done) { done(error); }
    };
  }

  function promise(rebundle, resolveValue) {
    return new Promise(function(resolve, reject) {
      rebundle(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(resolveValue);
        }
      });
    });
  }

  if (options.shouldWatch) {
    mainBundler = watchify(mainBundler);
    mainBundler.on('update', function() { rebundleMain(); });

    vendorBundler = watchify(vendorBundler);
    vendorBundler.on('update', function() { rebundleVendor(); });
  }

  return Promise.all([
    promise(rebundleVendor, 'vendor bundle created!'),
    promise(rebundleMain, 'main bundle created!')
  ]);
}

module.exports = {
  build: function() { return bundle({ isDevelopment: false, shouldWatch: false }); },
  watch: function() { return bundle({ isDevelopment: true,  shouldWatch: true }); }
};
