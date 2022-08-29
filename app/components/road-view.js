import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import { computed } from '@ember/object';
import gtag from 'labs-zola/utils/gtag';

export default class RoadView extends Component.extend(InViewportMixin) {
  lat;

  lon;

  inView = false;

  @computed('lon', 'lat')
  get url() {
    return `https://roadview.planninglabs.nyc/view/${this.lon}/${this.lat}`;
  }

  onClick() {
    gtag('event', 'external_link', {
      event_category: 'External Link',
      event_action: 'Clicked Cyclomedia Street View Link',
    });
  }
}
