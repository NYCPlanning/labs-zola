import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MainHeaderComponent extends Component {
  @service('print') printSvc;

  @service() media;

  @tracked bookmarks;

  @tracked savedLayerSets;

  @computed('bookmarks.length', 'savedLayerSets.length')
  get totalBookmarks() {
    return this.bookmarks.length + this.savedLayerSets.length;
  }
}
