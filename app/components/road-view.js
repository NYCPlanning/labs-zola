import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import { computed } from '@ember/object';

export default class RoadView extends Component.extend(InViewportMixin) {
  lat;

  lon;

  inView = false;

  @computed('lon', 'lat')
  get url() {
    return `https://roadview.planninglabs.nyc/view/${this.lon}/${this.lat}`;
  }
}
