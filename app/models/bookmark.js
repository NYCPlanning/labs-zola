import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

const { PromiseObject } = DS;

export default DS.Model.extend({
  bookmark: DS.belongsTo('bookmark', { inverse: 'bookmark' }),

  address: DS.attr('string'),
  coordinates: DS.attr(),

  @computed('bookmark')
  recordType(bookmark) {
    return PromiseObject.create({
      promise: bookmark.then((bmark) => {
        if (bmark) {
          return bmark.get('constructor.modelName');
        }

        return 'address';
      }),
    });
  },
});
