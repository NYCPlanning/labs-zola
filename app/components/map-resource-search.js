import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import bblDemux from '../utils/bbl-demux';

export default class MapResourceSearchComponent extends Component {
  @service
  router;

  @service
  mainMap;

  @service
  metrics;

  @action
  handleLookupSuccess(center, zoom, bbl) {
    // if onSuccess from labs-bbl-lookup includes bbl, transition to lot route for that bbl
    // otherwise flyTo the block
    if (bbl) {
      // GA
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Search',
        eventAction: 'Used BBL Lookup',
      });

      const { boro, block, lot } = bblDemux(bbl);
      this.router.transitionTo('map-feature.lot', boro, block, lot);
    } else {
      this.get('mainMap.mapInstance').flyTo({ center, zoom });
    }
  }

  @action
  handleSearchSelect(result) {
    const { mainMap } = this;
    const mapInstance = mainMap.get('mapInstance');
    const { type } = result;

    this.setProperties({
      selected: 0,
      focused: false,
    });

    if (type === 'lot') {
      // GA
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Search',
        eventAction: 'Searched by Address',
      });

      const { boro, block, lot } = bblDemux(result.bbl);
      this.set('searchTerms', result.label);

      this.router.transitionTo('map-feature.lot', boro, block, lot, { queryParams: { search: true } });
    }

    if (type === 'zma') {
      this.set('searchTerms', result.label);
      this.router.transitionTo('map-feature.zoning-map-amendment', result.ulurpno, { queryParams: { search: true } });
    }

    if (type === 'zoning-district') {
      // GA
      this.get('metrics').trackEvent('GoogleAnalytics', {
        eventCategory: 'Search',
        eventAction: 'Searched by Zoning District',
      });

      this.set('searchTerms', result.label);
      this.router.transitionTo('map-feature.zoning-district', result.label, { queryParams: { search: true } });
    }

    if (type === 'neighborhood') {
      this.set('searchTerms', result.neighbourhood);
      const center = result.coordinates;
      mapInstance.flyTo({
        center,
        zoom: 13,
      });
    }

    if (type === 'special-purpose-district') {
      this.set('searchTerms', result.sdname);
      this.router.transitionTo('map-feature.special-purpose-district', result.cartodb_id, { queryParams: { search: true } });
    }

    if (type === 'commercial-overlay') {
      this.set('searchTerms', result.label);
      this.router.transitionTo('map-feature.commercial-overlay', result.label, { queryParams: { search: true } });
    }
  }
}
