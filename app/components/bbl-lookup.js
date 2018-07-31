import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import carto from '../utils/carto';

export default Component.extend({
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
      const { boro: { code }, block, lot } = this;

      const uniqueSQL = `select bbl from mappluto_v18_1 where block= ${block} and lot = ${lot} and borocode = ${code}`;
      carto.SQL(uniqueSQL).then((response) => {
        if (response[0]) {
          this.set('errorMessage', '');
          this.setProperties({
            selected: 0,
            focused: false,
            closed: true,
          });

          this.transitionTo('lot', code, block, lot);
        } else {
          this.set('errorMessage', 'The BBL does not exist.');
        }
      });
    },

    resetErrorMessage() {
      this.set('errorMessage', '');
    },

    setBorocode(option) {
      this.set('boro', option);
      this.set('errorMessage', '');
    },
  },
});
