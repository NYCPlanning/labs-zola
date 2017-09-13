import Ember from 'ember';
import mapboxgl from 'mapbox-gl';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import config from '../config/environment';

const { APP } = config;

const {
  zoningSQL,
  zdFillLayer,
  zdLineLayer,
  zdLabelLayer,
  plutoSQL,
  plutoFillLayer,
  plutoLineLayer,
  highlightedLotLayer,
  selectedLotLayer }
  = APP;

const mapConfig = [
  {
    id: 'pluto',
    title: 'Land Use',
    sql: plutoSQL,
    minzoom: 12,
    type: 'carto',
    layers: [
      { layer: plutoFillLayer },
      { layer: plutoLineLayer },
    ],
  },
  {
    id: 'zoning',
    title: 'Zoning',
    sql: zoningSQL,
    type: 'carto',
    layers: [
      {
        layer: zdFillLayer,
        before: 'waterway-label',
      },
      { layer: zdLineLayer,
        before: 'waterway-label',
      },
      {
        layer: zdLabelLayer,
        before: 'waterway-label',
      },
    ],
  },
];

const { service } = Ember.inject;

export default Ember.Component.extend({
  mainMap: service(),

  classNames: ['map-container'],

  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,

  mapConfig,

  @computed('mainMap.selected')
  fitBoundsOptions(selected) {
    return {
      padding: selected ? 300 : 0,
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
