import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Route.extend({
  mainMap: service(),

  beforeModel(transition) {
    // only transition to about if index is loaded and there is no hash
    if (transition.intent.url === '/' && window.location.href.split('#').length < 2) {
      this.transitionTo('about');
    }
  },

  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        'tax-lots',
        'zoning-districts',
        'commercial-overlays',
        'amendments',
        'amendments-pending',
        'special-purpose-districts',
        'limited-height-districts',
        'mandatory-inclusionary-housing',
        'inclusionary-housing',
        'transit-zones',
        'fresh',
        'sidewalk-cafes',
        'low-density-growth-mgmt-areas',
        'coastal-zone-boundary',
        'waterfront-access-plan',
        'historic-districts',
        'landmarks',
        'floodplain-efirm2007',
        'floodplain-pfirm2015',
        'e-designations',
        'appendixj-designated-mdistricts',
        'business-improvement-districts',
        'industrial-business-zones',
        'boroughs',
        'community-districts',
        'nyc-council-districts',
        'ny-senate-districts',
        'assembly-districts',
        'neighborhood-tabulation-areas',
        'subway',
        'building-footprints',
        'three-d-buildings',
        'aerials',
      ],
    });
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
      meta,
      bookmarks,
    };
  },

  afterModel() {
    this.mainMap.resetBounds();
  },
});

Route.reopen({
  activate() {
    const cssClass = this.toCssClass();
    if (cssClass !== 'application') {
      $('body').addClass(cssClass);
    }
  },
  deactivate() {
    $('body').removeClass(this.toCssClass());
  },
  toCssClass() {
    return this.routeName.replace(/\./g, '-').dasherize();
  },
});
