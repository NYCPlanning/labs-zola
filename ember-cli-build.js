const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = (defaults) => {
  const app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true,
    },
    treeShaking: {
      enabled: true,
      include: [
        // This is where you can add additional entry points.

        // This is an example of dynamic lookup. There is no import statement, so it needs a hint to prevent removal.
        // https://github.com/poteto/ember-metrics/blob/c0fecc9e85190009d4d08d5be7db88df3e9803ea/addon/services/metrics.js#L177
        'ember-metrics/metrics-adapters/google-analytics.js',
      ],
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
