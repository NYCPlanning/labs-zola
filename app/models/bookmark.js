import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  type: attr('string'),
  record_id: attr('number'),
});
