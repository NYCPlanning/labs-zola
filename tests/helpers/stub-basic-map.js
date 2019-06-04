import { registerWaiter, unregisterWaiter } from '@ember/test';
import { action } from '@ember/object';
import Component from '@ember/component';

const MAPBOX_GL_SOURCE_STUB = {
  setData() {},
};

const DEFAULT_EVENTS = ['resize', 'remove', 'mousedown', 'mouseup', 'mouseover', 'mousemove', 'click', 'dblclick', 'mouseenter', 'mouseleave', 'mouseout', 'contextmenu', 'wheel', 'touchstart', 'touchend', 'touchmove', 'touchcancel', 'movestart', 'move', 'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoom', 'zoomend', 'rotatestart', 'rotate', 'rotateend', 'pitchstart', 'pitch', 'pitchend', 'boxzoomstart', 'boxzoomend', 'boxzoomcancel', 'webglcontextlost', 'webglcontextrestored', 'load', 'render', 'idle', 'error', 'data', 'styledata', 'sourcedata', 'dataloading', 'styledataloading', 'sourcedataloading', 'styleimagemissing']
  .reduce((acc, curr) => {
    acc[curr] = () => {};

    return acc;
  }, {});

export const MAPBOX_GL_DEFAULTS = {
  events: { // stores registered events
    // spread noop default events
    ...DEFAULT_EVENTS,
  },
  on(event, callback) {
    this.events[event] = callback;
  },

  addLayer() {},
  addSource() {},
  getSource: () => MAPBOX_GL_SOURCE_STUB,
  setLayoutProperty() {},
  setPaintProperty() {},
  setFilter() {},
  setLayerZoomRange() {},
  getCanvas: () => ({ style: {} }),
  addControl() {},
  removeLayer() {},
  removeSource() {},
  resize() {},
  off() {},
  fitBounds() {},
  querySourceFeatures: () => [],
  queryRenderedFeatures: () => [],
};

const createMapStub = function(testContext) {
  testContext.map = MAPBOX_GL_DEFAULTS;
  testContext.hoveredFeature = null;

  class BasicMapStub extends Component {
    init(...args) {
      super.init(...args);

      registerWaiter(this._mapIsLoaded);
    }

    // used internally for testing. tells the test suite
    // to wait until the map has loaded before proceeding
    @action
    _mapIsLoaded() {
      return !!this.mapInstance;
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

export default function(hooks) {
  hooks.beforeEach(async function() {
    this.owner.register('component:mapbox/basic-map', createMapStub(this));
  });
}
