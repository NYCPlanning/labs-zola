import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class MainHeaderComponent extends Component {
  @service('print')
  printSvc

  @service()
  media

  bookmarks;
}
