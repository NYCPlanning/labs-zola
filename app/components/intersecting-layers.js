import Component from '@ember/component';
import { get } from '@ember/object';
import RSVP from 'rsvp';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { task } from 'ember-concurrency';
import carto from '../utils/carto';

const generateSQL = function(table, bbl) {
  // special handling for tables where we don't want to SELECT *
  let intersectionTable = table;
  if (table === 'effective-flood-insurance-rate-2007') {
    intersectionTable = `(
      SELECT the_geom
      FROM floodplain_firm2007_v0
      WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
    )`;
  }

  if (table === 'floodplain_pfirm2015_v0') {
    intersectionTable = `(
      SELECT the_geom
      FROM floodplain_pfirm2015_v0
      WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
    )`;
  }

  return `
    WITH lot AS (SELECT the_geom FROM mappluto_v1711 WHERE bbl = '${bbl}')

    SELECT true as intersects FROM ${intersectionTable} a, lot b WHERE ST_Intersects(a.the_geom, b.the_geom) LIMIT 1
  `;
};

export default Component.extend({
  responseIdentifier: 'intersects',
  tagName: '',
  bbl: null,
  tables: [],

  calculateIntersections: task(function* (tables, bbl, responseIdentifier) {
    const hash = {};

    tables.forEach((table) => {
      hash[table] = carto.SQL(generateSQL(table, bbl))
        .then((response => get(response[0] || {}, responseIdentifier)));
    });

    return yield RSVP.hash(hash);
  }).restartable(),

  willDestroyElement() {
    this.get('calculateIntersections').cancelAll();
  },

  willUpdate() {
    this.get('calculateIntersections').cancelAll();
  },

  @computed('tables.@each', 'bbl', 'responseIdentifier')
  intersectingLayers(...args) {
    return this.get('calculateIntersections').perform(...args);
  },

  @computed('intersectingLayers.value')
  numberIntersecting(intersectingLayers) {
    if (intersectingLayers) {
      const truthyValues = Object
        .values(intersectingLayers)
        .filter(val => val);

      return get(truthyValues, 'length');
    }

    return 0;
  },
});
