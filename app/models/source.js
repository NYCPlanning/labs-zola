import Model, { attr } from '@ember-data/model';

export default Model.extend({
  meta: attr(),
  minzoom: attr('number'),
});
