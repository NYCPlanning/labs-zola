import EmberMapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import { ParentMixin } from 'ember-composability-tools';

const { service } = Ember.inject;

export default EmberMapboxGL.extend(ParentMixin, {
  init() {
    this._super(...arguments);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
  registeredLayers: service(),
});
