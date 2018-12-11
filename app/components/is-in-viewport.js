import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default class IsInViewportComponent extends Component.extend(InViewportMixin) {
  inView;

  didEnterViewport() {
    this.set('inView', true);
  }
}
