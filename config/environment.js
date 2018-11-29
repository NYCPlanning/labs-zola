'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'labs-zola',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: 'https://layers-api-staging.planninglabs.nyc',
    namespace: 'v1',

    'mapbox-gl': {
      accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',
    },

    'labs-search': {
      host: 'https://search-api.planninglabs.nyc',
      helpers: [
        'geosearch',
        'neighborhood',
        'bbl',
        'zoning-district',
        'zoning-map-amendment',
        'special-purpose-district',
        'commercial-overlay',
      ],
    },

    fontawesome: {
      icons: {
        'free-regular-svg-icons': [
          'circle',
        ],
        'free-solid-svg-icons': [
          'angle-up',
          'bookmark',
          'caret-down',
          'caret-up',
          'chevron-down',
          'chevron-left',
          'chevron-up',
          'external-link-alt',
          'home',
          'info-circle',
          'map-pin',
          'print',
          'search',
          'spinner',
          'square',
          'times',
          'tree',
          'undo',
          'window-minimize',
        ],
      },
    },
    
    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-84250233-8',
          debug: environment === 'development',
          trace: environment === 'development',
          // Ensure development env hits aren't sent to GA
          sendHitTask: (environment !== 'development' && environment !== 'devlocal'),
        },
      },
    ],

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    // here you can enable a staging-specific feature
    ENV.host = 'https://layers-api-staging.planninglabs.nyc';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.host = 'https://layers-api.planninglabs.nyc';
  }

  return ENV;
};
