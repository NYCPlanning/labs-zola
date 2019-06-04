import Component from '@ember/component';
import { computed } from '@ember/object';
import mustache from 'mustache';

export default class TooltipRenderer extends Component {
  @computed('feature', 'template')
  get renderedText() {
    const properties = this.get('feature.properties');
    const template = this.get('template');

    return mustache.render(template, properties);
  }

  feature = {};

  template = '';
}
