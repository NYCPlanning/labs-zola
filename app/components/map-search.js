import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import bblDemux from '../utils/bbl-demux';

const { merge } = Ember;

function getMatches(text) {
  const SQL = `
    SELECT (address || ', ' || 
      CASE 
        WHEN borough = 'MN' THEN 'Manhattan' 
        WHEN borough = 'BX' THEN 'Bronx' 
        WHEN borough = 'BK' THEN 'Brooklyn' 
        WHEN borough = 'QN' THEN 'Queens' 
        WHEN borough = 'SI' THEN 'Staten Island'
      END) as address, bbl FROM support_mappluto 
     WHERE address LIKE '%25${text.toUpperCase()}%25' LIMIT 10`;

  const URL = `https://carto.planninglabs.nyc/user/data/api/v2/sql?q=${SQL}`;
  return fetch(URL).then(res => res.json());
}

export default Ember.Component.extend({
  classNames: ['search'],
  searchTerms: '120 broadway',

  @computed('searchTerms')
  results(searchTerms) {
    if (!searchTerms) return [];
    return this.get('debouncedResults').perform(searchTerms);
  },

  debouncedResults: task(function* (searchTerms) {
    return yield getMatches(searchTerms)
      .then((res) => {
        const { rows } = res;
        return rows.map(row => merge(row, bblDemux(row.bbl)));
      });
  }).keepLatest(),
});
