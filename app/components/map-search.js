import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task, timeout } from 'ember-concurrency';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

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
  return $.ajax(URL);
}

export default Ember.Component.extend({
  classNames: ['search'],
  searchTerms: '120 broadway',

  @computed('searchTerms')
  results(searchTerms) {
    if (searchTerms) {
      return getMatches(searchTerms)
        .then(res => res.rows);
    }
  },
});
