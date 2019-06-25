import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { retryable, DelayPolicy } from 'ember-concurrency-retryable';
import DS from 'ember-data';

const delayRetryPolicy = new DelayPolicy({
  delay: [1000, 2000],
  reasons: [DS.AdapterError],
});

export default class LayerDataProviderComponent extends Component {
  @service
  store;

  modelId = null;

  modelName = 'carto-data-provider';

  @retryable(task(function* () {
    const { modelName, modelId } = this;

    return yield this.store.findRecord(modelName, modelId);
  }), delayRetryPolicy)
  findRecordTask;

  didReceiveAttrs() {
    this.findRecordTask.perform();
  }

  willDestroy() {
    this.findRecordTask.cancelAll();
  }

  willUpdate() {
    this.findRecordTask.cancelAll();
  }
}
