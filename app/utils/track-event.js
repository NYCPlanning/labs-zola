import Ember from 'ember';

const { isEmpty, inject: { service } } = Ember;

export default function trackEvent(eventCategory, incAction, incLabel, eventValue) {
  return (target, name, desc) => {
    const descriptor = desc;
    const originalValue = descriptor.value;

    descriptor.value = function(...args) {
      originalValue.call(this, ...args);

      if (!this.get('metrics')) {
        this.set('metrics', service());
      }

      let eventAction = incAction;
      let eventLabel = incLabel;

      // allow getting prop names for values
      if (eventAction) {
        const actionIdentifier = this.get(eventAction);

        if (!isEmpty(actionIdentifier)) {
          eventAction = actionIdentifier;
        }
      }

      if (eventLabel) {
        const labelIdentifier = this.get(eventLabel);
        if (!isEmpty(labelIdentifier)) {
          eventLabel = labelIdentifier;
        }
      }

      this.get('metrics').trackEvent(
        'GoogleAnalytics',
        { eventCategory, eventAction, eventLabel, eventValue },
      );
    };

    return descriptor;
  };
}
