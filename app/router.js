import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import trackPage from './mixins/track-page';

const Router = EmberRouter.extend(trackPage, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {// eslint-disable-line
  // first class layer group routes


  // supplementary navigation routes
  this.route('bbox', { path: 'bbox/:west/:south/:east/:north' });
  this.route('bbl', { path: 'bbl/:bbl' });

  // regular metadata routes
  this.route('about');
  this.route('bookmarks');
  this.route('data');
  this.route('features');

  // generic route for "second class" layer group views
  this.route('map-feature', { path: '/l' }, function() {
    this.route('zoning-district', { path: '/zoning-district/:id' });
    this.route('commercial-overlay', { path: '/commercial-overlay/:id' });
    this.route('special-purpose-district', { path: '/special-purpose-district/:id' });
    this.route('special-purpose-subdistrict', { path: '/special-purpose-subdistrict/:id' });
    this.route('zoning-map-amendment', { path: '/zma/:id' });
    this.route('lot', { path: 'lot/:boro/:block/:lot' });
  });

  // in order to namespace the map feature routes (zoning district, etc), we have
  // to preserve functionality of old hyperlinks. this route redirects old
  // hyperlinks to to the new route, which is namespaced with `/l`
  this.route('legacy-redirects', { path: '/commercial-overlay/:option_a' });
  this.route('legacy-redirects', { path: '/zoning-district/:option_a' });
  this.route('legacy-redirects', { path: '/special-purpose-district/:id' });
  this.route('legacy-redirects', { path: '/special-purpose-subdistrict/:id' });
  this.route('legacy-redirects', { path: '/zoning-map-amendment/:id' });
  this.route('legacy-redirects', { path: '/lot/:boro/:block/:lot' });
});

export default Router;
