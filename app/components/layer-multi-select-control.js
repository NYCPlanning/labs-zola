import Component from '@ember/component';
import { ParentMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Component.extend(ParentMixin, {
  @computed('childComponents.@each.selected')
  allChecked() {
    return this.childComponents
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
      const values = this.allChecked;
      const source = this.source;
      const column = this.column;

      const previousValues = this.values;
      if (JSON.stringify(values) !== JSON.stringify(previousValues)) {
        this.parentComponent
          .send('updateSql', 'buildMultiSelectSQL', source, column, values);
      }

      this.set('values', values);
    },
  },
});
