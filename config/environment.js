'use strict';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'labs-zola',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: 'https://layers-api-staging.planninglabs.nyc',
    namespace: 'v1',

    defaultLayerGroupState: [
      { id: 'zoning-districts', visible: true },
      { id: 'street-centerlines', visible: true },
      { id: 'commercial-overlays', visible: true },
      { id: 'zoning-map-amendments', visible: false },
      { id: 'zoning-map-amendments-pending', visible: false },
      { id: 'special-purpose-districts', visible: false, layers: [{}, { clickable: true, highlightable: true }] },
      { id: 'special-purpose-subdistricts', visible: false },
      { id: 'limited-height-districts', visible: false },
      { id: 'mandatory-inclusionary-housing', visible: false },
      { id: 'inclusionary-housing', visible: false },
      { id: 'transit-zones', visible: false },
      { id: 'fresh', visible: false },
      { id: 'sidewalk-cafes', visible: false },
      { id: 'low-density-growth-mgmt-areas', visible: false },
      { id: 'coastal-zone-boundary', visible: false },
      { id: 'waterfront-access-plan', visible: false },
      { id: 'historic-districts', visible: false },
      { id: 'floodplain-efirm2007', visible: false },
      { id: 'floodplain-pfirm2015', visible: false },
      { id: 'appendixj-designated-mdistricts', visible: false },
      { id: 'business-improvement-districts', visible: false },
      { id: 'industrial-business-zones', visible: false },
      { id: 'boroughs', visible: false },
      { id: 'community-districts', visible: false },
      { id: 'nyc-council-districts', visible: false },
      { id: 'ny-senate-districts', visible: false },
      { id: 'assembly-districts', visible: false },
      { id: 'neighborhood-tabulation-areas', visible: false },
      { id: 'subway', visible: true },
      { id: 'building-footprints', visible: true },
      { id: 'three-d-buildings', visible: false },
      { id: 'aerials', visible: false },
      { id: 'tax-lots', visible: true, layers: [{ tooltipable: true }] },
      { id: 'landmarks', visible: false },
      { id: 'e-designations', visible: false },
    ],

    'mapbox-gl': {
      accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',
    },

    'labs-search': {
      host: 'https://search-api.planninglabs.nyc',
      helpers: [
        'geosearch',
        'bbl',
        // 'neighborhood',
        // 'zoning-district',
        // 'zoning-map-amendment',
        // 'special-purpose-district',
        // 'commercial-overlay',
      ],
    },

    carto: {
      username: 'planninglabs',
      domain: 'https://planninglabs.carto.com',
    },

    fontawesome: {
      icons: {
        'free-regular-svg-icons': [
          'check-square',
          'circle',
          'dot-circle',
          'square',
        ],
        'free-solid-svg-icons': [
          'angle-up',
          'bookmark',
          'caret-down',
          'caret-up',
          'check-square',
          'chevron-down',
          'chevron-left',
          'chevron-up',
          'circle',
          'exclamation-triangle',
          'external-link-alt',
          'home',
          'info-circle',
          'link',
          'map-pin',
          'pen',
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
          debug: environment === 'development-ga',
          trace: environment === 'development-ga',
          // Ensure development env hits aren't sent to GA
          sendHitTask: (environment !== 'development' && environment !== 'devlocal'),
        },
      },
    ],

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
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
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
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

    ENV['labs-search'] = {
      host: 'https://search-api.planninglabs.nyc',
      helpers: [
        'geosearch',
        'bbl',
        'neighborhood',
        'zoning-district',
        'zoning-map-amendment',
        'special-purpose-district',
        'commercial-overlay',
      ],
    };

    ENV.host = '';
  }

  if (environment === 'devlocal') {
    // here you can enable a devlocal-specific feature
    ENV.host = 'http://localhost:3000';
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
