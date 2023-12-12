import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  bookmark: belongsTo({ polymorphic: true }),
});
