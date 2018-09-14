import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import mustache from 'mustache';

export default class TooltipRenderer extends Component {
  @computed('feature', 'template')
  get renderedText() {
    const properties = this.get('feature.properties');
    const template = this.get('template');

    return mustache.render(template, properties);
  }

  @argument
  feature = {}

  @argument
  template = ''
}
