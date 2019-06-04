import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, settled, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';
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
    this.bookmarks = [];
    this.print = false;
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
        print=this.print
      }}
    `);

    // await pauseTest();

    assert.ok(find("[data-test-main-map='loaded']"));
  });

  test('it lets you click a visible feature and calls an action when clicked', async function(assert) {
    // setup layer group, one clickable, to handle a click for interactive layer-group
    this.server.create('layer', 1, { visible: true, clickable: true, id: 'visible-layer' });
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

    // mapbox-gl instance mock
    this.map = {
      ...this.map,
      querySourceFeatures: () => [targetEventFeature], // addon dependency
      queryRenderedFeatures: () => [targetEventFeature], // addon dependency
    };

    // callback action with assertions to show that a click event
    // produces the desired effect
    this.transitionTo = function(route, id) {
      assert.equal(route, 'lot');
      assert.equal(id, '1');
    };

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        print=this.print
        transitionTo=(action transitionTo)
      }}
    `);

    this.map.events.mousemove({ features: [targetEventFeature] });
    await settled();

    this.map.events.click({ features: [targetEventFeature] });
    await settled();
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

    // mapbox-gl instance mock
    this.map = {
      ...this.map,
      querySourceFeatures: () => [targetEventFeature], // addon dependency
      queryRenderedFeatures: () => [targetEventFeature], // addon dependency
    };

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        print=this.print
      }}
    `);

    // this is the key mapbox-gl function that gets called to toggle
    // the visibility of the generic mapbox-gl-layer that's used to
    // represent the highlighted feature
    let args = [];
    this.map.setLayoutProperty = function(id, key, value) {
      args = [id, key, value];
    };

    this.map.events.mousemove({ features: [targetEventFeature] });
    await settled();

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

    // mapbox-gl instance mock
    this.map = {
      ...this.map,
      querySourceFeatures: () => [targetEventFeature], // addon dependency
      queryRenderedFeatures: () => [targetEventFeature], // addon dependency
    };

    await render(hbs`
      {{main-map
        layerGroups=this.layerGroups
        layerGroupsMeta=this.meta
        bookmarks=this.bookmarks
        print=this.print
      }}
    `);

    this.map.events.mousemove({
      features: [targetEventFeature],
      point: { x: 0, y: 0 },
    });
    await settled();

    assert.ok(find('[data-test-tooltip="true"]'));
  });

  skip('let’s you measure stuff', function(assert) {
    assert.ok(false);
  });

  skip('let’s you click print for a print view', function(assert) {
    assert.ok(false);
  });

  // skip('displays layers in order according to the layer-group configuration provided', function(assert) {
  //   assert.ok(false);
  // });
});
