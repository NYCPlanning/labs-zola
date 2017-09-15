import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const TEST_DATA = [{ type: 'lot', address: '120 Broadway' }, { type: 'lot', address: '1120 Broadway' }, { type: 'address', address: '1234 Street Ave'}];
const MOCK_TASK_STRUCTURE_DATA = { value: TEST_DATA };

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
    results: MOCK_TASK_STRUCTURE_DATA,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms}}`);
  assert.equal(this.$('.search-results .result').length, 3);
});

test('it keys down', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.setProperties({
    searchTerms: '120 Broadway',
    results: MOCK_TASK_STRUCTURE_DATA,
    selected: 0,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
  this.set('selected', 1);
  assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('1120 Broadway')+2), true);
});

test('it keys up', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.setProperties({
    searchTerms: '120 Broadway',
    results: MOCK_TASK_STRUCTURE_DATA,
    selected: 0,
  });

  this.render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
  this.set('selected', 1);
  this.set('selected', 0);
  assert.equal(!!(this.$('.highlighted-result').text().trim().indexOf('120 Broadway')+2), true);
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
    results: { value: []},
    resultsCount: 0,
  });
  this.render(hbs`{{map-search searchTerms=searchTerms results=results resultsCount=resultsCount}}`);

  assert.equal(!!(this.$().text().trim().indexOf('No Results Found')+1), true);
});
