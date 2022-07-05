module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    }
  },
  parser: 'babel-eslint',
  plugins: [
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:ember-best-practices/recommended',
  ],
  env: {
    browser: true,
  },
  globals:{
    '$': true,
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
    'camelcase': 0,
    'class-methods-use-this': 0,
    'max-len': 0,
    'no-param-reassign': 0,
    'ember/avoid-leaking-state-in-ember-objects': 0,
    'ember-best-practices/require-dependent-keys': 0,
  },
  overrides: [
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script'
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
