import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  bookmark: belongsTo({ polymorphic: true }),
});
