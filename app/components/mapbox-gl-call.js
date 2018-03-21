import { schedule } from '@ember/runloop';
import { getProperties } from '@ember/object';
import EmberMapboxGLCall from 'ember-mapbox-gl/components/mapbox-gl-call';

export default EmberMapboxGLCall.extend({
  didReceiveAttrs() {
    const { obj, params } = getProperties(this, 'obj', 'func', 'args', 'params');
    let { func, args } = getProperties(this, 'func', 'args');
    if (args === null && params !== null) {
      if (func !== null) {
        args = params;
      } else {
        [func, ...args] = params;
      }
    }

    schedule('afterRender', () => {
      // if (func === 'fitBounds') { obj.resize(); } // uncomment to resize correctly
      this.sendAction('onResp', obj[func].apply(obj, args)); // eslint-disable-line
    });
  },
});
