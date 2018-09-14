import DS from 'ember-data';

export default DS.Model.extend({
  meta: DS.attr(),
  minzoom: DS.attr('number'),
});
