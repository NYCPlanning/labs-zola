import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { computed, action } from '@ember-decorators/object';

const Parentable = Component.extend(ParentMixin);

export default class LayerMultiSelectControl extends Parentable {
  @computed('childComponents.@each.selected')
  allChecked() {
    return this.childComponents
      .filterBy('selected')
      .mapBy('value');
  }

  values = [];

  didInsertElement() {
    this.send('selectionChanged');
  }

  queryParamBoundKey = 'allChecked';

  @action
  selectionChanged() {
    const values = this.allChecked;
    const { layerGroup, layerID, column } = this;

    const previousValues = this.values;

    if (JSON.stringify(values) !== JSON.stringify(previousValues)) {
      // should have access to the model and call the filter method
      const expression = ['any', ...values.map(value => ['==', column, value])];
      layerGroup.setFilterForLayer(layerID, expression);
    }

    this.set('values', values);
  }
}
