/* eslint-disable no-var, strict */
'use strict';

module.exports = function(config) {
  // Documentation: https://karma-runner.github.io/0.13/config/configuration-file.html
  config.set({
    browsers: [ 'PhantomJS' ],

    files: [
      'src/demo/dependencies.ts', // This ensures we have the es6 shims in place from babel
      './typings/jasmine/jasmine.d.ts', './typings/react/react.d.ts', './typings/flux/flux.d.ts', './typings/node/node.d.ts',
      'test/**/*.tests.ts',
      'test/**/*.tests.tsx'
    ],

    port: 9876,

    frameworks: [ 'jasmine', 'browserify', 'phantomjs-shim' ],

    logLevel: config.LOG_INFO, //config.LOG_DEBUG

    preprocessors: {
      'src/**/*.{js,ts,tsx}': [ 'browserify', 'sourcemap' ],
      'test/**/*.tests.{ts,tsx}': [ 'browserify', 'sourcemap' ]
    },

    browserify: {
      plugin: [ 'tsify' ],
      transform: [
        ['babelify', { sourceMaps: false, stage: 3 }],
      ]
    },

    // reporter options
    mochaReporter: {
      colors: {
        success: 'bgGreen',
        info: 'cyan',
        warning: 'bgBlue',
        error: 'bgRed'
      }
    },

    // the default configuration
    junitReporter: {
      outputDir: 'test-results', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: ''
    }
  });
};
