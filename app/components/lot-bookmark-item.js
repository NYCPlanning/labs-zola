import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  mainMap: service(),
  mapMouseover: service(),

  mouseEnter() {
    const bbl = this.get('lot.bookmark.bbl');
    const map = this.get('mainMap').mapInstance;

    const feature = map.querySourceFeatures('pluto', {
      sourceLayer: 'pluto',
      filter: ['==', 'bbl', bbl],
    })[0];

    this.set('mapMouseover.highlightedLotFeatures', [feature]);
  },

  mouseLeave() {
    this.set('mapMouseover.highlightedLotFeatures', []);
  },

  actions: {
    deleteBookmark(e) {
      this.attrs.deleteBookmark(e);
    },
  },
});
