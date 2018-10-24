import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import InViewportMixin from 'ember-in-viewport';

export default class IsInViewportComponent extends Component.extend(InViewportMixin) {
  @argument
  inView

  didEnterViewport() {
    this.set('inView', true);
  }
}
