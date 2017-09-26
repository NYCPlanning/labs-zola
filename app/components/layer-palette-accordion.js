import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Component.extend(ParentMixin, {
  classNames: ['layer-palette-accordion'],
  closed: true,

  didInsertElement() {
    this.set('numberVisible', Ember.computed('childComponents.@each.visible', function() {
      const childComponents = this.get('childComponents');
      return childComponents.filterBy('visible', true).length;
    }));
  },
});
