import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import { defineProperty, computed as computedProperty } from '@ember/object';
import Ember from 'ember';

export default class TooltipRenderer extends Component {
  init(...args) {
    super.init(...args);

    this.setProperties(this.get('feature.properties'));

    defineProperty(this, 'layout', computedProperty(() => {
      const template = this.get('template');
      const { properties } = this.get('feature');

      return Ember.HTMLBars.compile(template, properties);
    }));
  }

  @argument
  feature = {}

  @argument
  template = ''
}
