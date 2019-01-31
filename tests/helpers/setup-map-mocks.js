import { registerWaiter, unregisterWaiter } from '@ember/test';
import LabsMap from 'ember-mapbox-composer/components/labs-map';
import MapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import Service, { inject as service } from '@ember/service';

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

    this.owner.register('component:labs-map', LabsMap.extend({
      didIdle: false,
      mockMapService: service(),
      init(...args) {
        this._super(...args);

        this.get('mockMapService.maps').set(this.elementId, this);
        registerWaiter(() => this.didIdle);
        const mapLoadedClosure = this.mapLoaded;

        this.mapLoaded = (map) => {
          map.once('idle', () => {
            this.element.outerHTML = `
              <div>
                <img src="${map.getCanvas().toDataURL()}"/>
              </div>
            `;
            this.didIdle = true;
          });

          return mapLoadedClosure(map);
        }
      },
      willDestroyElement(...params) {
        unregisterWaiter(() => this.map);

        this._super(...params);
      },
    }));
  });
}
