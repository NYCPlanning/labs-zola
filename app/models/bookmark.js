import DS from 'ember-data'; // eslint-disable-line
import { computed } from '@ember/object';

// This throws https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/use-ember-data-rfc-395-imports.md.
// Fixing this elsewhere in the code was easy but I'm not sure where to get PromiseObject from.
// If I import it off of @ember-data/model, it's undefined.
const { PromiseObject, Model, attr, belongsTo } = DS; // eslint-disable-line

export default class BookmarkModel extends Model {
  @belongsTo('bookmark', { inverse: 'bookmark', polymorphic: true }) bookmark;

  @attr('string') address;

  @attr() coordinates;

  @computed('bookmark')
  get recordType() {
    const { bookmark } = this;
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
