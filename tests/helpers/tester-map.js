import LabsMap from '@nycplanning/ember/components/labs-map';
import { registerWaiter, unregisterWaiter } from '@ember/test';
import { inject as service } from '@ember/service';
import { timeout, task } from 'ember-concurrency';

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

  @task(function* (map) {
    yield timeout(300);
    const target = this.element.querySelector('canvas') || this.element.querySelector('img');

    target.outerHTML = `
      <img src="${map.getCanvas().toDataURL()}"/>
    `;
  })
  swapInImage;

  _onLoad(map) {
    // callbacks
    this.callbacks = {
      willIdle: () => {
        this.swapInImage.perform(map);
        this.didIdle = true;
      },
      willRender: () => {
        this.swapInImage.perform(map);
      },
    };

    // override maploaded with an event listener that replaces
    // the canvas with an image for testing purposes
    map.on('idle', this.callbacks.willIdle);
    map.on('render', this.callbacks.willRender);

    super._onLoad(map);
  }
}
