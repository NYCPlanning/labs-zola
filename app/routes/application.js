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
        { id: 'tax-lots' },
        { id: 'zoning-districts' },
        { id: 'commercial-overlays' },
        { id: 'amendments' },
        { id: 'amendments-pending' },
        { id: 'special-purpose-districts' },
        { id: 'limited-height-districts' },
        { id: 'mandatory-inclusionary-housing' },
        { id: 'inclusionary-housing' },
        { id: 'transit-zones' },
        { id: 'fresh' },
        { id: 'sidewalk-cafes' },
        { id: 'low-density-growth-mgmt-areas' },
        { id: 'coastal-zone-boundary' },
        { id: 'waterfront-access-plan' },
        { id: 'historic-districts' },
        { id: 'landmarks' },
        { id: 'floodplain-efirm2007' },
        { id: 'floodplain-pfirm2015' },
        { id: 'e-designations' },
        { id: 'appendixj-designated-mdistricts' },
        { id: 'business-improvement-districts' },
        { id: 'industrial-business-zones' },
        { id: 'boroughs' },
        { id: 'community-districts' },
        { id: 'nyc-council-districts' },
        { id: 'ny-senate-districts' },
        { id: 'assembly-districts' },
        { id: 'neighborhood-tabulation-areas' },
        { id: 'subway' },
        { id: 'building-footprints' },
        { id: 'three-d-buildings' },
        { id: 'aerials' },
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
