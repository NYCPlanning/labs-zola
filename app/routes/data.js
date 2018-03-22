import Route from '@ember/routing/route';
import layerGroups from '../layer-groups';

export default Route.extend({
  model() {
    return Object.keys(layerGroups).map(key => layerGroups[key]);
  },
});
