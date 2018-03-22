import { next } from '@ember/runloop';
import Component from '@ember/component';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import moment from 'moment';
import { ChildMixin } from 'ember-composability-tools';
import QueryParamMap from '../mixins/query-param-map';

const defaultFormat = 'YYYY-MM-DD';
const defaultMax = new Date();
const defaultStart = [1032370151000, defaultMax.getTime()];

const fromEpoch = function(number, format = defaultFormat) {
  return moment(number).format(format);
};

export default Component.extend(ChildMixin, QueryParamMap, {
  init(...args) {
    this._super(...args);

    const qps = this.get('parentComponent.qps');
    const queryParam = this.get('query-param');

    if (qps) {
      const qpValue = this.get(`parentComponent.qps.${queryParam}`);

      next(() => {
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

  queryParamBoundKey: 'start',

  actions: {
    sliderChanged(value) {
      const range = value
        .map(epoch => fromEpoch(epoch))
        .map((date, i) => { // eslint-disable-line
          if (i === 0) {
            return moment(date).startOf('month').format(defaultFormat);
          }
          return moment(date).endOf('month').format(defaultFormat);
        });
      const column = this.get('column');
      const source = this.get('source');

      this.set('start', value);
      this.get('parentComponent').send('updateSql', 'buildRangeSQL', source, column, range);
    },
  },
});
