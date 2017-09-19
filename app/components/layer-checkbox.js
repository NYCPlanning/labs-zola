import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

const { Checkbox } = Ember;
const { alias } = Ember.computed;

export default Checkbox.extend(ChildMixin, {
  selected: alias('checked'),
  checked: true,
  value: '',
  selectionChanged() {},

  didUpdate() {
    this.selectionChanged();
  },
});
