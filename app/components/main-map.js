import Component from '@ember/component';
// import mapboxgl from 'mapbox-gl';
import area from '@turf/area';
import lineDistance from '@turf/line-distance';
import numeral from 'numeral';
import EmberObject from '@ember/object';

import { service } from '@ember-decorators/service';
import { computed, action } from '@ember-decorators/object';
import { classNames } from '@ember-decorators/component';
import { alias } from '@ember-decorators/object/computed';

import drawStyles from '../layers/draw-styles';
import bblDemux from '../utils/bbl-demux';
import Geometric from '../mixins/geometric';
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

export default
@classNames('map-container')
class MainMap extends Component {
  @service
  mainMap;

  @service
  fastboot;

  @service
  mapMouseover;

  @service
  metrics;

  @service
  store;

  lat = 40.7125;

  @computed('mainMap.isSelectedBoundsOptions')
  get lng() {
    const boundsOptions = this.get('mainMap.isSelectedBoundsOptions');
    return boundsOptions.offset[0] === 0 ? -73.9022 : -73.733;
  }

  zoom = 9.72;

  menuTo = 'layers-menu';

  loading = true;

  findMeDismissed = false;

  sourcesLoaded = true;

  measurementUnitType = 'standard';

  drawnMeasurements = null;

  measurementMenuOpen = false;

  drawToolsOpen = false;

  cartoSources = [];

  drawnFeatureLayers = drawnFeatureLayers;

  highlightedLotFeatures = [];

  highlightedLayerId = null;

  highlightedLotLayer = highlightedLotLayer;

  draw = null;

  didStartDraw = false;

  drawDidRender = false;

  @computed('layerGroupsObject')
  get mapConfig() {
    const layerGroupsObject = this.get('layerGroupsObject');
    return Object.keys(layerGroupsObject).map(key => layerGroupsObject[key]);
  }

