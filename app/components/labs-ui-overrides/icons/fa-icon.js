import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class FaIconComponent extends Component {
  get options() {
    return this.args.options || {};
  }

  get spanStyle() {
    return htmlSafe(this.options.color ? `color: ${this.options.color}` : '');
  }
}
