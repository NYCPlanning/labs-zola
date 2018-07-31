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
  validBlock: false,
  validLot: false,

  actions: {
    validate() {
      const boro = this.get('boro');
      const block = this.get('block');
      const lot = this.get('lot');

      const validBoro = (boro !== '');
      const validBlock = ((block !== '') && (parseInt(block, 10) < 100000) && (parseInt(block, 10) > 0));
      const validLot = ((lot !== '') && (parseInt(lot, 10) < 10000) && (parseInt(lot, 10) > 0));

      this.send('resetErrorMessage');
      this.set('validBlock', validBoro && validBlock);
      this.set('validLot', validBoro && validBlock && validLot);
    },

    checkBBL() {
      const { boro: { code }, block, lot } = this;

      if (code && block && lot) {
        this.send('goToLot');
      }
      if (block && !lot) {
        this.send('goToBlock');
      }
      if (!code && !block && !lot) {
        this.set('errorMessage', 'Please fill out all required fields.');
      }
    },

    resetErrorMessage() {
      this.set('errorMessage', '');
    },

    setBorocode(option) {
      this.set('boro', option);
      this.send('validate');
    },

    goToLot() {
      const { boro: { code }, block, lot } = this;
      const SQL = `select bbl from mappluto_v18_1 where borocode = ${code} and block = ${block} and lot = ${lot}`;

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
      const { boro: { code }, block } = this;
      const { mapInstance } = this.get('mainMap');
      const SQL = `SELECT the_geom FROM mappluto_block_centroids WHERE block= ${parseInt(block, 10)} AND borocode = ${code}`;

      carto.SQL(SQL, 'geojson').then((response) => {
        if (response.features[0]) {
          console.log('response has features');
          this.set('errorMessage', '');
          this.setProperties({
            closed: true,
          });
          mapInstance.flyTo(response.features[0].geometry.coordinates, 16);
        } else {
          console.log('no features in response');
          this.set('errorMessage', 'The Block does not exist.');
        }
      });
    },
  },
});
