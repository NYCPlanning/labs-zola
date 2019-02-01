import LabsMap from 'ember-mapbox-composer/components/labs-map';
import { registerWaiter, unregisterWaiter } from '@ember/test';
import { inject as service } from '@ember-decorators/service';

export default class TesterMap extends LabsMap {
  didIdle = false;

  @service
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

    this.map.off('idle', this.callbacks.willIdle);
    this.map.off('render', this.callbacks.willRender);

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
    // callbacks
    this.callbacks = {
      willIdle: () => {
        this.swapInImage(map);
        this.didIdle = true;
      },
      willRender: () => {
        this.swapInImage(map);
      },
    };

    // override maploaded with an event listener that replaces
    // the canvas with an image for testing purposes
    map.on('idle', this.callbacks.willIdle);
    map.on('render', this.callbacks.willRender);

    super._onLoad(map);
  }
}
