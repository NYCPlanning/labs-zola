import DS from 'ember-data';
import { computed } from '@ember-decorators/object';

const { PromiseObject } = DS;

export default class MyComponent extends DS.Model {
  bookmark = DS.belongsTo('bookmark', { inverse: 'bookmark' });

  address = DS.attr('string');

  coordinates = DS.attr();

  @computed('bookmark')
  get recordType() {
    const bookmark = this.get('bookmark');
    return PromiseObject.create({
      promise: bookmark.then((bmark) => {
        if (bmark) {
          return bmark.get('constructor.modelName');
        }

        return 'address';
      }),
    });
  }
}
