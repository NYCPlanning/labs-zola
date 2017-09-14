import sqlBuilder from 'labs-zola/utils/sql-builder';
import { module, test } from 'qunit';

module('Unit | Utility | sql builder');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = new sqlBuilder('id', 'table');
  assert.ok(result);
});
