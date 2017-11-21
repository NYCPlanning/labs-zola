import Ember from 'ember';
import carto from '../utils/carto';

import { computed } from 'ember-decorators/object'; // eslint-disable-line

import trackEvent from '../utils/track-event'; // eslint-disable-line
// export function getUniqueOptionsFor([column, sql]) {
//   const uniqueSQL = `select distinct(${column}) as option from (${sql}) a ORDER BY option ASC`;
//   return carto.SQL(uniqueSQL)
//     .then(response =>
//       response.map(row =>
//         row.option,
//       ),
//     );
// }

const { service } = Ember.inject;

export default Ember.Component.extend({
  classNames: ['bbl-lookup hide-for-print'],
  boroOptions: [
    { name: 'Manhattan', code: '1' },
    { name: 'Bronx', code: '2' },
    { name: 'Brooklyn', code: '3' },
    { name: 'Queens', code: '4' },
    { name: 'Staten Island', code: '5' },
  ],
  boro: '',
  block: '',
  lot: '',
  mainMap: service(),
  metrics: service(),
  focused: false,
  errorMessage: '',

  closed: false,
  actions: {
    checkBBL() {
      const { boro: { code }, block, lot } = this.getProperties('boro', 'block', 'lot');

      const uniqueSQL = `select bbl from support_mappluto where block= ${block} and lot = ${lot} and borocode = ${code}`;
      carto.SQL(uniqueSQL).then((response) => {
        // check if user has entered a bbl that exists
        if (response[0]) {
          this.set('errorMessage', '');
          this.setProperties({
            selected: 0,
            focused: false,
          });

          this.transitionTo('lot', code, block, lot);
          // transition to route here
        } else {
          this.set('errorMessage', 'BBL doesn\'t exist');
        }
        // return response[0].bbl;
      });


    },

    setBorocode(option) {
      // this.set('boro', option.code);

      // const { code } = option;
      // this.set('boro', code);

      this.set('boro', option);
    },
  },
});
