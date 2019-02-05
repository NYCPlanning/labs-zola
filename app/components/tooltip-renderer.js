import Component from '@ember/component';
import { defineProperty, computed as computedProperty } from '@ember/object';
import Ember from 'ember';

export default class TooltipRenderer extends Component {
  init(...args) {
    super.init(...args);

    this.setProperties(this.get('feature.properties'));

    defineProperty(this, 'layout', computedProperty(() => {
      const template = this.get('template');

      return Ember.HTMLBars.compile(template);
    }));
  }

  feature = {};

  template = '';
}
