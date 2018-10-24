import Component from '@ember/component';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class MyComponent extends Component {
  @service
  mainMap

  @service
  mapMouseover

  mouseEnter() {
    const bbl = this.get('lot.bookmark.bbl');
    const map = this.mainMap.mapInstance;

    const feature = map.querySourceFeatures('pluto', {
      sourceLayer: 'pluto',
      filter: ['==', 'bbl', bbl],
    })[0];

    this.set('mapMouseover.highlightedLotFeatures', [feature]);
  }

  mouseLeave() {
    this.set('mapMouseover.highlightedLotFeatures', []);
  }

  @action
  deleteBookmark(e) {
    this.deleteBookmark(e);
  }
}
