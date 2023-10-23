import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module(
  'Integration | Component | layer-record-views/tax-lot',
  function (hooks) {
    setupRenderingTest(hooks);
    setupMirage(hooks);

    hooks.beforeEach(function () {
      this.record = {
        address: '120 BROADWAY',
        bbl: 1000477501,
        bldgclass: 'RB',
        block: 47,
        borough: 'MN',
        borocode: 1,
        cd: 101,
        council: 1,
        histdist: 'Individual Landmark',
        landmark: 'INDIVIDUAL LANDMARK',
        landuse: '05',
        lot: 7501,
        overlay1: null,
        overlay2: null,
        spdist1: 'LM',
        spdist2: null,
        spdist3: null,
        yearalter2: 0,
        zipcode: 10271,
        zonedist1: 'C5-5',
        zonedist2: null,
        zonedist3: null,
        zonedist4: null,
        zonemap: '12b',
        id: 1000477501,
      };
    });

    test('it renders', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.ok(this.element);
    });

    test('it generates correct links: BISWEB', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-bisweb-link]').getAttribute('href'),
        'http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet?allborough=1&allblock=47&alllot=7501&go5=+GO+&requestid=0'
      );
    });

    test('it generates correct links: Community Profiles', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-full-cd-url]').getAttribute('href'),
        'https://communityprofiles.planning.nyc.gov/manhattan/1'
      );
    });

    test('it generates correct links: Zoning District Tag Links', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-zone-dist-link]').getAttribute('href'),
        'https://www1.nyc.gov/site/planning/zoning/districts-tools/c5.page'
      );
    });

    test('it generates correct links: Digital Tax Map', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-tax-map-link]').getAttribute('href'),
        'http://maps.nyc.gov/taxmap/map.htm?searchType=BblSearch&featureTypeName=EVERY_BBL&featureName=1000477501'
      );
    });

    test('it generates correct links: Zoning Map', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-zoning-map-link]').getAttribute('href'),
        'https://s-media.nyc.gov/agencies/dcp/assets/files/pdf/zoning/zoning-maps/map12b.pdf'
      );
    });

    test('it generates correct links: Historical Zoning Map', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-historical-zoning-map-link]').getAttribute('href'),
        'https://s-media.nyc.gov/agencies/dcp/assets/files/pdf/zoning/zoning-maps/maps12b.pdf'
      );
    });

    test('it generates correct links: ACRIS', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-acris-link]').getAttribute('href'),
        'http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=1&block=47&lot=7501'
      );
    });

    test('it generates correct links: Housing Info Link', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-housing-info-link]').getAttribute('href'),
        'https://hpdonline.nyc.gov/hpdonline/'
      );
    });

    test('it generates correct links: Council', async function (assert) {
      await render(hbs`<LayerRecordViews::TaxLot
    @model={{this.record}} />`);

      assert.equal(
        find('[data-test-council-link]').getAttribute('href'),
        'https://council.nyc.gov/district-1/'
      );
    });
  }
);
