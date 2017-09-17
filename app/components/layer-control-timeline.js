import Ember from 'ember';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import moment from 'moment';
import { ChildMixin } from 'ember-composability-tools';

const { alias } = Ember.computed;

const defaultDate = 'YYYY-MM-DD';
const defaultStart = [1293840000000, 1505499351000];

const fromEpoch = function(number, format = defaultDate) {
  return moment(number).format(format);
};

export default Ember.Component.extend(ChildMixin, {
  init(...args) {
    this._super(...args);

    const qps = this.get('parentComponent.qps');
    const column = this.get('column');
    const { id } = this.get('parentComponent.config');

    if (qps) {
      const qpValue = this.get(`parentComponent.qps.${id}-${column}-slider`);

      this.set(
        'start',
        alias(`parentComponent.qps.${id}-${column}-slider`),
      );

      Ember.run.next(() => {
        this.send('sliderChanged', qpValue);
      });
    }
  },

  format: {
    to: number => fromEpoch(number, 'YYYY-MM'),
    from: number => fromEpoch(number, 'YYYY-MM'),
  },

  column: '',
  start: defaultStart, // epoch time
  min: defaultStart[0],
  max: defaultStart[1],

  actions: {
    sliderChanged(value) {
      const range = value.map(epoch => fromEpoch(epoch));
      const column = this.get('column');

      this.set('start', value);
      this.get('parentComponent').send('updateSql', 'buildRangeSQL', column, range);
    },
  },
});
