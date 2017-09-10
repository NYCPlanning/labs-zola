import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('visiting home', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
