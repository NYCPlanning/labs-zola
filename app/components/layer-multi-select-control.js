import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Component.extend(ParentMixin, {
  @computed('childComponents.@each.selected')
  allChecked() {
    return this.get('childComponents')
      .filterBy('selected')
      .mapBy('value');
  },

  values: [],

  didInsertElement() {
    this.send('selectionChanged');
  },

  queryParamBoundKey: 'allChecked',

  actions: {
    selectionChanged() {
      const values = this.get('allChecked');
      const source = this.get('source');
      const column = this.get('column');

      const previousValues = this.get('values');
      if (JSON.stringify(values) !== JSON.stringify(previousValues)) {
        this.get('parentComponent')
          .send('updateSql', 'buildMultiSelectSQL', source, column, values);
      }

      this.set('values', values);
    },
  },
});
