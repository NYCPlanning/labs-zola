import Component from '@ember/component';
import mapboxgl from 'mapbox-gl';

import { inject as service } from '@ember/service';
import EmberObject, { computed, action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';

import bblDemux from '../utils/bbl-demux';
import Geometric from '../mixins/geometric';
import drawnFeatureLayers from '../layers/drawn-feature';
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

@classNames('map-container')
export default class MainMap extends Component {
  @service
  mainMap;

  @service
  metrics;

  @service
  store;

  @service
  router;

  lat = 40.7125;

  @computed()
  get lng() {
    const boundsOptions = this.get('mainMap.isSelectedBoundsOptions');
    return boundsOptions.offset[0] === 0 ? -73.9022 : -73.733;
  }

  zoom = 9.72;

  menuTo = 'layers-menu';

  loading = true;

  findMeDismissed = false;

  sourcesLoaded = true;

  cartoSources = [];

  drawnFeatureLayers = drawnFeatureLayers;

  highlightedLayerId = null;

  @computed('layerGroupsObject')
  get mapConfig() {
    return this.layerGroups;
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
  handleMapLoad(map) {
    window.map = map;
    const { mainMap } = this;
    mainMap.set('mapInstance', map);

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
      this.metrics.trackEvent(
        'GoogleAnalytics',
        { eventCategory: 'Map', eventAction: 'Geolocate' },
      );
    });

    map.addControl(navigationControl, 'top-left');
    map.addControl(new mapboxgl.ScaleControl({ unit: 'imperial' }), 'bottom-left');
    map.addControl(geoLocateControl, 'top-left');
    map.addControl(new MeasurementText(), 'top-left');

    // hide default base style layers
    const basemapLayersToHide = [
      'building',
      'highway_name_other',
      'highway_name_motorway',
    ];

    basemapLayersToHide.forEach(layer => map.removeLayer(layer));

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
          this.router.transitionTo('lot', boro, block, lot);
        }

        if (ulurpno) {
          this.router.transitionTo('zma', ulurpno, { queryParams: { search: false } });
        }

        if (zonedist) {
          this.router.transitionTo('zoning-district', zonedist, { queryParams: { search: false } });
        }

        if (sdlbl) {
          this.router.transitionTo('special-purpose-district', cartodb_id, { queryParams: { search: false } });
        }

        if (splbl) {
          this.router.transitionTo('special-purpose-subdistricts', cartodb_id, { queryParams: { search: false } });
        }

        if (overlay) {
          this.router.transitionTo('commercial-overlay', overlay, { queryParams: { search: false } });
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
