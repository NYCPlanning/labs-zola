import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { htmlSafe } = Ember.String;
const { service } = Ember.inject;
const { alias } = Ember.computed;

export default Ember.Component.extend({
  mapMouseover: service(),
  feature: alias('mapMouseover.hoveredFeature'),
  layer: alias('feature.layer.id'),
  mousePosition: alias('mapMouseover.mousePosition'),

  text: '',
  offset: -20,

  @computed('mousePosition.x', 'mousePosition.y')
  isReady(x, y) {
    return !!(x && y);
  },

  @computed('mousePosition.x', 'mousePosition.y', 'offset')
  style(x, y, offset) {
    return htmlSafe(`
      top: ${y}px; 
      left: ${x + offset}px;
    `);
  },
});
