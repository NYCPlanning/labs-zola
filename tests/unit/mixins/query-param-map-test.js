import EmberObject from '@ember/object';
import QueryParamMapMixin from 'labs-zola/mixins/query-param-map';
import { module, test } from 'qunit';

module('Unit | Mixin | query param map');

// Replace this with your real tests.
test('it works', function(assert) {
  let QueryParamMapObject = EmberObject.extend(QueryParamMapMixin);
  let subject = QueryParamMapObject.create();
  assert.ok(subject);
});
