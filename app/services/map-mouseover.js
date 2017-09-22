import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { get } = Ember;
const { service } = Ember.inject;

export default Ember.Service.extend({
  registeredLayers: service(),

  currentEvent: null,

  tooltipTemplate: '',

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
    this.set('currentEvent', e);

    // of all registered layers, we only want to query the ones
    // that exist on the map AND are highlightable

    const layers = this.get('registeredLayers.highlightableAndVisibleLayerIds');
    const features = map.queryRenderedFeatures(e.point, { layers });


    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer';


      const thisFeature = features[0];
      const prevFeature = this.get('highlightedLotFeatures')[0];
      if (!prevFeature || thisFeature.id !== prevFeature.id) this.set('highlightedLotFeatures', [thisFeature]);


      this.set('tooltipTemplate', this.get('registeredLayers').getTooltipTemplate(thisFeature.layer.id));
    } else {
      map.getCanvas().style.cursor = '';

      this.set('highlightedLotFeatures', []);
    }
  },
});
