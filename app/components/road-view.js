import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import InViewportMixin from 'ember-in-viewport';


export default class RoadView extends Component.extend(InViewportMixin) {
  @argument
  lat

  @argument
  lon

  inView = false

  @computed('inView')
  get src() {
    const { lat, lon, inView } = this;
    return inView ? `https://roadview.planninglabs.nyc/view/${lat}/${lon}` : '';
  }

  didEnterViewport() {
    this.set('inView', true);
  }
}
