import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import config from 'labs-zola/config/environment';

const { defaultLayerGroupState } = config;

export default Route.extend({
  mainMap: service(),

  beforeModel(transition) {
    const { targetName } = transition;

    // only transition to about if target is index
    if (targetName === 'index') {
      const { hash } = window.location;

      // preserve hash token so it's applied across transitions
      if (hash) {
        this.mainMap.set('knownHashIntent', hash);
      }

      this.transitionTo(`/about${transition.intent.url}`);
    }

    if (targetName === 'lot') {
      this.set('mainMap.routeIntentIsNested', true);
    }
  },

  async model() {
    const { layerGroups: layerGroupsParams } = this.paramsFor('application');

    // fetch layer groups based on configured environment variable
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': defaultLayerGroupState,
    });

    // get the params and override the layer group state up-front
    layerGroups.forEach((grp) => {
      const newGroup = grp;
      newGroup.set('visible', layerGroupsParams.includes(newGroup.id));
    });

    // extract the meta node, see ember-data & json:api
    const { meta } = layerGroups;

    // pass down a hash representation of the layer group ids
    const layerGroupsObject = layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    const bookmarks = await this.store.findAll('bookmark');

    await bookmarks.invoke('get', 'bookmark');

    return {
      layerGroups,
      layerGroupsObject,
      meta,
      bookmarks,
    };
  },
});
