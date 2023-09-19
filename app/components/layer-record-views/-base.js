import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LayerRecordBase extends Component {
  @service
  metrics;

  model = {};

  @action
  async captureOutboundLink(label) {
    gtag('event', 'external_link', {
      event_category: 'External Link',
      event_action: `Clicked ${label} Link`,
    });
    // GA
    this.get('metrics').trackEvent('MatomoTagManager', {
      category: 'External Link',
      action: 'Clicked External Link',
      name: `Clicked ${label} Link`,
    });
  }
}
