import Ember from 'ember';

const { service } = Ember.inject;

export default function trackEvent(...gaFields) {
  return (target, name, desc) => {
    const descriptor = desc;
    const originalValue = descriptor.value;

    descriptor.value = function(...args) {
      if (!this.get('metrics')) {
        this.set('metrics', service());
      }

      this.get('metrics').trackEvent(...gaFields);

      originalValue.call(this, ...args);
    };

    return descriptor;
  };
}
