import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';
import { inject as service } from '@ember/service';
import gtag from 'labs-zola/utils/gtag';

export default class IsInViewportComponent extends Component.extend(InViewportMixin) {
  inView;

  @service
  metrics;

  didEnterViewport() {
    gtag('event', 'road_view', {
      event_category: 'Road View',
      event_action: 'Scrolled to bottom of a side panel',
    });
    // GA
    this.get('metrics').trackEvent('GoogleAnalytics', {
      eventCategory: 'Road View',
      eventAction: 'Scrolled to bottom of a side panel',
    });

    this.set('inView', true);
  }
}
