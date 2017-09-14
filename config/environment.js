const paint = {
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
    'text-opacity': {
      stops: [
        [
          12,
          0,
        ],
        [
          13,
          1,
        ],
      ],
    },
  },
  co_labels: {
    'text-color': 'rgba(255, 0, 0, 1)',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
  },
};

const env = function (environment) {
  const ENV = {
    modulePrefix: 'labs-zola',
    environment,
    rootURL: '/',
    locationType: 'auto',
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
    'mapbox-gl': {
      accessToken: 'pk.eyJ1IjoiY3dob25nbnljIiwiYSI6ImNpczF1MXdrdjA4MXcycXA4ZGtyN2x5YXIifQ.3HGyME8tBs6BnljzUVIt4Q',
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      zoningSQL: 'SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd',
      zdFillLayer: {
        id: 'zd',
        type: 'fill',
        source: 'zoning',
        'source-layer': 'layer0',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [
              ['BP', '#666666'],
              ['C1', '#ffa89c'],
              ['C2', '#ff9086'],
              ['C3', '#ff786f'],
              ['C4', '#ff6059'],
              ['C5', '#ff4843'],
              ['C6', '#ff302d'],
              ['C7', '#ff1816'],
              ['C8', '#ff0000'],
              ['M1', '#f3b7fb'],
              ['M2', '#eb8dfb'],
              ['M3', '#e362fb'],
              ['PA', '#78D271'],
              ['R1', '#f6f4b1'],
              ['R2', '#f6f49e'],
              ['R3', '#f5f58b'],
              ['R4', '#f5f578'],
              ['R5', '#f4f565'],
              ['R6', '#f4f551'],
              ['R7', '#f3f63e'],
              ['R8', '#f3f62b'],
              ['R9', '#f2f618'],
            ],
          },
          'fill-opacity': 0.3,
          'fill-antialias': true,
        },
      },

      zdLineLayer: {
        id: 'zd-lines',
        type: 'line',
        source: 'zoning',
        'source-layer': 'layer0',
        paint: {
          'line-opacity': {
            stops: [
              [12, 0],
              [13, 0.2],
            ],
          },
          'line-width': {
            stops: [
              [13, 1],
              [14, 3],
            ],
          },
        },
      },

      zdLabelLayer: {
        id: 'zd_labels',
        source: 'zoning',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: paint.labels,
        layout: {
          'symbol-placement': 'point',
          'text-field': '{zonedist}',
          'text-size': {
            stops: [
              [
                10,
                8,
              ],
              [
                14,
                16,
              ],
            ],
          },
        },
      },

      plutoSQL: 'SELECT the_geom_webmercator, bbl, address FROM support_mappluto',

      plutoFillLayer: {
        id: 'pluto-fill',
        type: 'fill',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'layer0',
        paint: {
          'fill-opacity': 0,
        },
      },

      plutoLineLayer: {
        id: 'pluto-line',
        type: 'line',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'layer0',
        paint: {
          'line-width': 0.5,
          'line-color': 'rgba(130, 130, 130, 1)',
          'line-opacity': {
            stops: [
              [15, 0],
              [16, 1],
            ],
          },
        },
      },

      highlightedLotLayer: {
        id: 'highlighted-lot',
        type: 'fill',
        source: 'highlighted-lot',
        paint: {
          'fill-opacity': 0.8,
          'fill-color': '#E86400',
        },
      },

      selectedLotLayer: {
        id: 'selected-lot',
        type: 'fill',
        source: 'selected-lot',
        paint: {
          'fill-opacity': 1,
          'fill-color': 'steelblue',
        },
      },

      facilitiesSQL: 'SELECT the_geom_webmercator, facname, facdomain, uid FROM facdb_170522',
      floodplain2050SQL: 'SELECT * FROM cdprofiles_floodplain_2050',
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
  }

  if (environment === 'production') {}; // eslint-disable-line

  const mapConfig = [
    {
      id: 'pluto',
      title: 'Land Use',
      sql: ENV.APP.plutoSQL,
      minzoom: 12,
      type: 'carto',
      layers: [
        { layer: ENV.APP.plutoFillLayer },
        { layer: ENV.APP.plutoLineLayer },
      ],
    },
    {
      id: 'zoning',
      title: 'Zoning',
      sql: ENV.APP.zoningSQL,
      type: 'carto',
      layers: [
        {
          layer: ENV.APP.zdFillLayer,
          before: 'waterway-label',
        },
        { layer: ENV.APP.zdLineLayer,
          before: 'waterway-label',
        },
        {
          layer: ENV.APP.zdLabelLayer,
          before: 'waterway-label',
        },
      ],
      filters: [
        {
          columnName: 'proptype',
          type: 'multiSelect',
          disabled: true,
          values: [
            {
              value: 'City Owned',
              label: 'City Owned',
            },
            {
              value: 'City Leased',
              label: 'City Leased',
            },
            {
              value: '',
              label: 'Not Owned or Leased by City',
            },
          ],
        },
        {
          columnName: 'birdType',
          type: 'multiSelect',
          disabled: true,
          values: [
            {
              value: 'City Owned',
              label: 'City Owned',
            },
            {
              value: 'City Leased',
              label: 'City Leased',
            },
            {
              value: '',
              label: 'Not Owned or Leased by City',
            },
          ],
        },
      ],
    },
    {
      id: 'facilities',
      title: 'Facilities',
      type: 'carto',
      sql: ENV.APP.facilitiesSQL,
      visible: true,
      layers: [
        {
          layer: {
            id: 'facilities-points-outline',
            type: 'circle',
            source: 'facilities',
            'source-layer': 'layer0',
            paint: {
              'circle-radius': { stops: [[10, 3], [15, 7]] },
              'circle-color': '#012700',
              'circle-opacity': 0.7,
            },
          },
        },
      ],
      filters: [
        {
          columnName: 'proptype',
          type: 'multiSelect',
          disabled: true,
          values: [
            {
              value: 'City Owned',
              label: 'City Owned',
            },
            {
              value: 'City Leased',
              label: 'City Leased',
            },
            {
              value: '',
              label: 'Not Owned or Leased by City',
            },
          ],
        },
      ],
    },
    {
      id: 'aerial-raster',
      type: 'raster',
      title: '2016 Aerial',
      tiles: ['https://api.capitalplanning.nyc/tiles/doitt/tms/1.0.0/photo/2016/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 14,
      visible: false,
      layers: [
        {
          layer: {
            id: 'landuse-raster',
            type: 'raster',
            source: 'aerial-raster',
            maxzoom: 14,
          },
          before: 'zd',
        },
      ],
    },
  ];

  ENV.mapConfig = mapConfig;

  return ENV;
};

module.exports = env;
