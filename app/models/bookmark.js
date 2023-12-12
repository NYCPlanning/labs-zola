import DS from 'ember-data'; // eslint-disable-line
import { computed } from '@ember/object';
import { resolve } from 'rsvp';
import ObjectProxy from '@ember/object/proxy';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

const ObjectPromiseProxy = ObjectProxy.extend(PromiseProxyMixin);
const { Model, attr, belongsTo } = DS; // eslint-disable-line

export default class BookmarkModel extends Model {
  @belongsTo('bookmark', { inverse: 'bookmark', polymorphic: true }) bookmark;

  @attr('string') address;

  @attr() coordinates;

  @computed('bookmark')
  get recordType() {
    const { bookmark } = this;
    return ObjectPromiseProxy.create({
      promise: resolve(
        bookmark.then((bmark) => {
          if (bmark) {
            return bmark.get('constructor.modelName');
          }

          return 'address';
        })
      ),
    });
  }
}
