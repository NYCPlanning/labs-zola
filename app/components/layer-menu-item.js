import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { ParentMixin } from 'ember-composability-tools';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend(ParentMixin, {
  registeredLayers: service(),
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

  actions: {
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, column, value) {
      const layer = this.get('layer');
      layer.send('updateSql', method, column, value);
    },
  },
});
