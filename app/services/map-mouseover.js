import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { get } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({
  registeredLayers: service(),

  currentEvent: null,

  @computed('currentEvent')
  mousePosition(event) {
    if (event) {
      const { point: { x, y } } = event;

      return {
        x,
        y,
      };
    }

    return null;
  },

  @computed('mousePosition.x', 'mousePosition.y')
  hasMousePosition(x, y) {
    return !!(x && y);
  },

  @computed('registeredLayers.visibleLayerIds.@each', 'currentEvent', 'mousePosition')
  hoveredFeature(layers, currentEvent) {
    if (currentEvent) {
      const map = currentEvent.target;

      return map
        .queryRenderedFeatures(
          currentEvent.point,
          { layers },
        )
        .objectAt(0) || {};
    }
    return {};
  },

  @computed('hoveredFeature')
  tooltipText(feature) {
    return get(feature, 'properties.bbl');
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

  highlighter(e) {
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
});
