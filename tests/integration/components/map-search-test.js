import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const TEST_DATA = [{ type: 'lot', address: '120 Broadway' }, { type: 'lot', address: '1120 Broadway' }];

moduleForComponent('map-search', 'Integration | Component | map search', {
  integration: true,
});

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
    selected: 0,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
  this.set('selected', 1);
  assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('1120 Broadway')+1), true);
});

test('it keys up', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.setProperties({
    searchTerms: '120 Broadway',
    results: TEST_DATA,
    selected: 0,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
  this.set('selected', 1);
  this.set('selected', 0);
  assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('120 Broadway')+1), true);
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
  this.setProperties({
    searchTerms: '120 Broadway',
  });
  this.render(hbs`{{map-search searchTerms=searchTerms}}`);
  assert.equal(this.$('.search-results--loading').text().trim(), 'Loading...');
});

test('it says no results when no results', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.setProperties({
    searchTerms: '120 Broadway Street, Tulsa, OK',
    results: [],
    resultsCount: 0,
  });
  this.render(hbs`{{map-search searchTerms=searchTerms results=results resultsCount=resultsCount}}`);

  assert.equal(!!(this.$().text().trim().indexOf('No Results Found')+1), true);
});
