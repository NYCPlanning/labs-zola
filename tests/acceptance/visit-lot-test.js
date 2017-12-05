import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visit lot');

test('visiting a lot', function(assert) {
  visit('/lot/1/1632/1');

  andThen(function() {
    assert.notEqual(find('.content-area').text().length, 0);
  });
});

test('visiting a bbl', function(assert) {
  visit('/bbl/1001870021');

  andThen(function() {
    assert.equal(currentURL(), '/lot/1/187/21');
    assert.notEqual(find('.content-area').text().length, 0);
  });
});
