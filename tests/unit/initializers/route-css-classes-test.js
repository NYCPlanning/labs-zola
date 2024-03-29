import Application from '@ember/application';

import { initialize } from 'labs-zola/initializers/route-css-classes';
import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Initializer | route-css-classes', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.TestApplication = Application.extend();
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize,
    });

    this.application = this.TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function () {
    run(this.application, 'destroy');
  });

  // Replace this with your real tests.
  skip('it works', async function (assert) {
    await this.application.boot();

    assert.ok(true);
  });
});
