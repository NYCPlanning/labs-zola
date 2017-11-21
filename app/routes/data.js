import Ember from 'ember';
import layerGroups from '../layer-groups';

export default Ember.Route.extend({
  model() {
    return Object.keys(layerGroups).map(key => layerGroups[key]);
  },
});
