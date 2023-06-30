import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | print-view-controls', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.printSvc = this.owner.lookup('service:print');
    await render(hbs`{{print-view-controls printSvc=this.printSvc}}`);
    assert.ok(true);
  });

  test('it renders with default state', async function(assert) {
    this.printSvc = this.owner.lookup('service:print');
    await render(hbs`{{print-view-controls printSvc=this.printSvc}}`);

    assert.ok(!find('[data-test-print-control="landscape"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="portrait"] .a11y-orange'));

    assert.ok(find('[data-test-print-control="letter"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="legal"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="tabloid"] .a11y-orange'));

    assert.ok(find('[data-test-print-control="map"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="legend"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="content"] .a11y-orange'));
  });

  test('it changes orientation', async function(assert) {
    this.printSvc = this.owner.lookup('service:print');
    await render(hbs`{{print-view-controls printSvc=this.printSvc}}`);

    await click('[data-test-print-control="landscape"]');

    assert.ok(find('[data-test-print-control="landscape"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="portrait"] .a11y-orange'));

    await click('[data-test-print-control="portrait"]');

    assert.ok(!find('[data-test-print-control="landscape"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="portrait"] .a11y-orange'));
  });

  test('it changes size', async function(assert) {
    this.printSvc = this.owner.lookup('service:print');
    await render(hbs`{{print-view-controls printSvc=this.printSvc}}`);
    await click('[data-test-print-control="legal"]');

    assert.ok(!find('[data-test-print-control="letter"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="legal"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="tabloid"] .a11y-orange'));

    await click('[data-test-print-control="tabloid"]');

    assert.ok(!find('[data-test-print-control="letter"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="legal"] .a11y-orange'));
    assert.ok(find('[data-test-print-control="tabloid"] .a11y-orange'));

    await click('[data-test-print-control="letter"]');

    assert.ok(find('[data-test-print-control="letter"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="legal"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="tabloid"] .a11y-orange'));
  });

  test('it changes what to show and hide', async function(assert) {
    this.printSvc = this.owner.lookup('service:print');
    await render(hbs`{{print-view-controls printSvc=this.printSvc}}`);

    await click('[data-test-print-control="map"]');

    assert.ok(!find('[data-test-print-control="map"] .a11y-orange'));
    assert.ok(!find('[data-test-print-control="legend"] .a11y-orange'));

    await click('[data-test-print-control="map"]');

    await click('[data-test-print-control="legend"]');

    assert.ok(!find('[data-test-print-control="legend"] .a11y-orange'));

    await click('[data-test-print-control="content"]');

    assert.ok(!find('[data-test-print-control="content"] .a11y-orange'));
  });
});
