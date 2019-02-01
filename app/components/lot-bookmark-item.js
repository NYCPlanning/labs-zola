import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class LotBookmarkItemComponent extends Component {
  deleteBookmark() {}

  @action
  _deleteBookmark(e) {
    this.deleteBookmark(e);
  }
}
