'use strict';

const HOST = process.env.API_HOST || 'https://layers-api.planninglabs.nyc';

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'labs-zola',
    environment,
    rootURL: '/',
    locationType: 'auto',
    host: HOST,
    namespace: 'v1',

    gReCaptcha: {
      jsUrl: 'https://www.google.com/recaptcha/api.js?render=explicit',
      siteKey: '6LeOMr0ZAAAAAD2O8q7y7JjJKiN-zkBGZIIjp1mL',
    },

    fastboot: {
      hostWhitelist: ['https://planninglabs.carto.com/**', 'carto.com', 'planninglabs.carto.com', /^localhost:\d+$/, 'dry-thicket-91267.herokuapp.com'],
    },

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

    specialDistrictCrosswalk: [
      ['Special Grand Concourse Preservation District', ['C', 'bronx']],
      ['Special City Island District', ['CD', 'bronx']],
      ['Special Hunts Point District', ['HP', 'bronx']],
      ['Special Harlem River Waterfront District', ['HRW', 'bronx']],
      ['Jerome Corridor District', ['J', 'bronx']],
      ['Special Natural Area District', ['natural_area', 'bronx']],
      ['Special Natural Area District', ['natural_area', 'bronx']],
      ['Special Natural Area District', ['natural_area', 'bronx']],
      ['Special Bay Ridge District', ['BR', 'brooklyn']],
      ['Special Coney Island District', ['CI', 'brooklyn']],
      ['Special Coney Island Mixed Use District', ['CO', 'brooklyn']],
      ['Special Downtown Brooklyn District', ['DB', 'brooklyn']],
      ['Special Ocean Parkway District', ['OP', 'brooklyn']],
      ['Special Sheepshead Bay District', ['SB', 'brooklyn']],
      ['Special Coastal Risk District', ['CR', 'citywide']],
      ['Special Limited Commercial District', ['LC', 'citywide']],
      ['Mixed Use District/Enhanced Commercial District 5', ['mixed_use', 'citywide']],
      ['Mixed Use District/Enhanced Commercial District 6', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-1)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-10)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-11)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-12)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-13)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-14)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-15)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-16)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-17)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-2)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-4)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-5)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-6)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-7)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-8)', ['mixed_use', 'citywide']],
      ['Special Mixed Use District (MX-9)', ['mixed_use', 'citywide']],
      ['Special Fort Totten Natural Area District-4', ['natural_area', 'citywide']],
      ['Special Planned Community Preservation District', ['planned_community', 'citywide']],
      ['Special Scenic View District', ['scenic_view', 'citywide']],
      ['Special Enhanced Commercial District 4', ['special_enhanced', 'citywide']],
      ['Special Enhanced Commercial District 5', ['special_enhanced', 'citywide']],
      ['Special Enhanced Commercial District 6', ['special_enhanced', 'citywide']],
      ['Special Enhanced Commercial District- 1', ['special_enhanced', 'citywide']],
      ['Special Enhanced Commercial District- 2', ['special_enhanced', 'citywide']],
      ['Special Enhanced Commercial District- 3', ['special_enhanced', 'citywide']],
      ['Special 125th Street Dist/Transit Land use Dist', ['125th', 'manhattan']],
      ['Special 125th Street District', ['125th', 'manhattan']],
      ['Special Battery Park City District', ['BPC', 'manhattan']],
      ['Special Clinton District', ['CL', 'manhattan']],
      ['East Harlem Corridors', ['EHC', 'manhattan']],
      ['East Harlem Corridors/Transit Land Use District', ['EHC', 'manhattan']],
      ['Special Garment Center District', ['GC', 'manhattan']],
      ['Special Governors Island District', ['GI', 'manhattan']],
      ['Special Hudson River Park District', ['HRP', 'manhattan']],
      ['Special Hudson Square District', ['HSQ', 'manhattan']],
      ['Special Hudson Yards District', ['HY', 'manhattan']],
      ['Special Inwood District', ['IN', 'manhattan']],
      ['Special Lincoln Square District', ['L', 'manhattan']],
      ['Special Little Italy District', ['LI', 'manhattan']],
      ['Special Lower Manhattan District', ['LM', 'manhattan']],
      ['Special Midtown District', ['MID', 'manhattan']],
      ['Special Manhattanville Mixed Use District', ['MMU', 'manhattan']],
      ['Special Madison Avenue Preservation District', ['MP', 'manhattan']],
      ['Special Park Improvement District', ['PI', 'manhattan']],
      ['Special Southern Roosevelt Island District', ['SRI', 'manhattan']],
      ['Special Transit Land Use District', ['TA', 'manhattan']],
      ['Special Tribeca Mixed Use District', ['TMU', 'manhattan']],
      ['Special United Nations Development District', ['U', 'manhattan']],
      ['Special Union Square District', ['US', 'manhattan']],
      ['Special West Chelsea District', ['WCh', 'manhattan']],
      ['Special College Point District', ['CP', 'queens']],
      ['Special Downtown Far Rockaway District', ['DFR', 'queens']],
      ['Special Downtown Jamaica District', ['DJ', 'queens']],
      ['Special Forest Hills District', ['FH', 'queens']],
      ['Special Long Island City Mixed Use District', ['LIC', 'queens']],
      ['Special Southern Hunters Point District', ['SHP', 'queens']],
      ['Special Willets Point District', ['WP', 'queens']],
      ['Special Bay Street Corridor District', ['BSC', 'staten-island']],
      ['Special Hillsides Preservation District', ['HS', 'staten-island']],
      ['Special St. George District', ['SG', 'staten-island']],
      ['Special South Richmond Development District', ['SRD', 'staten-island']],
      ['Special Stapleton Waterfront District', ['SW', 'staten-island']],
    ],

    zoningDistrictOptionSets: [
      {
        name: 'Commercial Districts',
        checked: true,
        codes: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
        style: {
          color: 'rgbA(229,0,0,0.6)',
        },
      },
      {
        name: 'Manufacturing Districts',
        checked: true,
        codes: ['M1', 'M2', 'M3'],
        style: {
          color: 'rgba(207,92,230,0.6)',
        },
      },
      {
        name: 'Residence Districts',
        checked: true,
        codes: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8', 'R9', 'R10'],
        style: {
          color: 'rgba(255,234,0,0.6)',
        },
      },
      {
        name: 'Parks',
        checked: true,
        codes: ['PA'],
        style: {
          color: 'rgba(120,210,113,0.6)',
        },
      },
      {
        name: 'Battery Park City',
        checked: true,
        codes: ['BP'],
        style: {
          color: 'rgba(128,128,128,0.6)',
        },
      },
    ],

    commercialOverlaysOptionSets: [
      {
        name: 'C1-1 through C1-5',
        checked: true,
        codes: ['C1-1', 'C1-2', 'C1-3', 'C1-4', 'C1-5'],
      },
      {
        name: 'C2-1 through C2-5',
        checked: true,
        codes: ['C2-1', 'C2-2', 'C2-3', 'C2-4', 'C2-5'],
      },
    ],

    floodplainEfirm2007OptionSets: [
      {
        name: 'V',
        checked: true,
        codes: ['V'],
        style: {
          color: '#0084a8',
        },
        tooltip: "A portion of the area subject to flooding from the 1% annual chance flood and referred to in the Zoning Resolution as the 'high-risk flood zone'. These areas are subject to high velocity wave action (a breaking wave 3 feet high or larger).",
      },
      {
        name: 'A',
        checked: true,
        codes: ['A'],
        style: {
          color: '#00a9e6',
        },
        tooltip: "A portion of the area subject to flooding from the 1% annual chance flood and referred to in the Zoning Resolution as the 'high-risk flood zone'. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.",
      },
      {
        name: 'Shaded X',
        checked: true,
        codes: ['Shaded X'],
        style: {
          color: '#00ffc3',
        },
        tooltip: "The area subject to flooding from the 0.2% annual chance flood and referred to in the Zoning Resolution as the 'moderate-risk flood zone'.",
      },
    ],

    floodplainPfirm2015OptionSets: [
      {
        name: 'V',
        checked: true,
        codes: ['V'],
        style: {
          color: '#0084a8',
        },
        tooltip: "A portion of the area subject to flooding from the 1% annual chance flood and referred to in the Zoning Resolution as the 'high-risk flood zone'. These areas are subject to high velocity wave action (a breaking wave 3 feet high or larger).",
      },
      {
        name: 'A',
        checked: true,
        codes: ['A'],
        style: {
          color: '#00a9e6',
        },
        tooltip: "A portion of the area subject to flooding from the 1% annual chance flood and referred to in the Zoning Resolution as the 'high-risk flood zone'. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.",
      },
      {
        name: 'Shaded X',
        checked: true,
        codes: ['Shaded X'],
        style: {
          color: '#00ffc3',
        },
        tooltip: "The area subject to flooding from the 0.2% annual chance flood and referred to in the Zoning Resolution as the 'moderate-risk flood zone'.",
      },
    ],

    'mapbox-gl': {
      accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',
    },

    'labs-search': {
      host: 'https://search-api-production.herokuapp.com',
      helpers: [
        'geosearch',
        'bbl',
        'neighborhood',
        'zoning-district',
        'zoning-map-amendment',
        'special-purpose-district',
        'commercial-overlay',
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

  return ENV;
};
