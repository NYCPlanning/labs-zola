import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  mainMap: service(),
  layerGroupService: service('layerGroups'),

  beforeModel({ targetName }) {
    // only transition to about if index is loaded and there is no hash
    if (targetName === 'index') {
      this.transitionTo('about');
    }

    if (targetName === 'lot') {
      this.set('mainMap.routeIntentIsNested', true);
    }
  },

  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        { id: 'zoning-districts', visible: true },
        { id: 'tax-lots', visible: true, layers: [{ tooltipable: true }] },
        { id: 'commercial-overlays', visible: true },
        { id: 'zoning-map-amendments', visible: false },
        { id: 'zoning-map-amendments-pending', visible: false },
        { id: 'special-purpose-districts', visible: false, layers: [{}, { clickable: true, highlightable: true }] },
        { id: 'special-purpose-subdistricts', visible: false },
        { id: 'limited-height-districts', visible: false },
        { id: 'mandatory-inclusionary-housing', visible: false },
        { id: 'inclusionary-housing', visible: false },
        { id: 'transit-zones', visible: false },
        { id: 'fresh', visible: false },
        { id: 'sidewalk-cafes', visible: false },
        { id: 'low-density-growth-mgmt-areas', visible: false },
        { id: 'coastal-zone-boundary', visible: false },
        { id: 'waterfront-access-plan', visible: false },
        { id: 'historic-districts', visible: false },
        { id: 'landmarks', visible: false },
        { id: 'floodplain-efirm2007', visible: false },
        { id: 'floodplain-pfirm2015', visible: false },
        { id: 'e-designations', visible: false },
        { id: 'appendixj-designated-mdistricts', visible: false },
        { id: 'business-improvement-districts', visible: false },
        { id: 'industrial-business-zones', visible: false },
        { id: 'boroughs', visible: false },
        { id: 'community-districts', visible: false },
        { id: 'nyc-council-districts', visible: false },
        { id: 'ny-senate-districts', visible: false },
        { id: 'assembly-districts', visible: false },
        { id: 'neighborhood-tabulation-areas', visible: false },
        { id: 'subway', visible: true },
        { id: 'building-footprints', visible: true },
        { id: 'three-d-buildings', visible: false },
        { id: 'aerials', visible: false },
      ],
    });

    const defaultVisibleLayerGroups = layerGroups.filterBy('visible').mapBy('id').sort();

    const layerGroupsObject = layerGroups.reduce(
      (accumulator, current) => {
        accumulator[current.get('id')] = current;
        return accumulator;
      },
      {},
    );

    const { meta } = layerGroups;

    const bookmarks = await this.store.findAll('bookmark').then((models) => {
      models.invoke('get', 'bookmark');
      return models;
    });

    return {
      layerGroups,
      layerGroupsObject,
      defaultVisibleLayerGroups,
      meta,
      bookmarks,
    };
  },

  setupController(controller, model) {
    this._super(controller, model);

    const { layerGroups } = model;
    const layerGroupParams = controller.get('layerGroups');

    if (typeof layerGroupParams === 'string') {
      controller.set('layerGroups', JSON.parse(layerGroupParams));
    }

    this.get('layerGroupService').initializeObservers(layerGroups, controller);
  },
});
