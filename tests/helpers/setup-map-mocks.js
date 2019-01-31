import { registerWaiter, unregisterWaiter } from '@ember/test';
import LabsMap from 'ember-mapbox-composer/components/labs-map';
import MapboxGL from 'ember-mapbox-gl/components/mapbox-gl';
import Service, { inject as service } from '@ember/service';
import { service as serviceDec } from '@ember-decorators/service';

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

    class TesterMap extends LabsMap {
      didIdle = false;

      @serviceDec
      mockMapService;

      init(...args) {
        super.init(...args);

        // register map reference
        this.get('mockMapService.maps').set(this.elementId, this);

        // test waiter
        registerWaiter(this.testWaiter.bind(this));
      }

      willDestroyElement(...params) {
        unregisterWaiter(this.testWaiter.bind(this));

        this._super(...params);
      }

      testWaiter() {
        if (this.map) {
          return this.didIdle;
        }

        return false;
      }

      swapInImage(map) {
        const target = this.element.querySelector('canvas') || this.element.querySelector('img');
        target.outerHTML = `
          <img src="${map.getCanvas().toDataURL()}"/>
        `;
      }

      _onLoad(map) {
        // override maploaded with an event listener that replaces
        // the canvas with an image for testing purposes
        map.on('idle', () => {
          this.swapInImage(map);
          this.didIdle = true;
        });

        super._onLoad(map);
      }
    }

    this.owner.register('component:labs-map', TesterMap);
  });
}
