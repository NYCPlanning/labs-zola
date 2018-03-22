import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import mustache from 'npm:mustache';


const offsetX = 30;
const offsetY = 10;

export default Component.extend({
  mapMouseover: service(),
  mousePosition: alias('mapMouseover.mousePosition'),

  @computed('mapMouseover.highlightedLotFeatures', 'mapMouseover.tooltipTemplate', 'mousePosition.x', 'mousePosition.y')
  text(highlightedFeatures, source) {
    const { properties } = highlightedFeatures[0];
    return mustache.render(source, properties);
  },

  @computed('mapMouseover.highlightedLotFeatures', 'mousePosition.x', 'mousePosition.y')
  visible(highlightedFeatures) {
    return highlightedFeatures.length > 0;
  },

  @computed('mousePosition.x', 'mousePosition.y')
  isReady(x, y) {
    return !!(x && y);
  },

  @computed('mousePosition.x', 'mousePosition.y')
  style(x, y) {
    return htmlSafe(`
      top: ${y + offsetY}px;
      left: ${x + offsetX}px;
    `);
  },
});
