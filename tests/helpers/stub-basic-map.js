import Component from '@ember/component';
import { action } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';

export const MAPBOX_GL_DEFAULTS = {
  addLayer() {},
  on() {},
  addSource() {},
  setLayoutProperty() {},
  setPaintProperty() {},
  setFilter() {},
  setLayerZoomRange() {},
  addControl() {},
  removeLayer() {},
  removeSource() {},
  resize() {},
  off() {},
  fitBounds() {},
};

const createMapStub = function(testContext) {
  testContext.map = MAPBOX_GL_DEFAULTS;

  class BasicMapStub extends Component {
    init(...args) {
      super.init(...args);

      this.mapLoaded(testContext.map);
    }

    mapInstance = testContext.map;

    mapLoaded = () => {}

    @action
    handleMapLoaded() {}
  }

  return BasicMapStub;
};

export default function(hooks) {
  hooks.beforeEach(async function() {
    this.owner.register('component:mapbox/basic-map', createMapStub(this));
    this.owner.register('template:components/mapbox/basic-map', hbs`
      <div class="labs-map-loaded" style="display:none"></div>
      {{yield (hash
        instance=this.mapInstance
        hoveredFeature=this.hoveredFeature
      )}}
    `);
  });
}
