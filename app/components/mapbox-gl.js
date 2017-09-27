import Ember from 'ember';
import EmberMapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import { ParentMixin } from 'ember-composability-tools';

const {
  inject: { service },
  run: { scheduleOnce, bind, later },
} = Ember;

export default EmberMapboxGL.extend(ParentMixin, {
  init(...args) {
    this._super(...args);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
  registeredLayers: service(),
  resizeDetector: service(),

  selector: '#main-map',
  didInsertElement(...args) {
    this._super(...args);

    scheduleOnce('afterRender', this, this.setup);
  },

  setup() {
    this.callback = bind(this, this.onResize);
    this.get('resizeDetector').setup(this.get('selector'), this.callback);
  },

  teardown() {
    this.get('resizeDetector').teardown(this.get('selector'), this.callback);
  },

  onResize() {
    const map = this.get('map');
    later(() => {
      if (map) map.resize();
    }, 1000);
    if (map) {
      map.once('moveend', () => {
        later(() => {
          if (map) map.resize();
        }, 1000);
      });
    }
  },

  willDestroyElement(...args) {
    this.teardown();

    this._super(...args);
  },
});
