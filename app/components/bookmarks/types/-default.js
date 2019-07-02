import Component from '@ember/component';
import { action } from '@ember/object';
import layout from '../../../templates/components/bookmarks/types/-default';

export default class DefaultBookmark extends Component {
  layout = layout;

  items = [];

  @action
  deleteBookmark(bookmark) {
    bookmark.deleteRecord();
    bookmark.save();
  }
}
