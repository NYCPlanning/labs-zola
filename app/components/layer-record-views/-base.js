import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LayerRecordBase extends Component {
  @service
  metrics;

  model = {};

  @action
  async captureOutboundLink(label) {
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'External Link',
      eventAction: 'Clicked External Link',
      eventLabel: `Clicked ${label} Link`,
    });
    console.log(`Clicked ${label} Link`);
  }
}
