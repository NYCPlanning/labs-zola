import Component from '@ember/component';
import mapboxgl from 'mapbox-gl';

import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { alias } from '@ember/object/computed';
import config from 'labs-zola/config/environment';

import bblDemux from '../utils/bbl-demux';
import drawnFeatureLayers from '../layers/drawn-feature';
import selectedLayers from '../layers/selected-lot';
import comparisonSelectedLayers from '../layers/comparison-selected-lot';

const selectedFillLayer = selectedLayers.fill;
const selectedLineLayer = selectedLayers.line;

const comparisonSelectedFillLayer = comparisonSelectedLayers.fill;
const comparisonSelectedLineLayer = comparisonSelectedLayers.line;

// Custom Control
const MeasurementText = function () {};

MeasurementText.prototype.onAdd = function (map) {
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
  @service mainMap;

  @service metrics;

  @service store;

  @service router;

  @service('print') printSvc;

  @tracked
  showZFALayer = config.featureFlagShowZFALayer;

  menuTo = 'layers-menu';

  loading = true;

  findMeDismissed = false;

  sourcesLoaded = true;

  cartoSources = [];

  drawnFeatureLayers = drawnFeatureLayers;

  highlightedLayerId = null;

  windowResize() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
        resolve();
      }, 300);
    });
  }

  @computed('layerGroups', 'layerGroupsObject')
  get mapConfig() {
    return this.layerGroups;
  }

  @computed('bookmarks.[]')
  get bookmarkedLotsLayer() {
    const bookmarks = this.get('bookmarks.[]');
    const lotBookmarks = bookmarks
      .getEach('bookmark.properties.bbl')
      .filter((d) => d); // filter out bookmarks with undefined bbl

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
            [13, 1.5],
            [15, 8],
          ],
        },
      },
      filter,
    };

    return lotBookmarks.length > 0 ? layer : null;
  }

  @alias('mainMap.shouldFitBounds') shouldFitBounds;

  @computed('mainMap.selected')
  get selectedLotSource() {
    const selected = this.get('mainMap.selected');
    return {
      type: 'geojson',
      data: selected.get('geometry'),
    };
  }

  @computed('mainMap.comparisonSelected')
  get comparisonSelectedLotSource() {
    const comparisonSelected = this.get('mainMap.comparisonSelected');
    return {
      type: 'geojson',
      data: comparisonSelected.get('geometry'),
    };
  }

  @computed('mainMap.drawMode')
  get interactivity() {
    const drawMode = this.get('mainMap.drawMode');
    return !drawMode;
  }

  selectedFillLayer = selectedFillLayer;

  selectedLineLayer = selectedLineLayer;

  comparisonSelectedFillLayer = comparisonSelectedFillLayer;

  comparisonSelectedLineLayer = comparisonSelectedLineLayer;

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
      this.metrics.trackEvent('MatomoTagManager', {
        category: 'Map',
        action: 'Geolocate',
        name: 'Geolocate',
      });
    });

    map.addControl(navigationControl, 'top-left');
    map.addControl(
      new mapboxgl.ScaleControl({ unit: 'imperial' }),
      'bottom-left'
    );
    map.addControl(geoLocateControl, 'top-left');
    map.addControl(new MeasurementText(), 'top-left');

    // hide default base style layers
    const basemapLayersToHide = [
      'building',
      'highway_name_other',
      'highway_name_motorway',
    ];

    basemapLayersToHide.forEach((layer) => map.removeLayer(layer));

    map.on('zoom', function () {
      mainMap.set('zoom', map.getZoom());
    });
  }

  @action
  mapLoading(data) {
    const localConfig = this.mapConfig;
    const sourceIds = localConfig.mapBy('id');
    const localSource = localConfig.findBy('id', data.sourceId);

    if (localSource) {
      if (
        data.dataType === 'source' &&
        data.isSourceLoaded &&
        sourceIds.includes(data.sourceId)
      ) {
        this.set('loading', false);
      } else {
        this.set('loading', true);
      }
    }
  }

  @action
  handleLayerClick(feature) {
    const { highlightedLayerId } = this;
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
          id,
          cartodb_id, // eslint-disable-line
          ceqr_num, // eslint-disable-line
          zmi_id,
          zfa_id,
        } = properties;
        if (bbl && !ceqr_num) {
          // eslint-disable-line
          const { boro, block, lot } = bblDemux(bbl);
          if (this.router.currentRoute.name === 'map-feature.lot-comparison') {
            if (!this.mainMap.comparisonSelected) {
              this.mainMap.set('comparisonSelected', this.mainMap.selected);
            }
            this.router.transitionTo(
              'map-feature.lot-comparison',
              this.router.currentRoute.params.boro,
              this.router.currentRoute.params.block,
              this.router.currentRoute.params.lot,
              boro,
              block,
              lot
            );
          } else {
            this.router.transitionTo('map-feature.lot', boro, block, lot);
          }
        }

        if (ulurpno) {
          this.router.transitionTo(
            'map-feature.zoning-map-amendment',
            ulurpno,
            { queryParams: { search: false } }
          );
        }

        if (zonedist) {
          this.router.transitionTo('map-feature.zoning-district', zonedist, {
            queryParams: { search: false },
          });
        }

        if (sdlbl) {
          this.router.transitionTo(
            'map-feature.special-purpose-district',
            cartodb_id,
            { queryParams: { search: false } }
          );
        }

        if (splbl) {
          this.router.transitionTo(
            'map-feature.special-purpose-subdistrict',
            cartodb_id,
            { queryParams: { search: false } }
          );
        }

        if (overlay) {
          this.router.transitionTo('map-feature.commercial-overlay', overlay, {
            queryParams: { search: false },
          });
        }

        if (bbl && ceqr_num) {
          this.router.transitionTo('map-feature.e-designation', id, {
            queryParams: { search: false },
          });
        }

        if (zmi_id) {
          this.router.transitionTo('map-feature.zoning-map-index', zmi_id, {
            queryParams: { search: false },
          });
        }

        if (zfa_id && this.showZFALayer) {
          this.router.transitionTo(
            'map-feature.zoning-for-accessibility',
            zfa_id,
            {
              queryParams: { search: false },
            }
          );
        }
      }
    }
  }

  @action
  handleLayerHighlight(e, Layer) {
    this.set('highlightedLayerId', Layer.get('id'));
  }

  @action
  async enablePrintView() {
    gtag('event', 'print', {
      event_category: 'Print',
      event_action: 'Enabled print view',
    });

    this.set('printSvc.enabled', true);

    await this.windowResize();
  }
}
