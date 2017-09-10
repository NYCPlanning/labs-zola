import { test } from 'qunit';
import moduleForAcceptance from 'labs-zola/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | visit lot');

test('visiting a lot', function(assert) {
  visit('/lot/1/1632/1');

  andThen(function() {
    assert.notEqual(find('.content-area').text().length, 0);
  });
});
