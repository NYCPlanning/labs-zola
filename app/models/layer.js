import LayerModel from '@nycplanning/ember/models/layer';
import { next } from '@ember/runloop';

// I'm reimporting and extending to fix a minor bug
// newer versions of this addon break the code.
// The fix here is to prevent attempting to _set_ on
// a destroying or destroyed object.
export default LayerModel.extend({
  delegateVisibility() {
    const visible = this.get('layerGroup.visible');

    if (this.layerVisibilityType === 'singleton') {
      if (this.position === 1 && this.get('layerGroup.visible')) {
        next(() => (!this.isDestroyed ? this.set('visibility', true) : null));
      } else {
        next(() => (!this.isDestroyed ? this.set('visibility', false) : null));
      }
    } else {
      next(() => (!this.isDestroyed ? this.set('visibility', visible) : null));
    }
  },
});
