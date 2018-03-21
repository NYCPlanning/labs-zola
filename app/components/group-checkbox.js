import Checkbox from '@ember/component/checkbox';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Checkbox.extend({
  @computed scope() { return this; },
  refs: [],
  values: [],

  @computed('values.@each')
  get checked() {
    const values = this.get('values');
    return values.every(val => val);
  },
  set checked(value) {
    const { scope, refs, values, indeterminate } =
      this.getProperties('scope', 'refs', 'values', 'indeterminate');

    if (indeterminate) refs.forEach(ref => scope.set(ref, true));
    if (values.every(val => val)) refs.forEach(ref => scope.set(ref, false));
    if (values.every(val => !val)) refs.forEach(ref => scope.set(ref, true));
  },

  @computed('values.@each')
  indeterminate(values) {
    const checked = this.get('checked');
    return values.some(val => val) && !checked;
  },
});
