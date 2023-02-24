import Component from '@ember/component';
import { computed } from '@ember/object';

export default class RoadView extends Component {
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
