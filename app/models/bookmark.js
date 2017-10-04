import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { Promise } from 'rsvp';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  title: attr('string'),
  subtitle: attr('string'),

  // optional
  coordinates: attr(),

  // this must be updated to include other bookmarkables
  @computed('lot', 'zma')
  recordType(...args) {
    return Promise.all(args).then(([lot, zma]) => {
      if (lot) {
        return lot.get('constructor.modelName');
      }

      if (zma) {
        return zma.get('constructor.modelName');
      }

      return 'address';
    });
  },

  lot: belongsTo('lot'),
  zma: belongsTo('zma'),
});
