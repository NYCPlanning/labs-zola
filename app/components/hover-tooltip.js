import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { htmlSafe } = Ember.String;

export default Ember.Component.extend({
  text: '',
  coordinates: {
    x: null,
    y: null,
  },
  offset: -20,

  @computed('coordinates.x', 'coordinates.y')
  isReady(x, y) {
    return !!(x && y);
  },

  @computed('coordinates.x', 'coordinates.y', 'offset')
  style(x, y, offset) {
    return htmlSafe(`
      top: ${y}px; 
      left: ${x + offset}px;
    `);
  },
});
