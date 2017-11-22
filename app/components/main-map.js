import Ember from 'ember';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import area from 'npm:@turf/area';
import lineDistance from 'npm:@turf/line-distance';

import sources from '../sources';
import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';

import drawnFeatureLayers from '../layers/drawn-feature';
import highlightedLotLayer from '../layers/highlighted-lot';
import selectedLayers from '../layers/selected-lot';

const selectedFillLayer = selectedLayers.fill;
const selectedLineLayer = selectedLayers.line;

const { alias } = Ember.computed;
const { service } = Ember.inject;

// Custom Control
const MeasurementText = function() { };

MeasurementText.prototype.onAdd = function(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.id = 'measurement-text';
  return this._container;
};

MeasurementText.prototype.onRemove = function () {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
};

const draw = new MapboxDraw({
  displayControlsDefault: false,
  styles: drawStyles,
});

export default Ember.Component.extend({
  mainMap: service(),
  mapMouseover: service(),
  metrics: service(),

  classNames: ['map-container'],

  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,
  menuTo: 'layers-menu',

  layerGroups,

  mapConfig: Object.keys(layerGroups).map(key => layerGroups[key]),

  loading: true,
  findMeDismissed: false,
  sourcesLoaded: true,
  currentMeasurement: null,
  measurementUnit: '',

  cartoSources: [],

  drawnFeatureLayers,

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

  actions: {
    adjustBuildingsLayer(visible) {
      const map = this.get('mainMap.mapInstance');
      if (visible) {
        map.flyTo({ pitch: 45 });
      } else {
        map.flyTo({ pitch: 0 });
      }
    },

    locateMe() {
      const geolocateButton = document.querySelectorAll('.mapboxgl-ctrl-geolocate')[0];

      if (geolocateButton) {
        geolocateButton.click();
        this.set('findMeDismissed', true);
      }
    },

    dismissFindMe() {
      this.set('findMeDismissed', true);
    },

    handleMapLoad(map) {
      window.map = map;
      const mainMap = this.get('mainMap');
      mainMap.set('mapInstance', map);

      // add carto sources
      this.get('cartoSources').forEach((sourceConfig) => {
        map.addSource(sourceConfig.id, sourceConfig);
      });

      // add raster sources
      Object.keys(sources)
        .filter(key => sources[key].type === 'raster')
        .forEach((key) => {
          const source = sources[key];
          map.addSource(source.id, source);
        });

      // setup controls
      const navigationControl = new mapboxgl.NavigationControl();
      const geoLocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      // GA
      geoLocateControl.on('trackuserlocationstart', () => {
        this.get('metrics').trackEvent(
          'GoogleAnalytics',
          { eventCategory: 'Map', eventAction: 'Geolocate' },
        );
      });

      map.addControl(navigationControl, 'top-left');
      map.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-left');
      map.addControl(geoLocateControl, 'top-left');
      map.addControl(new MeasurementText(), 'top-left');

      // get rid of default building layer
      map.removeLayer('building');

      map.addSource('ee', {
        type: 'image',
        url: '/img/ht.png',
        coordinates: [
          [-74.0030685, 40.7335205],
          [-74.0030515, 40.7335205],
          [-74.0030515, 40.7335085],
          [-74.0030685, 40.7335085],
        ],
      });

      map.addLayer({
        id: 'ee',
        source: 'ee',
        type: 'raster',
        minzoom: 17,
      });
    },

    handleMousemove(e) {
      const mapMouseover = this.get('mapMouseover');
      if (!this.get('mainMap').isDrawing) mapMouseover.highlighter(e);
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

    startDraw(type) {
      this.get('mainMap').mapInstance.addControl(draw);
      draw.changeMode(type === 'line' ? 'draw_line_string' : 'draw_polygon');
      this.get('mainMap').set('isDrawing', true);
      this.set('mainMap.drawnFeature', null);
      this.set('currentMeasurement', null);
    },

    clearDraw() {
      this.get('mainMap').set('isDrawing', false);
      this.set('mainMap.drawnFeature', null);
      this.set('currentMeasurement', null);
    },

    handleDrawCreate(e) {
      this.set('mainMap.drawnFeature', e.features[0].geometry);
      setTimeout(() => {
        this.get('mainMap').mapInstance.removeControl(draw);
        this.get('mainMap').set('isDrawing', false);
      }, 100);
    },

    handleMeasurement(e) {
      let current = draw.getAll();
      const { features } = current;
      const conversion = 0.3048;

      if (e.type === 'draw.delete') {
        this.set('currentMeasurement', null);
        draw.deleteAll();
      } else {
        if (features.length > 1) {
          draw.delete(features[0].id);
          current = draw.getAll();
        }

        const areaCalculation = area(current) / conversion;
        const distanceCalculation = (lineDistance(current) * 1000) / conversion;
        const measurement = areaCalculation || distanceCalculation;
        this.set('currentMeasurement', measurement);
        this.set('measurementUnit', areaCalculation ? 'sq ft' : 'ft');
      }
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
