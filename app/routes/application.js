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
    const layerGroups = await this.store.query('layer-group', {});
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
