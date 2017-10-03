export default {
  id: 'subway',
  title: 'Subways',
  visible: true,
  layers: [
    {
      layer: {
        id: 'subway_green',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', '4'],
        ],
        paint: {
          'line-color': 'rgba(0, 147, 60, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_yellow',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', 'N'],
        ],
        paint: {
          'line-color': 'rgba(252, 204, 10, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_gray',
        source: 'transportation',
        'source-layer': 'subway-routes',
        filter: [
          'all',
          ['==', 'rt_symbol', 'L'],
        ],
        paint: {
          'line-color': 'rgba(167, 169, 172, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_brown',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', 'J'],
        ],
        paint: {
          'line-color': 'rgba(153, 102, 51, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_light_green',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', 'G'],
        ],
        paint: {
          'line-color': 'rgba(108, 190, 69, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_orange',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', 'B'],
        ],
        paint: {
          'line-color': 'rgba(255, 99, 25, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_blue',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'any',
          ['==', 'rt_symbol', 'A'],
          ['==', 'rt_symbol', 'SI'],
        ],
        paint: {
          'line-color': 'rgba(0, 57, 166, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_purple',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', '7'],
        ],
        paint: {
          'line-color': 'rgba(185, 51, 173, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_red',
        source: 'transportation',
        'source-layer': 'subway-routes',
        type: 'line',
        filter: [
          'all',
          ['==', 'rt_symbol', '1'],
        ],
        paint: {
          'line-color': 'rgba(238, 53, 46, 1)',
          'line-width': {
            stops: [
              [10, 1],
              [15, 4],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_stations',
        minzoom: 11,
        source: 'transportation',
        'source-layer': 'subway-stops',
        type: 'circle',
        paint: {
          'circle-color': 'rgba(255, 255, 255, 1)',
          'circle-opacity': {
            stops: [
              [11, 0],
              [12, 1],

            ],
          },
          'circle-stroke-opacity': {
            stops: [
              [11, 0],
              [12, 1],

            ],
          },
          'circle-radius': {
            stops: [
              [10, 2],
              [14, 5],
            ],
          },
          'circle-stroke-width': 1,
          'circle-pitch-scale': 'map',
        },
      },
    },
    {
      layer: {
        id: 'subway_stations_labels',
        minzoom: 13,
        source: 'transportation',
        'source-layer': 'subway-stops',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'symbol-placement': 'point',
          'symbol-spacing': 250,
          'symbol-avoid-edges': false,
          'text-size': 14,
          'text-anchor': 'center',
        },
        paint: {
          'text-halo-color': 'rgba(255, 255, 255, 1)',
          'text-halo-width': 1,
          'text-translate': [1, 20],
          'text-opacity': {
            stops: [
              [13, 0],
              [14, 1],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_entrances',
        minzoom: 15,
        source: 'transportation',
        'source-layer': 'subway-entrances',
        type: 'symbol',
        layout: {
          'icon-image': 'rail-15',
          'icon-allow-overlap': true,
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-anchor': 'top',
        },
        paint: {
          'icon-opacity': {
            stops: [
              [15.5, 0],
              [16.5, 1],
            ],
          },
        },
      },
    },
    {
      layer: {
        id: 'subway_entrances_labels',
        minzoom: 15,
        source: 'transportation',
        'source-layer': 'subway-entrances',
        type: 'symbol',
        layout: {
          'text-field': 'Entrance',
          'symbol-placement': 'point',
          'symbol-spacing': 250,
          'symbol-avoid-edges': false,
          'text-size': 8,
          'text-offset': [0, 2],
          'text-anchor': 'center',
        },
        paint: {
          'text-halo-color': 'rgba(255, 255, 255, 1)',
          'text-halo-width': 1,
          'text-opacity': {
            stops: [
              [15.5, 0],
              [16.5, 1],
            ],
          },
        },
      },
    },
  ],
};
