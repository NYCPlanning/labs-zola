import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { ParentMixin, ChildMixin } from 'ember-composability-tools';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  registeredLayers: service(),
  mainMap: service(),
  visible: alias('layer.visible'),
  tagName: 'li',

  @computed('for', 'registeredLayers.layers.@each')
  layer(layerId, layers) {
    return layers.findBy('config.id', layerId);
  },

  @computed('layer.config.title')
  title(title) {
    return title;
  },

  @computed('layer.config.legendColor')
  legendColor(legendColor) {
    return legendColor;
  },

  @computed('layer.config.titleTooltip')
  titleTooltip(titleTooltip) {
    return titleTooltip;
  },

  @computed('layer.minzoom', 'layer.visible', 'mainMap.currentZoom')
  warning(minzoom, visible, currentZoom) {
    return (minzoom && visible && (currentZoom < minzoom));
  },

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, column, value) {
      const layer = this.get('layer');
      layer.send('updateSql', method, column, value);
    },
    updatePaintFor(id, paintObject) {
      const layer = this.get('layer');
      layer.send('updatePaintFor', id, paintObject);
    },
  },
});
