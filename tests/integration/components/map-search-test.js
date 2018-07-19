import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find, pauseTest } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const TEST_DATA = [{ type: 'lot', address: '120 Broadway' }, { type: 'lot', address: '1120 Broadway' }, { type: 'address', address: '1234 Street Ave'}];
const MOCK_TASK_STRUCTURE_DATA = { value: TEST_DATA };

module('Integration | Component | map search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{map-search}}`);

    assert.equal(find('*').textContent.trim(), '');
  });

  test('it shows results', async function(assert) {
    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA,
    });

    await render(hbs`{{map-search results=results searchTerms=searchTerms}}`);
    assert.equal(findAll('.search-results .result').length, 3);
  });

  test('it keys down', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA,
      selected: 0,
    });

    await render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
    await this.set('selected', 1);
    const result = await find('.highlighted-result');

    assert.equal(!!(result.textContent.trim().indexOf('1120 Broadway')+2), true);
  });

  test('it keys up', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.setProperties({
      searchTerms: '120 Broadway',
      results: MOCK_TASK_STRUCTURE_DATA,
      selected: 0,
    });

    await render(hbs`{{map-search results=results searchTerms=searchTerms selected=selected}}`);
    this.set('selected', 1);
    this.set('selected', 0);
    assert.equal(!!(find('.highlighted-result').textContent.trim().indexOf('120 Broadway')+2), true);
  });

  skip('it says loading when loading', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.setProperties({
      searchTerms: '120 Broadway',
    });
    await render(hbs`{{map-search searchTerms=searchTerms}}`);
    assert.equal(find('.search-results--loading').textContent.trim(), 'Loading...');
  });

  test('it says no results when no results', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.setProperties({
      searchTerms: '120 Broadway Street, Tulsa, OK',
      results: { value: []},
      resultsCount: 0,
    });
    await render(hbs`{{map-search searchTerms=searchTerms results=results resultsCount=resultsCount}}`);

    assert.equal(!!(find('*').textContent.trim().indexOf('No Results Found')+1), true);
  });
});
