import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import moment from 'moment';

const { alias } = Ember.computed;

const defaultDate = 'YYYY-MM-DD';

const fromEpoch = function(number, format = defaultDate) {
  return moment(number).format(format);
};

export default Ember.Component.extend({
  init(...args) {
    this._super(...args);

    const qps = this.get('qps');
    const column = this.get('column');
    const { id } = this.get('layer.config');
    if (qps) {
      const qpValue = this.get(`qps.${id}-${column}-slider`);
      this.set(
        'start',
        alias(`qps.${id}-${column}-slider`),
      );

      Ember.run.next(() => {
        this.get('layer.updateSql')(this.buildRangeSQL(qpValue));
      });
    }
  },

  format: {
    to: number => { return fromEpoch(number, 'YYYY-MM'); },
    from: number => { return fromEpoch(number, 'YYYY-MM'); },
  },

  column: '',
  layer: {},
  start: [1293840000000, 2493072000000],

  buildRangeSQL(value) {
    const column = this.get('column');
    const range = value.map(epoch => fromEpoch(epoch));
    let sql = this.get('layer.config.sql');

    sql += ` WHERE ${column} > '${range[0]}' AND ${column} < '${range[1]}'`;

    return sql;
  },

  actions: {
    sliderChanged(value) {
      const sql = this.buildRangeSQL(value);

      this.set('start', value);
      this.get('layer.updateSql')(sql);
    },
  },
});
