import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  urlForFindAll() {
    return '/layer-groups.json';
  },
});
