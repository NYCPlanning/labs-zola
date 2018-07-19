import { computed } from '@ember/object';
import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { inject as service } from '@ember/service';
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Component.extend(ParentMixin, {
  init(...args) {
    this._super(...args);

    this.set('menuItems', []);
  },
  metrics: service(),
  classNames: ['layer-palette-accordion'],
  closed: true,
  title: '',
  registeredLayers: service(),
  numberVisible: computed('menuItems.@each.visible', function() {
    const { length } = this.childComponents.filterBy('visible', true);
    return length;
  }),

  actions: {
    @trackEvent('Toggle Accordion', 'title', 'closed')
    toggleClosed() {
      this.toggleProperty('closed');
    },
  },
});
