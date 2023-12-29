import { Model, hasMany } from 'miragejs';

export default Model.extend({
  layers: hasMany(),
});
