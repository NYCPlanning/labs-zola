import Component from '@ember/component';
import { ChildMixin } from 'ember-composability-tools';
import { computed } from 'ember-decorators/object'; // eslint-disable-line

export default Component.extend(ChildMixin, {
  classNames: 'flex-reverse',

  @computed('parentComponent.childComponents', 'group')
  childComponents(childComponents, group) {
    return childComponents
      .filterBy('group', group)
      .filter(el => !el.isWrapperComponent);
  },

  @computed('childComponents.@each.checked')
  get selected() {
    return this.get('childComponents').mapBy('checked').every(el => el);
  },
  set selected(value) {
    if (value) return this.send('toggleChildren');
    return value;
  },

  @computed('childComponents.@each.checked')
  indeterminate(childComponents) {
    const allChecked = childComponents.filterBy('checked').length;
    const numberCheckboxes = childComponents.length;
    return allChecked < numberCheckboxes && allChecked > 0;
  },

  // required so childComponents ignores this component
  isWrapperComponent: true,

  actions: {
    toggleChildren() {
      const checked = this.get('selected');
      const childComponents = this.get('childComponents');
      if (checked) {
        childComponents.invoke('set', 'checked', false);
      } else {
        childComponents.invoke('set', 'checked', true);
      }
    },
  },
});
