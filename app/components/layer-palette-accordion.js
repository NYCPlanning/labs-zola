import { computed } from '@ember/object';
import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Component.extend(ParentMixin, {
  classNames: ['layer-palette-accordion'],
  closed: true,
  title: '',

  didInsertElement() {
    this.set('numberVisible', computed('childComponents.@each.visible', function() {
      const childComponents = this.get('childComponents');
      return childComponents.filterBy('visible', true).length;
    }));
  },

  actions: {
    @trackEvent('Toggle Accordion', 'title', 'closed')
    toggleClosed() {
      this.toggleProperty('closed');
    },
  },
});
