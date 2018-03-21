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

  errorMessage: '',
  closed: true,

  mainMap: service(),

  // determine which type of search action
  // it should perform based on available input
  @computed('boro', 'block', 'lot')
  actionForSearchType(boro, block, lot) {
    if (boro && block && lot) {
      return 'goToLot';
    }

    return 'goToBlock';
  },

  actions: {
    goToLot() {
      const { boro: { code }, block, lot } = this.getProperties('boro', 'block', 'lot');

      const SQL = `select bbl from mappluto_v1711 where borocode = ${code} and block = ${block} and lot = ${lot}`;

      carto.SQL(SQL)
        .then(([response]) => {
          if (response) {
            this.setProperties({
              closed: true,
              errorMessage: '',
            });

            this.transitionTo('lot', code, block, lot);
          } else {
            this.set('errorMessage', 'The BBL does not exist.');
          }
        });
    },

    goToBlock() {
      const { block } = this.getProperties('boro', 'block');
      const { mapInstance } = this.get('mainMap');

      const SQL = `select st_x(the_geom) as x, st_y(the_geom) as y, block from mappluto_block_centroids where block = ${block}`;

      carto.SQL(SQL)
        .then(([firstResult = {}]) => {
          const { x, y } = firstResult;
          if (x && y) {
            this.setProperties({
              closed: true,
              errorMessage: '',
            });

            if (mapInstance) {
              mapInstance.flyTo({
                center: [x, y],
                zoom: 15,
              });
            }
          } else {
            this.set('errorMessage', 'The block does not exist.');
          }
        });
    },

    setBorocode(option) {
      this.set('boro', option);
    },
  },
});
