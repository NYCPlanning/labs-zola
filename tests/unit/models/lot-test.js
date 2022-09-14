import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Unit | Model | lot', function(hooks) {
  setupTest(hooks);
  setupMirage(hooks);

  test('it generates correct links: BISWEB', async function(assert) {
    this.server.create('lot', {
      properties: {
        cd: '1',
        block: '1',
        lot: '1',
        borocode: '1',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.biswebLink, 'http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet?allborough=1&allblock=1&alllot=1&go5=+GO+&requestid=0');
  });

  test('it generates correct links: Community Profiles', async function(assert) {
    this.server.create('lot', {
      properties: {
        cd: '104',
        block: '1',
        lot: '1',
        borocode: '1',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.fullCommunityDistrictURL, 'https://communityprofiles.planning.nyc.gov/manhattan/4');
  });

  test('it generates correct links: Zoning District Tag Links', async function(assert) {
    this.server.create('lot', {
      properties: {
        zonedist1: 'R8B',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.zoneDistLinks.primaryzone1, 'https://www1.nyc.gov/site/planning/zoning/districts-tools/r8.page');
  });

  test('it generates correct links: Digital Tax Map', async function(assert) {
    this.server.create('lot', {
      id: 1007650065,
      properties: {
        bbl: 1007650065,
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1007650065);

    assert.equal(model.properties.digitalTaxMapLink, 'http://maps.nyc.gov/taxmap/map.htm?searchType=BblSearch&featureTypeName=EVERY_BBL&featureName=1007650065');
  });

  test('it generates correct links: Zoning Map', async function(assert) {
    this.server.create('lot', {
      id: 1,
      properties: {
        zonemap: '8d',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.zoningMapLink, 'http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/map8d.pdf');
  });

  test('it generates correct links: Historical Zoning Map', async function(assert) {
    this.server.create('lot', {
      id: 1,
      properties: {
        zonemap: '8d',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.historicalZoningMapLink, 'http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/historical-zoning-maps/maps08d.pdf');
  });

  test('it generates correct links: ACRIS', async function(assert) {
    this.server.create('lot', {
      id: 1,
      properties: {
        cd: '104',
        block: '1',
        lot: '1',
        borocode: '1',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.ACRISLink, 'http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=1&block=1&lot=1');
  });

  test('it generates correct links: Housing Info Link', async function(assert) {
    this.server.create('lot', {
      id: 1,
      properties: {
        cd: '104',
        address: '123 street',
        street: 'street',
        borocode: '1',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.housingInfoLink, 'https://hpdonline.hpdnyc.org/Hpdonline/Provide_address.aspx?p1=1&p2=123&p3=street&SearchButton=Search');
  });


  test('it generates correct links: Council', async function(assert) {
    this.server.create('lot', {
      id: 1,
      properties: {
        council: 'peanut-butter',
      },
    });

    const model = await this.owner.lookup('service:store')
      .findRecord('lot', 1);

    assert.equal(model.properties.councilLink, 'https://council.nyc.gov/district-peanut-butter/');
  });
});
