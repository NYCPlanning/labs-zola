import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import sources from '../sources';
import carto from '../utils/carto';

export default Route.extend({
  mainMap: service(),

  beforeModel(transition) {
    // only transition to about if index is loaded and there is no hash
    if (transition.intent.url === '/' && window.location.href.split('#').length < 2) {
      this.transitionTo('about');
    }
  },

  model() {
    const cartoSourcePromises = Object.keys(sources)
      .filter(key => sources[key].type === 'cartovector')
      .map((key) => {
        const source = sources[key];
        const { minzoom = 0 } = source;

        return carto.getVectorTileTemplate(source['source-layers'])
          .then(template => ({
            id: source.id,
            type: 'vector',
            tiles: [template],
            minzoom,
          }));
      });

    return RSVP.hash({
      cartoSources: Promise.all(cartoSourcePromises),
      bookmarks: this.store.findAll('bookmark').then((bookmarks) => {
        bookmarks.invoke('get', 'bookmark');
        return bookmarks;
      }),
    });
  },

  afterModel() {
    this.get('mainMap').resetBounds();
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
