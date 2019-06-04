import Component from '@ember/component';
import { get, computed } from '@ember/object';
import RSVP from 'rsvp';
import { task } from 'ember-concurrency';
import carto from '../utils/carto';

const generateSQL = function(table, bbl) {
  // special handling for tables where we don't want to SELECT *
  let intersectionTable = table;
  if (table === 'floodplain_firm2007') {
    intersectionTable = `(
      SELECT the_geom
      FROM floodplain_firm2007
      WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
    )`;
  }

  if (table === 'floodplain_pfirm2015') {
    intersectionTable = `(
      SELECT the_geom
      FROM floodplain_pfirm2015
      WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'
    )`;
  }

  return `
    WITH lot AS (SELECT the_geom FROM mappluto WHERE bbl = '${bbl}')

    SELECT true as intersects FROM ${intersectionTable} a, lot b WHERE ST_Intersects(a.the_geom, b.the_geom) LIMIT 1
  `;
};

export default class IntersectingLayersComponent extends Component {
  responseIdentifier = 'intersects';

  bbl = null;

  @task(function* (tables, bbl, responseIdentifier) {
    const hash = {};

    tables.forEach((table) => {
      hash[table] = carto.SQL(generateSQL(table, bbl))
        .then((response => get(response[0] || {}, responseIdentifier)));
    });

    return yield RSVP.hash(hash);
  })
  calculateIntersections;

  willDestroyElement() {
    this.get('calculateIntersections').cancelAll();
  }

  willUpdate() {
    this.get('calculateIntersections').cancelAll();
  }

  @computed('tables.@each', 'bbl', 'responseIdentifier')
  get intersectingLayers() {
    const { tables, bbl, responseIdentifier } = this.getProperties('tables', 'bbl', 'responseIdentifier');
    return this.get('calculateIntersections').perform(tables, bbl, responseIdentifier);
  }

  @computed('intersectingLayers.value')
  get numberIntersecting() {
    const intersectingLayers = this.get('intersectingLayers.value');

    if (intersectingLayers) {
      const truthyValues = Object
        .values(intersectingLayers)
        .filter(val => val);

      return get(truthyValues, 'length');
    }

    return 0;
  }
}
