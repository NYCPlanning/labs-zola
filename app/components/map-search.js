import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';
import bblDemux from '../utils/bbl-demux';

const { service } = Ember.inject;

const DEBOUNCE_MS = 50;

export default Ember.Component.extend({
  classNames: ['search'],
  searchTerms: '',
  transitionTo: null,
  selected: 0,
  mainMap: service(),

  @computed('searchTerms')
  results(searchTerms) {
    return this.get('debouncedResults').perform(searchTerms);
  },

  debouncedResults: task(function* (searchTerms) {
    if (searchTerms.length < 3) this.cancel();
    yield timeout(DEBOUNCE_MS);
    const URL = `https://zola-search-api.planninglabs.nyc/search?q=${searchTerms}`;
    return yield fetch(URL)
      .then(data => data.json());
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

    if ([38, 40].includes(keyCode)) {
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
    }
  },

  actions: {
    clear() {
      this.set('searchTerms', '');
    },
    goTo(result) {
      const mainMap = this.get('mainMap.mapInstance');

      this.setProperties({
        searchTerms: '',
        selected: 0,
      });

      if (result.type === 'lot') {
        const { boro, block, lot } = bblDemux(result.bbl);
        this.transitionTo('lot', boro, block, lot);
      }

      if (result.type === 'address') {
        const center = result.coordinates;
        mainMap.flyTo({
          center,
          zoom: 18,
        });
      }
    },
  },
});
