import Component from '@ember/component';
import { keepLatestTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { DelayPolicy } from 'ember-concurrency-retryable';
import AdapterError from '@ember-data/adapter/error';

const delayRetryPolicy = new DelayPolicy({
  delay: [1000, 2000],
  reasons: [AdapterError],
});

export default class CartoDataProvider extends Component {
  @service store;

  modelName = 'carto-geojson-feature';

  modelId = null;

  @keepLatestTask({ retryable: delayRetryPolicy, maxConcurrency: 1 })
  findRecordTask = function* () {
    return yield this.store.findRecord(this.modelName, this.modelId);
  };

  @computed('findRecordTask', 'modelId', 'modelName')
  get taskInstance() {
    return this.findRecordTask.perform();
  }
}
