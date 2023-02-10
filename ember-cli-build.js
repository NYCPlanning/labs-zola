'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const babelPlugin = require('ember-auto-import/babel-plugin');

if (!('FASTBOOT_DISABLED' in process.env)) {
  process.env.FASTBOOT_DISABLED = EmberApp.env() !== 'production';
}

module.exports = (defaults) => {
  const app = new EmberApp(defaults, {
    prember: {
      urls: [
        '/',
        '/about',
      ],
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    '@ember-decorators/babel-transforms': {
      decoratorsBeforeExport: true,
    },
    'ember-cli-uglify': {
      uglify: {
        compress: {
          collapse_vars: false,
        },
      },
    },
    babel: {
      plugins: [babelPlugin, 'transform-object-rest-spread'],
    },
    autoImport: {
      webpack: {
        node: {
          fs: 'empty',
        },
      },
    },
    emberCliConcat: {
      js: {
        concat: process.env.EMBER_ENV === 'production',
        useAsync: process.env.EMBER_ENV === 'production',
      },
      css: {
        concat: false,
      },
    },
    fingerprint: {
      exclude: ['img/screenshot-1200x628.png'],
    },
    sassOptions: {
      includePaths: [
        'node_modules/foundation-sites/scss',
        'node_modules/nyc-planning-style-guide/dist/assets/scss',
      ],
      sourceMapEmbed: true,
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
