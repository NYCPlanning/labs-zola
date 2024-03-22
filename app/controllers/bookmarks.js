/* eslint-disable no-unused-expressions */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed as computedProp } from '@ember/object';
import { Promise } from 'rsvp';

export default Controller.extend({
  mainMap: service(),
  metrics: service(),
  router: service(),

  savedLayerSets: window.localStorage['saved-layer-sets']
    ? JSON.parse(window.localStorage['saved-layer-sets'])
    : [],

  editMode: false,

  // because we must compute the record types based on multiple
  // promises, the model uses Promise.all
  // this gets us in trouble when we need to do
  // aggregate operations (like filtering)

  bookmarksSettled: computedProp('model.[]', function () {
    const bookmarks = this.model;
    const promises = bookmarks.mapBy('recordType');

    return Promise.all(promises);
  }),

  actions: {
    flyTo(center = [0, 0]) {
      const mapInstance = this.get('mainMap.mapInstance');
      mapInstance.flyTo({
        center,
        zoom: 15,
      });
    },

    bookmarkCurrentLayerSet() {
      let allLayers = [];
      const visibleLayers = [];
      const visibleLayerGroups = [];
      this.router.currentRoute.parent.attributes.layerGroups.forEach((lg) => {
        allLayers = allLayers.concat(lg.layers);
        lg.visible ? visibleLayerGroups.push(lg.id) : null;
      });
      allLayers.forEach((layer) => {
        layer.visibility ? visibleLayers.push(layer.id) : null;
      });

      const layerSet = {
        id: crypto.randomUUID(),
        name: 'New Saved Layer Set',
        visibleLayers,
        visibleLayerGroups,
      };
      this.set('savedLayerSets', [...this.savedLayerSets, layerSet]);
      window.localStorage['saved-layer-sets'] = JSON.stringify(
        this.savedLayerSets
      );
    },

    deleteBookmarkedLayerSettings(id) {
      this.set(
        'savedLayerSets',
        [...this.savedLayerSets].filter((lg) => lg.id !== id)
      );
      window.localStorage['saved-layer-sets'] = JSON.stringify(
        this.savedLayerSets
      );
    },

    updateBookmarkedLayerSettings(id) {
      const newLayerSets = [...this.savedLayerSets];
      const updatedLayerSetIndex = newLayerSets.findIndex((lg) => lg.id === id);
      newLayerSets[updatedLayerSetIndex].name =
        document.getElementById('name').value;
      this.set('savedLayerSets', newLayerSets);
      window.localStorage['saved-layer-sets'] = JSON.stringify(
        this.savedLayerSets
      );
      this.set('editMode', false);
      // without the below, the name won't update in the dom
      setTimeout(function () {
        document.getElementById(id).innerText =
          newLayerSets[updatedLayerSetIndex].name;
      }, 1);
    },

    turnOnEditMode(id) {
      this.set('editMode', id);
    },

    loadBookmarkedLayerSettings(bookmarkId) {
      const layerToLoad = this.savedLayerSets.find(
        (lg) => bookmarkId === lg.id
      );
      const layerGroups = [
        ...this.router.currentRoute.parent.attributes.layerGroups,
      ];
      layerGroups.forEach((lg) => {
        lg.visible = !!layerToLoad.visibleLayerGroups.includes(lg.id);
        lg.layers.forEach((layer) => {
          layer.visibility = !!layerToLoad.visibleLayers.includes(layer.id);
        });
      });
    },
  },
});
