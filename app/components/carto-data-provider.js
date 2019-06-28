import Component from '@ember/component';
import { keepLatestTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { DelayPolicy } from 'ember-concurrency-retryable';
import DS from 'ember-data';

const delayRetryPolicy = new DelayPolicy({
  delay: [1000, 2000],
  reasons: [DS.AdapterError],
});

export default class LayerDataProviderComponent extends Component {
  @service
  router;

  @service
  store;

  modelName = 'carto-geojson-feature';

  modelId = null;

  @keepLatestTask({ retryable: delayRetryPolicy, maxConcurrency: 1 })
  findRecordTask = function* () {
    return yield this.store.findRecord(this.modelName, this.modelId);
  };

  @computed('modelName', 'modelId')
  get taskInstance() {
    return this.findRecordTask.perform();
  }
}
