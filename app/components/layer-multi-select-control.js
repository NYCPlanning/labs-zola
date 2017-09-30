import Ember from 'ember';
import { ParentMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Component.extend(ParentMixin, {
  @computed('childComponents.@each.selected')
  allChecked() {
    return this.get('childComponents')
      .filterBy('selected')
      .mapBy('value');
  },

  didInsertElement() {
    this.send('selectionChanged');
  },

  queryParamBoundKey: 'allChecked',

  actions: {
    selectionChanged() {
      const values = this.get('allChecked');
      const source = this.get('source');
      const column = this.get('column');

      this.get('parentComponent')
        .send('updateSql', 'buildMultiSelectSQL', source, column, values);
    },
  },
});
