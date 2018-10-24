import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import InViewportMixin from 'ember-in-viewport';

export default class IsInViewportComponent extends Component.extend(InViewportMixin) {
  @argument
  inView

  didEnterViewport() {
    console.log('is in view');
    this.set('inView', true);
  }
}
