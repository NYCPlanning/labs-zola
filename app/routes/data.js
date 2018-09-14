import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const { layerGroups } = this.modelFor('application');
    return layerGroups.toArray();
  },
});
