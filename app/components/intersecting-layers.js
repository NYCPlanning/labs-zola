import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import carto from '../utils/carto';

const { get, RSVP } = Ember;

const generateSQL = function(table, geometry) {
  return `SELECT * FROM ${table} 
          WHERE 
            ST_Intersects(
              ST_SetSRID(
                ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326), 
                ${table}.the_geom) LIMIT 1`;
};

export default Ember.Component.extend({
  responseIdentifier: 'cartodb_id',
  tagName: '',
  geometry: null,
  tables: [],

  @computed('tables.@each', 'geometry', 'responseIdentifier')
  intersectingLayers(tables, geometry, responseIdentifier) {
    const hash = {};

    tables.forEach((table) => {
      hash[table] = carto.SQL(generateSQL(table, geometry))
        .then((response => get(response[0] || {}, responseIdentifier)));
    });

    return RSVP.hash(hash);
  },

  @computed('intersectingLayers')
  numberIntersecting(intersectingLayers) {
    const truthyValues = Object
      .values(intersectingLayers)
      .filter(val => val);

    return get(truthyValues, 'length');
  },
});
