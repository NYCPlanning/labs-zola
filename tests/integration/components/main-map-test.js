import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  click,
  waitFor,
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
import Service from '@ember/service';
import stubBasicMap from '../../helpers/stub-basic-map';

const MAPBOX_GL_BLANK_STYLE = {
  mapboxStyle: {
    version: 8,
    sources: {},
    layers: [],
  },
};

module('Integration | Component | main-map', function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  stubBasicMap(hooks);

  hooks.beforeEach(async function() {
    this.meta = MAPBOX_GL_BLANK_STYLE;
    this.bookmarks = A([]);
    this.printSvc = this.owner.lookup('service:print');
  });

  test('it renders', async function(assert) {
    this.server.createList('layer-group', 10, 'hasLayers');
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });
    this.layerGroups.meta = this.meta;

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        onPrint=(action (mut this.printSvc.enabled) true)
      }}
    `);

    assert.ok(find("[data-test-main-map='loaded']"));
  });

  // this test may be an over-reach because it's making sure that an addon behaves
  // correctly, the addon being ember-mapbox-composer
  test('mousing-over something highlightable highlights the feature', async function(assert) {
    this.server.create('layer', 1, {
      visible: true,
      highlightable: true,
      id: 'visible-layer',
      style: {
        type: 'fill',
      },
    });
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });
    this.layerGroups.meta = this.meta;

    // this is a geometric test feature that is sent in response to
    // some given event, either click or mousemove, etc.
    const targetEventFeature = {
      type: 'Feature',
      properties: {
        bbl: '1', // expected in main-map click handler to route to a route id
        id: '1', // expected by addon dependency to "stitch" tiles
      },
      layer: {
        id: 'visible-layer', // expected by addon dependency for mapbox-gl lookups
      },
      geometry: null,
    };

    this.map.features = [targetEventFeature];

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        onPrint=(action (mut this.printSvc.enabled) true)
      }}
    `);

    // this is the key mapbox-gl function that gets called to toggle
    // the visibility of the generic mapbox-gl-layer that's used to
    // represent the highlighted feature
    let args = [];
    this.map.setLayoutProperty = function(id, key, value) {
      args = [id, key, value];
    };

    await this.map.events.mousemove();

    assert.equal(args[0], 'highlighted-feature-line');
    assert.equal(args[2], 'visible');
  });

  test('mousing-over something shows a tooltip about that feature', async function(assert) {
    this.server.create('layer', 1, {
      visible: true,
      highlightable: true,
      tooltipable: true,
      tooltipTemplate: '',
      id: 'visible-layer',
      style: {
        type: 'fill',
      },
    });
    this.layerGroups = await this.owner
      .lookup('service:store')
      .findAll('layer-group', { include: 'layers' });
    this.layerGroups.meta = this.meta;

    // this is a geometric test feature that is sent in response to
    // some given event, either click or mousemove, etc.
    const targetEventFeature = {
      type: 'Feature',
      properties: {
        bbl: '1', // expected in main-map click handler to route to a route id
        id: '1', // expected by addon dependency to "stitch" tiles
      },
      layer: {
        id: 'visible-layer', // expected by addon dependency for mapbox-gl lookups
      },
      geometry: null,
    };

    this.map.features = [targetEventFeature];

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        onPrint=(action (mut this.printSvc.enabled) true)
      }}
    `);

    await this.map.events.mousemove({
      point: { x: 0, y: 0 },
    });

    assert.ok(find('[data-test-tooltip="true"]'));
  });

  module('Component | main-map | lets you measure stuff', async function(hooksForMeasure) {
    hooksForMeasure.beforeEach(async function() {
      this.server.createList('layer-group', 10, 'hasLayers');
      this.layerGroups = await this.owner
        .lookup('service:store')
        .findAll('layer-group', { include: 'layers' });
      this.layerGroups.meta = this.meta;
    });

    test('it measures with line tool', async function(assert) {
      // these are the "drawn" features
      this.map.features = [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[0, 0], [1, 1]],
        },
      }];

      this.draw = {
        changeMode() {},
        deleteAll() {},
        getAll: () => ({ features: this.map.features }),
      };

      let lastSource = '';
      this.map = {
        ...this.map,
        addSource(source) {
          lastSource = source;
        },
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
          draw=this.draw
        }}
      `);

      await click('[data-test-button="begin-measure"]');

      await click('[data-test-button="measure-tool-line"]');

      await this.map.events['draw.create']();

      await this.map.events['draw.render']();

      // TODO: I believe the awaits before aren't working because
      // of the dynamic import of the measurement libs that
      // happens in the event callback... need to file bug
      await waitFor('[data-test-measure="value"]');

      const measurement = find('[data-test-measure="value"]').textContent.trim();

      assert.equal(measurement, '97.74 mi');

      // make sure the drawn source gets added to map
      assert.equal(lastSource, 'drawn-feature');

      await click('[data-test-button="measure-tool-close"]');
    });

    test('it measures with polygon tool', async function(assert) {
      // these are the "drawn" features
      this.map.features = [{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[[-74.000, 40.736], [-74.000, 40.729], [-73.991, 40.727], [-73.991, 40.736], [-74.000, 40.736]]],
        },
      }];

      this.draw = {
        changeMode() {},
        deleteAll() {},
        getAll: () => ({ features: this.map.features }),
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
          draw=this.draw
        }}
      `);

      await click('[data-test-button="begin-measure"]');

      await click('[data-test-button="measure-tool-polygon"]');

      await this.map.events['draw.create']();

      await this.map.events['draw.render']();

      await waitFor('[data-test-measure="value"]');

      const measurement = find('[data-test-measure="value"]').textContent.trim();

      assert.equal(measurement, '7,277,503 ft²');

      await click('[data-test-button="measure-tool-close"]');
    });

    test('it changes the measurement unit', async function(assert) {
      // these are the "drawn" features
      this.map.features = [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[0, 0], [1, 1]],
        },
      }];

      this.draw = {
        changeMode() {},
        deleteAll() {},
        getAll: () => ({ features: this.map.features }),
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
          draw=this.draw
        }}
      `);

      await click('[data-test-button="begin-measure"]');

      await click('[data-test-button="measure-tool-line"]');

      await this.map.events['draw.create']();

      await this.map.events['draw.render']();

      await waitFor('[data-test-measure="value"]');

      await click('[data-test-measure="unit-menu"]');

      await click('[data-tests-measure="unit-metric"]');

      await waitFor('[data-test-measure="value"]');

      const measurement = find('[data-test-measure="value"]').textContent.trim();

      assert.equal(measurement, '157.30 km');
    });
  });

  module('Integration | Component | main-map | it routes to specific resources correctly', function(subHooks) {
    subHooks.beforeEach(async function() {
      // generate mock layer for map
      this.server.create('layer', 1, { visible: true, clickable: true, id: 'visible-layer' });

      // setup the arguments that get passed into the component
      this.layerGroups = await this.owner
        .lookup('service:store')
        .findAll('layer-group', { include: 'layers' });
      this.layerGroups.meta = this.meta;

      // stubbed features that are "on the map"
      this.map.features = [{
        type: 'Feature',
        properties: {
          bbl: '1',
          id: '1',
        },
        layer: {
          id: 'visible-layer',
        },
        geometry: null,
      }];

      // stub the router service that gets injected into the component
      const testContext = this;
      class RouterServiceStub extends Service {
        transitionTo(...args) {
          testContext.transitionTo(...args);
        }
      }

      this.owner.unregister('service:router');
      this.owner.register('service:router', RouterServiceStub);
    });

    test('it routes to lot', async function(assert) {
      this.map.features[0].properties = {
        bbl: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.lot');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });

    test('it routes to zoning-map-amendment', async function(assert) {
      this.map.features[0].properties = {
        ulurpno: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.zoning-map-amendment');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });

    test('it routes to zoning-district', async function(assert) {
      this.map.features[0].properties = {
        zonedist: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.zoning-district');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });

    test('it routes to special-purpose-district', async function(assert) {
      this.map.features[0].properties = {
        sdlbl: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.special-purpose-district');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });

    test('it routes to special-purpose-subdistrict', async function(assert) {
      this.map.features[0].properties = {
        splbl: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.special-purpose-subdistrict');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });

    test('it routes to commercial-overlay', async function(assert) {
      this.map.features[0].properties = {
        overlay: '1',
      };

      this.transitionTo = function(route) {
        assert.equal(route, 'map-feature.commercial-overlay');
      };

      await render(hbs`
        {{main-map
          layerGroups=this.layerGroups
          layerGroupsMeta=this.meta
          bookmarks=this.bookmarks
          onPrint=(action (mut this.printSvc.enabled) true)
        }}
      `);

      await this.map.events.mousemove();
      await this.map.events.click();
    });
  });
});