  @computed('highlightedLotFeatures')
  get highlightedLotSource() {
    const features = this.get('highlightedLotFeatures');
    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    };
  }

  @computed('bookmarks.[]')
  get bookmarkedLotsLayer() {
    const bookmarks = this.get('bookmarks.[]');
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
  }

  @alias('mainMap.shouldFitBounds')
  shouldFitBounds;

  @computed('mainMap.selected')
  get selectedLotSource() {
    const selected = this.get('mainMap.selected');
    return {
      type: 'geojson',
      data: selected.get('geometry'),
    };
  }

  @computed('mainMap.drawMode')
  get interactivity() {
    const drawMode = this.get('mainMap.drawMode');
    return !drawMode;
  }

  selectedFillLayer = selectedFillLayer;

  selectedLineLayer = selectedLineLayer;


  @action
  adjustBuildingsLayer(visible) {
    const map = this.get('mainMap.mapInstance');
    if (visible) {
      map.flyTo({ pitch: 45 });
    } else {
      map.flyTo({ pitch: 0 });
    }
  }

  @action
  locateMe() {
    const geolocateButton = document.querySelectorAll('.mapboxgl-ctrl-geolocate')[0];

    if (geolocateButton) {
      geolocateButton.click();
      this.set('findMeDismissed', true);
    }
  }

  @action
  dismissFindMe() {
    this.set('findMeDismissed', true);
  }

  @action
  handleMapLoad(map) {
    window.map = map;
    const { mainMap } = this;
    mainMap.set('mapInstance', map);

    // setup controls
    const navigationControl = new mapboxgl.NavigationControl(); // eslint-disable-line
    const geoLocateControl = new mapboxgl.GeolocateControl({ // eslint-disable-line
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    // GA
    geoLocateControl.on('trackuserlocationstart', () => {
      this.metrics.trackEvent(
        'GoogleAnalytics',
        { eventCategory: 'Map', eventAction: 'Geolocate' },
      );
    });

    map.addControl(navigationControl, 'top-left');
    map.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-left'); // eslint-disable-line
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
  }

  @action
  handleMousemove(e) {
    const { mapMouseover } = this;
    if (!this.mainMap.drawMode) mapMouseover.highlighter(e);
  }

  @action
  handleMouseleave() {
    const { mapMouseover } = this;
    mapMouseover.set('highlightedLotFeatures', []);
    mapMouseover.set('currentEvent', null);
  }

  @action
  handleZoomend(event) {
    const { mainMap } = this;
    mainMap.set('currentZoom', event.target.getZoom());
  }

  @action
  async startDraw(type) {
    this.set('didStartDraw', true);
    const draw = this.get('draw') || await import('mapbox-gl-draw')
      .then(({ default: MapboxDraw }) => new MapboxDraw({
        displayControlsDefault: false,
        styles: drawStyles,
      }));
    this.set('draw', draw);
    const drawMode = type === 'line' ? 'draw_line_string' : 'draw_polygon';
    const { mainMap } = this;
    if (mainMap.get('drawMode')) {
      draw.deleteAll();
    } else {
      mainMap.mapInstance.addControl(draw);
      this.set('mainMap.drawnFeature', null);
      this.set('drawnMeasurements', null);
    }
    mainMap.set('drawMode', drawMode);
    draw.changeMode(drawMode);
  }

  @action
  clearDraw() {
    const draw = this.get('draw');
    const { mainMap } = this;
    if (mainMap.get('drawMode')) {
      mainMap.mapInstance.removeControl(draw);
    }

    mainMap.set('drawMode', null);
    this.set('mainMap.drawnFeature', null);
    this.set('drawnMeasurements', null);
  }

  @action
  handleDrawCreate(e) {
    const draw = this.get('draw');
    this.set('mainMap.drawnFeature', e.features[0].geometry);
    setTimeout(() => {
      this.mainMap.mapInstance.removeControl(draw);
      this.mainMap.set('drawMode', null);
    }, 100);
  }

  @action
  handleMeasurement() {
    this.set('drawDidRender', true);
    const draw = this.get('draw');
    // should log both metric and standard display strings for the current drawn feature
    const { features } = draw.getAll();

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
  }

  @action
  mapLoading(data) {
    const localConfig = this.mapConfig;
    const sourceIds = localConfig.mapBy('id');
    const localSource = localConfig.findBy('id', data.sourceId);

    if (localSource) {
      if (
        data.dataType === 'source'
        && data.isSourceLoaded
        && sourceIds.includes(data.sourceId)
      ) {
        this.set('loading', false);
      } else {
        this.set('loading', true);
      }
    }
  }

  @action
  handleUnitsToggle(type) {
    this.set('measurementUnitType', type);
  }

  @action
  handlePrint() {
    const config = {
      mapConfig: {
        style: map.getStyle(), // eslint-disable-line
        center: map.getCenter(), // eslint-disable-line
        zoom: map.getZoom(), // eslint-disable-line
        bearing: map.getBearing(), // eslint-disable-line
        pitch: map.getPitch(), // eslint-disable-line
      },
      logo: 'https://raw.githubusercontent.com/NYCPlanning/logo/master/dcp_logo_772.png',
      title: 'ZoLa',
      subtitle: 'New York City’s Zoning & Land Use Map',
      content: 'This map was printed from Zoning & Land Use Application created by the NYC Department of City Planning. It is not an official record and all information displayed must be confirmed based on official records.',
      source: 'ZoLa | https://zola.planning.nyc.gov',
    };

    fetch('https://map-print.planninglabs.nyc/config', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 'success') {
          window.open('https://map-print.planninglabs.nyc', '_blank');
        }
      });
  }

  @action
  handleLayerClick(feature) {
    const { mainMap } = this;
    const highlightedLayerId = this.get('highlightedLayerId');

    if (feature) {
      const { properties } = feature;

      if (highlightedLayerId === feature.layer.id) {
        const {
          bbl,
          ulurpno,
          zonedist,
          sdlbl,
          splbl,
          overlay,
          cartodb_id, // eslint-disable-line
          ceqr_num, // eslint-disable-line
        } = properties;

        const featureFragment = EmberObject.extend(Geometric, {
          geometry: feature.geometry,
        }).create();

        mainMap.set('selected', featureFragment);

        if (bbl && !ceqr_num) { // eslint-disable-line
          const { boro, block, lot } = bblDemux(bbl);
          this.transitionTo('lot', boro, block, lot);
        }

        if (ulurpno) {
          this.transitionTo('zma', ulurpno);
        }

        if (zonedist) {
          mainMap.set('shouldFitBounds', false);
          this.transitionTo('zoning-district', zonedist);
        }

        if (sdlbl) {
          this.transitionTo('special-purpose-district', cartodb_id);
        }

        if (splbl) {
          this.transitionTo('special-purpose-subdistricts', cartodb_id);
        }

        if (overlay) {
          mainMap.set('shouldFitBounds', false);
          this.transitionTo('commercial-overlay', overlay);
        }

        if (ceqr_num) { // eslint-disable-line
          window.open(`https://zap-api.planninglabs.nyc/ceqr/${ceqr_num}`, '_blank'); // eslint-disable-line
        }
      }
    }
  }

  @action
  handleLayerHighlight(e, Layer) {
    this.set('highlightedLayerId', Layer.get('id'));
  }
}
