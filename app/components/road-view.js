import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';
import InViewportMixin from 'ember-in-viewport';

export default class RoadView extends Component.extend(InViewportMixin) {
  @argument
  lat

  @argument
  lon

  inView = false

  didEnterViewport() {
    this.set('inView', true);
  }
}
