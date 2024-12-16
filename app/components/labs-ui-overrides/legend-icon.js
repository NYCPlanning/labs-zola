import Component from '@glimmer/component';

export default class LegendIconComponent extends Component {
  get iconType() {
    const type = this.args.iconType;
    return type === 'fa-icon' ? 'fa-layers' : type;
  }
}
