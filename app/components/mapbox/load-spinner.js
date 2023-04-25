import Component from '@ember/component';
import { action } from '@ember/object';
import { timeout, restartableTask } from 'ember-concurrency';

export default class LoadSpinner extends Component {
  mapInstance = {};

  @restartableTask
  loadStateTask = function* () {
    yield timeout(500);
  };

  @action
  handleMapLoading() {
    this.get('loadStateTask').perform();
  }
}
