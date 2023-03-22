import { registerWaiter, unregisterWaiter } from '@ember/test';
import { action } from '@ember/object';
import Component from '@ember/component';
import { settled } from '@ember/test-helpers';
import { tagName } from '@ember-decorators/component';

const MAPBOX_GL_SOURCE_STUB = {
  setData() {},
};

const DEFAULT_EVENTS = ['resize', 'remove', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseout', 'contextmenu', 'wheel', 'touchstart', 'touchend', 'touchmove', 'touchcancel', 'movestart', 'move', 'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoom', 'zoomend', 'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend', 'boxzoomstart', 'boxzoomend', 'boxzoomcancel', 'webglcontextlost', 'webglcontextrestored', 'load', 'render', 'idle', 'error', 'data', 'styledata', 'sourcedata', 'dataloading', 'styledataloading', 'sourcedataloading', 'styleimagemissing']
  .reduce((hash, eventName) => {
    hash[eventName] = () => {};

    return hash;
  }, {});

export const MAPBOX_GL_DEFAULTS = {
  /**
   * convenience properties for stub
   */
  features: [],
  events: { // stores registered events
    // spread noop default events
    ...DEFAULT_EVENTS,
  },

  /**
   * mapbox-gl stub methods that interact
   * with convenience properties
   */

  // registers an event, merges features into signature
  // and returns a promise to makes sure app is settled
  on(event, ...args) {
    // map.on allows for the second arg to be an
    // id, for example, of a layer, scoping the
    // event callback to that layer
    const [secondArg, thirdArg] = args;
    let callback = secondArg;

    if (secondArg && thirdArg) {
      callback = thirdArg;
    }

    this.events[event] = async (hash = {}) => {
      callback({
        features: this.features,
        ...hash,
      });

      await settled();
    };
  },

  /**
   * plain mapbox-gl method stubs
   */
  addLayer() {},
  addSource() {},
  getSource: () => MAPBOX_GL_SOURCE_STUB,
  setLayoutProperty() {},
  setPaintProperty() {},
  setFilter() {},
  setLayerZoomRange() {},
  getCanvas: () => ({ style: {} }),
  addControl() {},
  removeControl() {},
  removeLayer() {},
  removeSource() {},
  resize() {},
  off() {},
  fitBounds() {},
  flyTo() {},
  querySourceFeatures() {
    return this.features;
  },
  queryRenderedFeatures() {
    return this.features;
  },
};

const createMapStub = function(testContext) {
  testContext.map = MAPBOX_GL_DEFAULTS;
  testContext.hoveredFeature = null;

  @tagName('')
  class BasicMapStub extends Component {
    // used internally for testing. tells the test suite
    // to wait until the map has loaded before proceeding
    @action
    _mapIsLoaded() {
      return !!this.mapInstance;
    }

    didInsertElement() {
      registerWaiter(this._mapIsLoaded);
    }

    willDestroyElement() {
      unregisterWaiter(this._mapIsLoaded);
    }

    // labs-map (built on top of mapbox-gl) requires this, tries to handle this
    hoveredFeature = testContext.hoveredFeature;

    mapLoaded = () => {}

    @action
    handleMapLoaded() {
      this.mapInstance = testContext.map;
      this.mapLoaded(testContext.map);
    }
  }

  return BasicMapStub;
};

// TODO: extract out the stub registration so that it can be used in other contexts
export default function(hooks) {
  hooks.beforeEach(async function() {
    this.owner.register('component:mapbox/basic-map', createMapStub(this));
  });
}
