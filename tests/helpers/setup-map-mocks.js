import { registerWaiter, unregisterWaiter } from '@ember/test';
import MapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import Service, { inject as service } from '@ember/service';
import TesterMap from './tester-map';

export default function(hooks) {
  hooks.beforeEach(async function() {
    this.owner.register('service:mock-map-service', Service.extend({
      init(...args) {
        this._super(...args);
        this.set('maps', new Map());
      },
    }));

    this.owner.register('component:mapbox-gl', MapboxGL.extend({
      mockMapService: service(),
      init(...args) {
        this._super(...args);
        this.get('mockMapService.maps').set(this.elementId, this);
        registerWaiter(() => this.map);
      },
      willDestroyElement(...params) {
        unregisterWaiter(() => this.map);

        this._super(...params);
      },
    }));

    this.owner.register('component:labs-map', TesterMap);
  });
}
