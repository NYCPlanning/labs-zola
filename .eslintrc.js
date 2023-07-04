'use strict';

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  plugins: [
    'ember',
    'decorator-position',
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:ember-best-practices/recommended',
    'plugin:decorator-position/ember',
  ],
  env: {
    browser: true,
  },
  globals: {
    $: true,
    d3: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'lines-around-directive': 0,
    'func-names': 0,
    'space-before-function-paren': 0,
    'prefer-arrow-callback': 0,
    'no-underscore-dangle': 0,
    camelcase: 0,
    'class-methods-use-this': 0,
    'max-len': 0,
    'no-param-reassign': 0,
    'ember/avoid-leaking-state-in-ember-objects': 0,
    'ember-best-practices/require-dependent-keys': 0,
    'no-undef': 0,
  },
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
