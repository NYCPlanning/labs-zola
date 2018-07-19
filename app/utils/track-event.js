import { isEmpty } from '@ember/utils';

// Broken for now pending code modification:
// https://github.com/ember-decorators/ember-decorators/issues/206

// decorator arguments
export default function trackEvent(eventCategory, incAction, incLabel, eventValue) {
  // decorator-specific pattern, args
  return (target, name, desc) => {
    const descriptor = desc;
    const originalValue = descriptor.value;

    descriptor.value = function(...args) {
      originalValue.call(this, ...args);

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

      try {
        this.get('metrics').trackEvent(
          'GoogleAnalytics',
          { eventCategory, eventAction, eventLabel, eventValue },
        );
      } catch (e) {
        throw Error('Metrics was not found and must be injected.', e);
      }
    };

    return descriptor;
  };
}
