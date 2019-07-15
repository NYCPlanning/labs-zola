import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import { inject as service } from '@ember/service';

export default class IsInViewportComponent extends Component.extend(InViewportMixin) {
  inView;

  @service
  metrics;

  didEnterViewport() {
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Road View',
      eventAction: 'Scrolled Down to Cyclomedia Viewport',
    });

    this.set('inView', true);
  }
}
