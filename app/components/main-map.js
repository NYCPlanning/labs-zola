import Ember from 'ember';
import mapboxgl from 'mapbox-gl';
import { task } from 'ember-concurrency';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import carto from '../utils/carto';

const { reads } = Ember.computed;
const { service } = Ember.inject;

const zmaSQL = 'SELECT the_geom_webmercator, ulurpno FROM support_nyzma';

const zmaFillLayer = {
  id: 'zma',
  type: 'line',
  source: 'zma',
  'source-layer': 'layer0',
  paint: {
    'line-width': 2,
    'line-color': 'red',
    'line-dasharray': [1, 1],
    'line-opacity': 0.6,
  },
};

const zoningSQL = 'SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd';
const zdFillLayer = {
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
};

const zdLineLayer = {
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
};

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

const zdLabelLayer = {
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
};

const plutoSQL = 'SELECT the_geom_webmercator, bbl, address FROM support_mappluto';

const plutoFillLayer = {
  id: 'pluto-fill',
  type: 'fill',
  source: 'pluto',
  minzoom: 15,
  'source-layer': 'layer0',
  paint: {
    'fill-opacity': 0,
  },
};

const plutoLineLayer = {
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
};

const highlightedLotLayer = {
  id: 'highlighted-lot',
  type: 'fill',
  source: 'highlighted-lot',
  paint: {
    'fill-opacity': 0.8,
    'fill-color': '#E86400',
  },
};

const selectedLotLayer = {
  id: 'selected-lot',
  type: 'fill',
  source: 'selected-lot',
  paint: {
    'fill-opacity': 1,
    'fill-color': 'steelblue',
  },
};

export default Ember.Component.extend({
  mainMap: service(),

  classNames: ['map-container'],

  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,

  @computed('mainMap.selected')
  fitBoundsOptions(selected) {
    return {
      padding: selected ? 80 : 0,
    };
  },

  highlightedLotFeatures: [],

  @computed('highlightedLotFeatures')
  highlightedLotSource(features) {
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    };
  },
  highlightedLotLayer,

  @computed('mainMap.selected')
  selectedLotSource(selected) {
    return {
      type: 'geojson',
      data: selected.get('geometry'),
    };
  },
  selectedLotLayer,

  zoningSourcePromise: task(function* () {
    return yield carto.getVectorTileTemplate([zoningSQL])
      .then(zoningTemplate => ({
        type: 'vector',
        tiles: [zoningTemplate],
      }));
  }).restartable().on('didInsertElement'),

  zoningSource: reads('zoningSourcePromise.last.value'),

  zdFillLayer,
  zdLineLayer,
  zdLabelLayer,

  plutoSourcePromise: task(function* () {
    return yield carto.getVectorTileTemplate([plutoSQL])
      .then(plutoTemplate => ({
        type: 'vector',
        tiles: [plutoTemplate],
        minzoom: 12,
      }));
  }).restartable().on('didInsertElement'),

  plutoSource: reads('plutoSourcePromise.last.value'),

  plutoFillLayer,
  plutoLineLayer,

  zmaSourcePromise: task(function* () {
    return yield carto.getVectorTileTemplate([zmaSQL])
      .then(zmaTemplate => ({
        type: 'vector',
        tiles: [zmaTemplate],
      }));
  }).restartable().on('didInsertElement'),

  zmaSource: reads('zmaSourcePromise.last.value'),

  zmaFillLayer,

  actions: {
    handleMapLoad(map) {
      const mainMap = this.get('mainMap');
      mainMap.set('mapInstance', map);
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      map.moveLayer('building');
      setTimeout(() => { map.setPaintProperty('building', 'fill-opacity', 0.4); }, 1000);
    },

    handleMouseover(e) {
      const features = e.target.queryRenderedFeatures(e.point, { layers: ['pluto-fill'] });

      if (features.length > 0) {
        const { bbl } = features[0].properties;

        e.target.getCanvas().style.cursor = 'pointer';

        const prevFeatures = this.get('highlightedLotFeatures');

        if (prevFeatures.length < 1 || prevFeatures[0].properties.bbl !== bbl) {
          this.set('highlightedLotFeatures', features);
        }
      } else {
        e.target.getCanvas().style.cursor = '';

        this.set('highlightedLotFeatures', []);
        this.set('mouseoverLocation', null);
      }
    },

    handleMouseleave() {
      this.set('highlightedLotFeatures', []);
      this.set('mouseoverLocation', null);
    },
  },
});
