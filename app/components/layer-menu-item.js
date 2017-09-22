import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { ParentMixin } from 'ember-composability-tools';

const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend(ParentMixin, {
  registeredLayers: service(),
  classNames: ['layer-menu-item'],
  visible: alias('layer.visible'),
  tagName: '',

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
  },
});
