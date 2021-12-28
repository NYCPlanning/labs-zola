import DS from 'ember-data';

export default DS.Model.extend({
  meta: DS.attr({
    defaultValue: () => ({}),
  }),
  minzoom: DS.attr('number'),
});
