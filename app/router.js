import EmberRouter from '@ember/routing/router';
import { inject as service } from '@ember/service';
import config from './config/environment';
import trackPage from './mixins/track-page';


const Router = EmberRouter.extend(trackPage, {
  mainMap: service(),

  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    // hack and a half: if the map exists, change it's zoom level by an unnoticable amount
    // this will make mapboxgl put the viewport hash back in the current url
    const map = this.get('mainMap.mapInstance');
    if (map) map.flyTo({ zoom: map.getZoom() + 0.001 });

    this._super();
  },
});

Router.map(function () { // eslint-disable-line
  this.route('lot', { path: 'lot/:boro/:block/:lot' });
  this.route('bbox', { path: 'bbox/:west/:south/:east/:north' });
  this.route('zma', { path: 'zma/:ulurpno' });
  this.route('bbl', { path: 'bbl/:bbl' });
  this.route('zoning-district', { path: 'zoning-district/:zonedist' });
  this.route('special-purpose-district', { path: 'special-purpose-district/:id' });
  this.route('special-purpose-subdistricts', { path: 'special-purpose-subdistrict/:id' });
  this.route('commercial-overlay', { path: 'commercial-overlay/:id' });
  this.route('about');
  this.route('bookmarks');
  this.route('data');
  this.route('features');
});

export default Router;
