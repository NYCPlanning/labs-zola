import Ember from 'ember';
import carto from '../utils/carto';

import { computed } from 'ember-decorators/object'; // eslint-disable-line

import trackEvent from '../utils/track-event'; // eslint-disable-line

const { service } = Ember.inject;

export default Ember.Component.extend({
  classNames: ['bbl-lookup hide-for-print'],
  boroOptions: [
    { name: 'Manhattan (1)', code: '1' },
    { name: 'Bronx (2)', code: '2' },
    { name: 'Brooklyn (3)', code: '3' },
    { name: 'Queens (4)', code: '4' },
    { name: 'Staten Island (5)', code: '5' },
  ],
  boro: '',
  block: '',
  lot: '',
  mainMap: service(),
  metrics: service(),
  focused: false,
  errorMessage: '',
  closed: true,

  actions: {
    checkBBL() {
      const { boro: { code }, block, lot } = this.getProperties('boro', 'block', 'lot');

      let SQL;

      // full bbl
      if (code && block && lot) {
        SQL = `select bbl from mappluto_v1711 where borocode = ${code} and block = ${block} and lot = ${lot}`;
      }

      // boro block but nno lot
      if (code && block && !lot) {
        SQL = `select st_x(the_geom) as x, st_x(the_geom) as y, block from mappluto_block_centroids where block = ${block}`;
      }

      carto.SQL(SQL)
        .then(([response]) => {
          if (response) {
            this.setProperties({
              selected: 0,
              focused: false,
              closed: true,
              errorMessage: '',
            });

            this.transitionTo('lot', code, block, lot);
          } else {
            this.set('errorMessage', 'The BBL does not exist.');
          }
        });
    },

    setBorocode(option) {
      this.set('boro', option);
    },
  },
});
