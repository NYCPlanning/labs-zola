import Ember from 'ember';
import mapboxgl from 'mapbox-gl';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

import pluto from '../layer-groups/pluto';
import facilities from '../layer-groups/facilities';
import aerialRaster from '../layer-groups/aerial-raster';
import zoningDistricts from '../layer-groups/zoning-districts';
import commercialOverlays from '../layer-groups/commercial-overlays';
import zoningMapAmendments from '../layer-groups/zoning-map-amendments';

import highlightedLotLayer from '../layers/highlighted-lot';
import selectedLotLayer from '../layers/selected-lot';

const { later } = Ember.run;
const { service } = Ember.inject;

export default Ember.Component.extend({
  mainMap: service(),

  classNames: ['map-container'],

  lat: 40.7071266,
  lng: -74,
  zoom: 10.2,
  menuTo: 'layers-menu',

  pluto,
  facilities,
  aerialRaster,
  zoningDistricts,
  commercialOverlays,
  zoningMapAmendments,

  mapConfig: [
    pluto, facilities, aerialRaster, zoningDistricts,
  ],

  loading: true,

  debouncedDidResize(width) {
    this.set('width', width);
    this.updateChart();
  },

  @computed('mainMap.selected')
  fitBoundsOptions(selected) {
    const el = this.$();
    const height = el.height();
    const width = el.width();

    const padding = Math.min(height, width) / 2.5;
    return { padding: selected ? padding : 0 };
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
      later(() => {
        if (map) {
          map.setPaintProperty('building', 'fill-opacity', 0.4);
        }
      }, 1000);

      later(() => {
        if (map) {
          console.log(JSON.stringify(map.getStyle()));
        }
      }, 1000);
    },

    handleMouseover(e) {
      const map = e.target;

      const layers = ['pluto-fill', 'zma-fill'].filter(layer => map.getLayer(layer));

      const features = map.queryRenderedFeatures(e.point, { layers });

      if (features.length > 0) {
        const { bbl } = features[0].properties;

        map.getCanvas().style.cursor = 'pointer';

        const prevFeatures = this.get('highlightedLotFeatures');

        if (prevFeatures.length < 1 || prevFeatures[0].properties.bbl !== bbl) {
          this.set('highlightedLotFeatures', features);
        }
      } else {
        map.getCanvas().style.cursor = '';

        this.set('highlightedLotFeatures', []);
        this.set('mouseoverLocation', null);
      }
    },

    handleMouseleave() {
      this.set('highlightedLotFeatures', []);
      this.set('mouseoverLocation', null);
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
