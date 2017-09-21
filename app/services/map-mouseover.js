import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Service.extend({
  mousePosition: {
    x: null,
    y: null,
  },

  @computed('mousePosition.x', 'mousePosition.y')
  hasMousePosition(x, y) {
    return !!(x && y);
  },

  tooltipText: '',

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
