import { inject as service } from '@ember/service';
import EmberMapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import { ParentMixin } from 'ember-composability-tools';

export default EmberMapboxGL.extend(ParentMixin, {
  init(...args) {
    this._super(...args);

    this.set('registeredLayers.layers', this.get('childComponents'));
  },
  registeredLayers: service(),
});
