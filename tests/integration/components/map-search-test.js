import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const TEST_DATA = [{ type: 'lot', address: '120 Broadway' }, { type: 'lot', address: '1120 Broadway' }];

moduleForComponent('map-search', 'Integration | Component | map search', {
  integration: true,
});

const triggerKey = function(key) {
  const e = this.$().Event("keyup");
  e.which = key;
  e.keyCode = key;
  this.$('input').trigger(e);
};

test('it renders', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-search}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it shows results', function (assert) {
  this.setProperties({
    searchTerms: '120 Broadway',
    results: TEST_DATA,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms}}`);

  assert.equal(this.$('.search-results').children().length, 2);
});

test('it keys down', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.setProperties({
    searchTerms: '120 Broadway',
    results: TEST_DATA,
    selected: 1,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);

  assert.equal(this.$('.highlighted-result').text().trim(), '1120 Broadway (Lot)');
});

test('it keys up', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-search}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it enters', function (assert) {
  this.setProperties({
    searchTerms: '120 Broadway',
    results: TEST_DATA,
  });

  this.render(hbs`{{map-search searchTerms=searchTerms results=results}}`);

  assert.equal(this.$('.highlighted-result').text().trim(), '120 Broadway (Lot)');
});

test('it says loading when loading', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-search}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it says no results when no results', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{map-search}}`);

  assert.equal(this.$().text().trim(), '');
});
