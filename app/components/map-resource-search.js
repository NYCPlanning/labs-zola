import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import bblDemux from '../utils/bbl-demux';

export default class MapResourceSearchComponent extends Component {
  @service
  router;

  @service
  mainMap;

  @action
  handleLookupSuccess(center, zoom, bbl) {
    // if onSuccess from labs-bbl-lookup includes bbl, transition to lot route for that bbl
    // otherwise flyTo the block
    if (bbl) {
      const { boro, block, lot } = bblDemux(bbl);
      this.router.transitionTo('lot', boro, block, lot);
    } else {
      this.get('mainMap.mapInstance').flyTo({ center, zoom });
    }
  }

  @action
  handleSearchSelect(result) {
    const { mainMap } = this;
    const mapInstance = mainMap.get('mapInstance');
    const { type } = result;

    mainMap.set('currentAddress', null);

    this.setProperties({
      selected: 0,
      focused: false,
    });

    if (type === 'lot') {
      const { boro, block, lot } = bblDemux(result.bbl);
      this.set('searchTerms', result.label);

      this.router.transitionTo('lot', boro, block, lot);
    }

    if (type === 'zma') {
      this.set('searchTerms', result.label);
      this.router.transitionTo('zma', result.ulurpno, { queryParams: { search: true } });
    }

    if (type === 'zoning-district') {
      this.set('searchTerms', result.label);
      this.router.transitionTo('zoning-district', result.label, { queryParams: { search: true } });
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
      this.router.transitionTo('special-purpose-district', result.cartodb_id, { queryParams: { search: true } });
    }

    if (type === 'commercial-overlay') {
      this.set('searchTerms', result.label);
      this.router.transitionTo('commercial-overlay', result.label, { queryParams: { search: true } });
    }
  }
}
