import Ember from 'ember';
import mapboxgl from 'mapbox-gl';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';

import carto from '../utils/carto2';
import layerGroups from '../layer-groups';

import highlightedLotLayer from '../layers/highlighted-lot';
import selectedLayers from '../layers/selected-lot';
import sources from '../sources';

const selectedFillLayer = selectedLayers.fill;
const selectedLineLayer = selectedLayers.line;

const { alias } = Ember.computed;
const { later } = Ember.run;
const { service } = Ember.inject;

export default Ember.Component.extend({
  mainMap: service(),
  mapMouseover: service(),

  classNames: ['map-container'],

  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,
  menuTo: 'layers-menu',

  layerGroups,

  mapConfig: Object.keys(layerGroups).map(key => layerGroups[key]),

  loading: true,
  sourcesLoaded: false,

  @computed('mainMap.selected')
  isSelectedBoundsOptions(selected) {
    if (selected) {
      const type = selected.constructor.modelName;
      const el = this.$();
      const height = el.height();
      const width = el.width();

      const fullWidth = window.innerWidth;
      // width of content area on large screens is 5/12 of full
      const contentWidth = (fullWidth / 12) * 5;
      // on small screens, no offset
      const offset = fullWidth < 1024 ? 0 : -((width - contentWidth) / 2);
      const padding = Math.min(height, (width - contentWidth)) / 2.5;
      return {
        padding: selected && (type !== 'zoning-district') ? padding : 0,
        offset: [offset, 0],
      };
    }
    return null;
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

  shouldFitBounds: alias('mainMap.shouldFitBounds'),

  @computed('mainMap.selected')
  selectedLotSource(selected) {
    return {
      type: 'geojson',
      data: selected.get('geometry'),
    };
  },

  selectedFillLayer,
  selectedLineLayer,

  configWithTemplate(config) {
    return this.get('templateTask').perform(config);
  },

  templateTask: task(function* (config) {
    const { minzoom = 0 } = config;
    return yield carto.getVectorTileTemplate(config['source-layers'])
      .then(template => ({
        id: config.id,
        type: 'vector',
        tiles: [template],
        minzoom,
      }));
  }).restartable(),

  actions: {
    handleMapLoad(map) {
      window.map = map;
      const mainMap = this.get('mainMap');
      mainMap.set('mapInstance', map);

      const geoLocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      geoLocateControl.on('geolocate', () => {
        this.sendAction('transitionTo', '/');
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      map.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-left');
      map.addControl(geoLocateControl, 'top-left');


      // add sources
      const sourcePromises = Object.keys(sources).map((key) => {
        const source = sources[key];
        if (source.type === 'cartovector') {
          return this.configWithTemplate(source)
            .then((sourceConfig) => {
              map.addSource(sourceConfig.id, sourceConfig);
            });
        }

        // handle non-carto sources here
      });

      Promise.all(sourcePromises)
        .then(() => {
          this.set('sourcesLoaded', true);
        });

      map.moveLayer('building');
      later(() => {
        if (map) {
          map.setPaintProperty('building', 'fill-opacity', 0.4);
        }
      }, 1000);
    },

    handleMouseover(e) {
      const mapMouseover = this.get('mapMouseover');
      mapMouseover.highlighter(e);
    },

    handleMouseleave() {
      const mapMouseover = this.get('mapMouseover');
      mapMouseover.set('highlightedLotFeatures', []);
      mapMouseover.set('currentEvent', null);
    },

    handleZoomend(event) {
      const mainMap = this.get('mainMap');
      mainMap.set('currentZoom', event.target.getZoom());
    },

    mapLoading(data) {
      const localConfig = this.get('mapConfig');
      const sourceIds = localConfig.mapBy('id');
      const localSource = localConfig.findBy('id', data.sourceId);

      if (localSource) {
        if (data.dataType === 'source' &&
            data.isSourceLoaded &&
            sourceIds.includes(data.sourceId)) {
          this.set('loading', false);
        } else {
          this.set('loading', true);
        }
      }
    },
  },
});
