import { alias } from '@ember/object/computed';
import Checkbox from '@ember/component/checkbox';
import { ChildMixin } from 'ember-composability-tools';

export default Checkbox.extend(ChildMixin, {
  selected: alias('checked'),
  checked: true,
  value: '',
  selectionChanged() {},

  didUpdate() {
    this.selectionChanged();
  },
});
