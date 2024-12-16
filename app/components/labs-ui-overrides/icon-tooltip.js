import Component from '@glimmer/component';

export default class IconTooltipComponent extends Component {
  get icon() {
    return this.args.icon || 'info-circle';
  }

  get fixedWidth() {
    return this.args.fixedWidth || false;
  }

  get side() {
    return this.args.side || 'top';
  }
}
