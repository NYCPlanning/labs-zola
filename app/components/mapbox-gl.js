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
});
