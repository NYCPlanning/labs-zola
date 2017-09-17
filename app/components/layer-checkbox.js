import Ember from 'ember';
import { ChildMixin } from 'ember-composability-tools';

const { Checkbox } = Ember;

export default Checkbox.extend(ChildMixin, {
  checked: true,
  value: '',
  didUpdate() {
    this.get('parentComponent').send('checkboxChanged');
  },
});
