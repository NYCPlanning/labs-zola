import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';
import fetch from 'fetch';
import bblDemux from '../utils/bbl-demux';
import searchPlutoLots from '../utils/search-pluto-lots';

const { assign } = Ember;

const DEBOUNCE_MS = 250;

const mapzenSearchAPI = 'https://search.mapzen.com/v1/autocomplete?focus.point.lat=40.7259&focus.point.lon=-73.9805&limit=5&api_key=mapzen-q5s65uH&text=';

const handleLots = function(rows) {
  return rows.map(row =>
    assign(
      row,
      bblDemux(row.bbl),
      { type: 'lot' },
    ),
  );
};

const handleAddresses = function(searchTerms, results) {
  const url = `${mapzenSearchAPI}${searchTerms}, New York, NY`;

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
};

export default Ember.Component.extend({
  classNames: ['search'],
  searchTerms: '',

  @computed('searchTerms')
  results(searchTerms) {
    if (!searchTerms) return [];
    return this.get('debouncedResults').perform(searchTerms);
  },

  debouncedResults: task(function* (searchTerms) {
    yield timeout(DEBOUNCE_MS);
    return yield searchPlutoLots(searchTerms)
      .then(handleLots)
      .then(handleAddresses.bind(this, searchTerms));
  }).keepLatest(),

  actions: {
    clear() {
      this.set('searchTerms', '');
    },
  },
});
