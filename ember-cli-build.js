'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const babelPlugin = require('ember-auto-import/babel-plugin');
const sass = require('sass-embedded');

if (!('FASTBOOT_DISABLED' in process.env)) {
  process.env.FASTBOOT_DISABLED = EmberApp.env() !== 'production';
}

module.exports = (defaults) => {
  const app = new EmberApp(defaults, {
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
      plugins: [babelPlugin],
    },
    autoImport: {
      webpack: {
        resolve: {
          fallback: {
            fs: false,
            path: false,
          },
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
      implementation: sass,
      includePaths: [
        'node_modules/foundation-sites/scss',
        'node_modules/nyc-planning-style-guide/dist/assets/scss',
      ],
      implementation: sass,
      sourceMapEmbed: true,
    },
  });

  return app.toTree();
};
