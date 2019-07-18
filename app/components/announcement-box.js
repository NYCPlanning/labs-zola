import Component from '@ember/component';
import { action } from '@ember/object';

export default class AnnouncementBox extends Component {
  isOpen = false;

  @action
  toggle() {
    this.toggleProperty('isOpen');
  }
}
