import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';
import bblDemux from '../utils/bbl-demux';
import trackEvent from '../utils/track-event'; // eslint-disable-line


const DEBOUNCE_MS = 100;

export default Component.extend({
  classNames: ['search'],
  searchTerms: '',
  transitionTo: null,
  selected: 0,
  mainMap: service(),
  metrics: service(),
  focused: false,
  prevResults: null,
  loading: null,

  @computed('searchTerms')
  results(searchTerms) {
    return this.get('debouncedResults').perform(searchTerms);
  },

  debouncedResults: task(function* (searchTerms) {
    if (searchTerms.length < 3) this.cancel();
    yield timeout(DEBOUNCE_MS);
    const URL = `https://zola-search-api.planninglabs.nyc/search?q=${searchTerms}`;

    this.set('loading', new Promise(function(resolve) {
      setTimeout(resolve, 500);
    }));

    this.get('metrics').trackEvent(
      'GoogleAnalytics',
      {
        eventCategory: 'Search',
        eventAction: 'Received Results for Search Terms',
        eventLabel: searchTerms,
      },
    );

    return yield fetch(URL)
      .then(data => data.json())
      .then(json => json.map(
        (result, index) => {
          const newResult = result;
          newResult.id = index;
          newResult.demuxedBbl = bblDemux(result.bbl);
          return newResult;
        }))
      .then((resultList) => {
        if (isEmpty(resultList)) {
          this.get('metrics').trackEvent(
            'GoogleAnalytics',
            {
              eventCategory: 'Search',
              eventAction: 'No results found for search terms',
              eventLabel: searchTerms,
            },
          );
        }
        this.set('prevResults', resultList);

        this.set('loading', null);
        return resultList;
      });
  }).keepLatest(),

  @computed('results.value')
  resultsCount(results) {
    if (results) return results.length;
    return 0;
  },

  keyPress(event) {
    const selected = this.get('selected');
    const { keyCode } = event;

    // enter
    if (keyCode === 13) {
      const results = this.get('results.value');
      if (results && results.get('length')) {
        const selectedResult = results.objectAt(selected);
        this.send('goTo', selectedResult);
      }
    }
  },

  keyUp(event) {
    const selected = this.get('selected');
    const resultsCount = this.get('resultsCount');
    const { keyCode } = event;

    const incSelected = () => { this.set('selected', selected + 1); };
    const decSelected = () => { this.set('selected', selected - 1); };

    if ([38, 40, 27].includes(keyCode)) {
      const results = this.get('results.value');

      // up
      if (keyCode === 38) {
        if (results) {
          if (selected > 0) decSelected();
        }
      }

      // down
      if (keyCode === 40) {
        if (results) {
          if (selected < resultsCount - 1) incSelected();
        }
      }

      // down
      if (keyCode === 27) {
        this.set('searchTerms', '');
      }
    }
  },

  actions: {
    clear() {
      const mainMap = this.get('mainMap');
      this.set('searchTerms', '');
      // clear address marker
      mainMap.set('currentAddress', null);
    },

    @trackEvent('Map Search', 'Clicked result', 'searchTerms')
    goTo(result) {
      const mainMap = this.get('mainMap');
      const mapInstance = mainMap.get('mapInstance');
      const { type } = result;

      this.$('.map-search-input').blur();
      // clear address marker
      mainMap.set('currentAddress', null);

      this.setProperties({
        selected: 0,
        focused: false,
      });

      if (type === 'lot') {
        const { boro, block, lot } = bblDemux(result.bbl);
        this.set('searchTerms', result.label);
        this.transitionTo('lot', boro, block, lot);
      }

      if (type === 'zma') {
        this.set('searchTerms', result.label);
        this.transitionTo('zma', result.ulurpno);
      }

      if (type === 'zoning-district') {
        mainMap.set('shouldFitBounds', true);
        this.transitionTo('zoning-district', result.label);
      }

      if (type === 'neighborhood') {
        this.set('searchTerms', result.neighbourhood);
        const center = result.coordinates;
        mapInstance.flyTo({
          center,
          zoom: 13,
        });
      }

      if (type === 'address') {
        const center = result.coordinates;
        mainMap.set('currentAddress', center);

        this.set('searchTerms', result.label);
        this.saveAddress({ address: result.label, coordinates: result.coordinates });

        if (mapInstance) {
          mapInstance.flyTo({
            center,
            zoom: 15,
          });
          mapInstance.once('moveend', () => { this.transitionTo('index'); });
        }
      }

      if (type === 'special-purpose-district') {
        this.set('searchTerms', result.sdname);
        this.transitionTo('special-purpose-district', result.cartodb_id);
      }

      if (type === 'commercial-overlay') {
        this.set('searchTerms', result.label);
        this.transitionTo('commercial-overlay', result.overlay);
      }
    },

    @trackEvent('Search', 'Focused In', 'searchTerms')
    handleFocusIn() {
      this.set('focused', true);
    },

    @trackEvent('Search', 'Focused Out', 'searchTerms')
    handleFocusOut() {
      this.set('focused', false);
    },
  },
});
