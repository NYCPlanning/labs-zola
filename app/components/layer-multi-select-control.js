import Ember from 'ember';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Ember.Component.extend(ParentMixin, ChildMixin, {
  @computed('childComponents.@each.checked')
  allChecked() {
    return this.get('childComponents')
      .filterBy('checked')
      .mapBy('value');
  },
  actions: {
    checkboxChanged() {
      const values = this.get('allChecked');
      const column = this.get('column');

      this.get('parentComponent')
        .send('updateSql', 'buildMultiSelectSQL', column, values);
    },
  },
});
