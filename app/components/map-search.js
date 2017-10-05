import Ember from 'ember';
import fetch from 'fetch';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';
import bblDemux from '../utils/bbl-demux';

const { service } = Ember.inject;

const DEBOUNCE_MS = 100;

export default Ember.Component.extend({
  classNames: ['search'],
  searchTerms: '',
  transitionTo: null,
  selected: 0,
  mainMap: service(),
  focused: false,

  @computed('searchTerms')
  results(searchTerms) {
    return this.get('debouncedResults').perform(searchTerms);
  },

  debouncedResults: task(function* (searchTerms) {
    if (searchTerms.length < 3) this.cancel();
    yield timeout(DEBOUNCE_MS);
    const URL = `https://zola-search-api.planninglabs.nyc/search?q=${searchTerms}`;
    return yield fetch(URL)
      .then(data => data.json())
      .then(json => json.map(
        (result, index) => {
          const newResult = result;
          newResult.id = index;
          return result;
        }));
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
      if (results) {
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
      this.set('searchTerms', '');
    },
    goTo(result) {
      const mainMap = this.get('mainMap');
      const mapInstance = mainMap.get('mapInstance');

      this.$('.map-search-input').blur();

      this.setProperties({
        selected: 0,
        focused: false,
      });

      if (result.type === 'lot') {
        const { boro, block, lot } = bblDemux(result.bbl);
        this.transitionTo('lot', boro, block, lot);
      }

      if (result.type === 'zma') {
        this.transitionTo('zma', result.ulurpno);
      }

      if (result.type === 'zoning-district') {
        mainMap.set('shouldFitBounds', true);
        this.transitionTo('zoning-district', result.label);
      }

      if (result.type === 'neighborhood') {
        const center = result.coordinates;
        mapInstance.flyTo({
          center,
          zoom: 13,
        });
      }

      if (result.type === 'address') {
        const center = result.coordinates;
        mainMap.set('currentAddress', center);
        this.saveAddress({ address: result.label, coordinates: result.coordinates });
        this.transitionTo('index');

        if (mapInstance) {
          mapInstance.flyTo({
            center,
            zoom: 15,
          });
        }
      }
    },
    handleFocusIn() {
      this.set('focused', true);
    },
    handleFocusOut() {
      this.set('focused', false);
    },
  },
});
