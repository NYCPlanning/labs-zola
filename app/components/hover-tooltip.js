import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { htmlSafe } = Ember.String;

export default Ember.Component.extend({
  text: '',
  coordinates: {
    x: null,
    y: null,
  },

  @computed('coordinates.x', 'coordinates.y')
  isReady(x, y) {
    return !!(x && y);
  },

  @computed('coordinates.x', 'coordinates.y')
  style(x, y) {
    return htmlSafe(`
      top: ${y}px; 
      left: ${x - 20}px;
    `);
  },
});
