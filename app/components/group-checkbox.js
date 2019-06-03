import Checkbox from '@ember/component/checkbox';
import { computed } from '@ember/object';

export default class MyCheckbox extends Checkbox {
  refs = [];

  values = [];

  @computed('values.@each')
  get checked() {
    const { values } = this;
    return values.every(val => val);
  }

  set checked(value) {
    const {
      scope,
      refs,
      values,
      indeterminate,
    } = this;

    if (indeterminate) refs.forEach(ref => scope.set(ref, true));
    if (values.every(val => val)) refs.forEach(ref => scope.set(ref, false));
    if (values.every(val => !val)) refs.forEach(ref => scope.set(ref, true));
  }

  @computed('values.@each')
  get indeterminate() {
    const values = this.get('values');
    const { checked } = this;
    return values.some(val => val) && !checked;
  }
}
