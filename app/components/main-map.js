import Ember from 'ember';
import carto from '../utils/carto';

const zoningSQL = 'SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd';
const zdLayer = {
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
        ['C1', '#ff0000'],
        ['C2', '#ff0000'],
        ['C3', '#ff0000'],
        ['C4', '#ff0000'],
        ['C5', '#ff0000'],
        ['C6', '#ff0000'],
        ['C7', '#ff0000'],
        ['C8', '#ff0000'],
        ['M1', '#E362FB'],
        ['M2', '#E362FB'],
        ['M3', '#E362FB'],
        ['PA', '#78D271'],
        ['R1', '#F2F618'],
        ['R2', '#F2F618'],
        ['R3', '#F2F618'],
        ['R4', '#F2F618'],
        ['R5', '#F2F618'],
        ['R6', '#F2F618'],
        ['R7', '#F2F618'],
        ['R8', '#F2F618'],
        ['R9', '#F2F618'],
      ],
    },
    'fill-opacity': 0.3,
    'fill-antialias': true,
    'fill-outline-color': '#444',
  },
};

const paint = {
  labels: {
    'text-color': '#626262',
    'text-halo-color': '#FFFFFF',
    'text-halo-width': 2,
    'text-halo-blur': 2,
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
  },
  minzoom: 14,
};

const plutoSQL = 'SELECT the_geom_webmercator, bbl, address FROM support_mappluto';

const plutoLayer = {
  id: 'pluto',
  type: 'line',
  source: 'pluto',
  'source-layer': 'layer0',
  'paint': {
    'line-color': '#888',
    'line-width': 1,
  },
};

export default Ember.Component.extend({
  classNames: ['main-map'],
  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,

  zoningSourcePromise: Ember.computed('zoningTemplate', () => { // eslint-disable-line
    return carto.getVectorTileTemplate([zoningSQL])
      .then(zoningTemplate => ({
        type: 'vector',
        tiles: [zoningTemplate],
      }));
  }),

  zdLayer,
  zdLabelLayer,

  plutoSourcePromise: Ember.computed('plutoTemplate', () => { // eslint-disable-line
    return carto.getVectorTileTemplate([plutoSQL])
      .then(plutoTemplate => ({
        type: 'vector',
        tiles: [plutoTemplate],
        minzoom: 12,
      }));
  }),

  plutoLayer,
});
