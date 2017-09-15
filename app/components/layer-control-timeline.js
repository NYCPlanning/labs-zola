import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { min, max } from 'ember-decorators/object/computed';
import moment from 'moment';

const fromEpoch = function(number, format = 'YYYY-MM-DD') {
  return moment(number).format(format);
};

export default Ember.Component.extend({
  init(...args) {
    this._super(...args);
    this.set('_sql', this.get('layer.sql'));
  },
  _sql: '',
  column: '',
  layer: {},
  start: [1293840000000, 2493072000000],

  @min('start') min,
  @max('start') max,

  actions: {
    sliderChanged(value) {
      const column = this.get('column');
      const range = value.map(epoch => fromEpoch(epoch));
      let sql = this.get('_sql');

      sql += ` WHERE ${column} > '${range[0]}' AND ${column} < '${range[1]}'`;
      this.get('layer.updateSql')(sql);
    },
  },
});
