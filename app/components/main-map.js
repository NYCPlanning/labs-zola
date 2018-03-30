import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from 'mapbox-gl-draw';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import area from 'npm:@turf/area';
import lineDistance from 'npm:@turf/line-distance';
import numeral from 'npm:numeral';

import sources from '../sources';
import layerGroups from '../layer-groups';
import drawStyles from '../layers/draw-styles';

import drawnFeatureLayers from '../layers/drawn-feature';
import highlightedLotLayer from '../layers/highlighted-lot';
import selectedLayers from '../layers/selected-lot';

const selectedFillLayer = selectedLayers.fill;
const selectedLineLayer = selectedLayers.line;

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

export default Component.extend({

  mainMap: service(),
  mapMouseover: service(),
  metrics: service(),
  store: service(),

  classNames: ['map-container'],

  lat: 40.7125,
  @computed('mainMap.isSelectedBoundsOptions')
  lng(boundsOptions) {
    return boundsOptions.offset[0] === 0 ? -73.9022 : -73.733;
  },
  zoom: 9.72,
  menuTo: 'layers-menu',

  layerGroups,

  mapConfig: Object.keys(layerGroups).map(key => layerGroups[key]),

  loading: true,
  findMeDismissed: false,
  sourcesLoaded: true,
  measurementUnitType: 'standard',
  drawnMeasurements: null,
  measurementMenuOpen: false,
  drawToolsOpen: false,

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

  @computed('bookmarks.[]')
  bookmarkedLotsLayer(bookmarks) {
    const lotBookmarks = bookmarks.getEach('bookmark.bbl')
      .filter(d => d); // filter out bookmarks with undefined bbl

    const filter = ['match', ['get', 'bbl'], lotBookmarks, true, false];

    const layer = {
      id: 'bookmarked-lots',
      type: 'line',
      source: 'pluto',
      'source-layer': 'pluto',
      layout: {
        'line-cap': 'round',
      },
      paint: {
        'line-opacity': 0.8,
        'line-color': 'rgba(0, 25, 160, 1)',
        'line-width': {
          stops: [
            [
              13,
              1.5,
            ],
            [
              15,
              8,
            ],
          ],
        },
      },
      filter,
    };

    return lotBookmarks.length > 0 ? layer : null;
  },

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
      if (!this.get('mainMap').drawMode) mapMouseover.highlighter(e);
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
      const drawMode = type === 'line' ? 'draw_line_string' : 'draw_polygon';
      const mainMap = this.get('mainMap');
      if (mainMap.get('drawMode')) {
        draw.deleteAll();
      } else {
        mainMap.mapInstance.addControl(draw);
        this.set('mainMap.drawnFeature', null);
        this.set('drawnMeasurements', null);
      }
      mainMap.set('drawMode', drawMode);
      draw.changeMode(drawMode);
    },

    clearDraw() {
      const mainMap = this.get('mainMap');
      if (mainMap.get('drawMode')) {
        mainMap.mapInstance.removeControl(draw);
      }

      mainMap.set('drawMode', null);
      this.set('mainMap.drawnFeature', null);
      this.set('drawnMeasurements', null);
    },

    handleDrawCreate(e) {
      this.set('mainMap.drawnFeature', e.features[0].geometry);
      setTimeout(() => {
        this.get('mainMap').mapInstance.removeControl(draw);
        this.get('mainMap').set('drawMode', null);
      }, 100);
    },

    handleMeasurement() {
      // should log both metric and standard display strings for the current drawn feature
      const features = draw.getAll().features;

      if (features.length > 0) {
        const feature = features[0];
        // metric calculation
        const drawnLength = (lineDistance(feature) * 1000); // meters
        const drawnArea = area(feature); // square meters

        let metricUnits = 'm';
        let metricFormat = '0,0';
        let metricMeasurement;

        let standardUnits = 'feet';
        let standardFormat = '0,0';
        let standardMeasurement;

        if (drawnLength > drawnArea) { // user is drawing a line
          metricMeasurement = drawnLength;
          if (drawnLength >= 1000) { // if over 1000 meters, upgrade metric
            metricMeasurement = drawnLength / 1000;
            metricUnits = 'km';
            metricFormat = '0.00';
          }

          standardMeasurement = drawnLength * 3.28084;
          if (standardMeasurement >= 5280) { // if over 5280 feet, upgrade standard
            standardMeasurement /= 5280;
            standardUnits = 'mi';
            standardFormat = '0.00';
          }
        } else { // user is drawing a polygon
          metricUnits = 'm²';
          metricFormat = '0,0';
          metricMeasurement = drawnArea;

          standardUnits = 'ft²';
          standardFormat = '0,0';
          standardMeasurement = drawnArea * 10.7639;

          if (drawnArea >= 1000000) { // if over 1,000,000 meters, upgrade metric
            metricMeasurement = drawnArea / 1000000;
            metricUnits = 'km²';
            metricFormat = '0.00';
          }

          if (standardMeasurement >= 27878400) { // if over 27878400 sf, upgrade standard
            standardMeasurement /= 27878400;
            standardUnits = 'mi²';
            standardFormat = '0.00';
          }
        }

        const drawnMeasurements = {
          metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
          standard: `${numeral(standardMeasurement).format(standardFormat)} ${standardUnits}`,
        };

        this.set('drawnMeasurements', drawnMeasurements);
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

    handleUnitsToggle(type) {
      this.set('measurementUnitType', type);
    },
  },
});
