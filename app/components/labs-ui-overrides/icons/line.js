import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class LineComponent extends Component {
  height = 10;

  width = 17;

  viewBox = '0 0 17 10';

  preserveAspectRatio = 'xMinYMid';

  get options() {
    return this.args.options || { stroke: 'SteelBlue' };
  }

  @action
  addAttributes(pathElement) {
    Object.entries(this.options).forEach(([attr, value]) => {
      pathElement.setAttribute(attr, value);
    });
  }
}
