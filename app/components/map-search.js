import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';
import bblDemux from '../utils/bbl-demux';
import searchPlutoLots from '../utils/search-pluto-lots';

const { assign } = Ember;
const { service } = Ember.inject;

const DEBOUNCE_MS = 250;

const mapzenSearchAPI = 'https://search.mapzen.com/v1/autocomplete?focus.point.lat=40.7259&focus.point.lon=-73.9805&limit=5&api_key=mapzen-q5s65uH&text=';

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
    return yield searchPlutoLots(searchTerms)
      .then(rows =>
        rows.map(row =>
          assign(
            row,
            bblDemux(row.bbl),
            { type: 'lot' },
          ),
        ))
      .then((results) => {
        const url = `${mapzenSearchAPI}${searchTerms}, New York, NY`;
        console.log(results, results.length);
        if (results.length) {
          return results;
        }

        return fetch(url)
          .then(res => res.json())
          .then(addresses => addresses.features
            .filter(feature => feature.properties.locality === 'New York')
            .map(feature =>
              assign(feature.properties, { type: 'address', geometry: feature.geometry }),
            ),
          );
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
      const { boro, block, lot } = result;
      const mainMap = this.get('mainMap.mapInstance');

      this.setProperties({
        searchTerms: '',
        selected: 0,
      });

      if (result.type === 'lot') this.transitionTo('lot', boro, block, lot);
      if (result.type === 'address') {
        const center = result.geometry.coordinates;
        mainMap.flyTo({
          center,
          zoom: 18,
        });
      }
    },
  },
});
