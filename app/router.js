import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import trackPage from './mixins/track-page';

const Router = EmberRouter.extend(trackPage, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {// eslint-disable-line
  // first class layer group routes
  this.route('lot', { path: 'lot/:boro/:block/:lot' });

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
  });

  this.route('legacy-redirects', { path: '/:type/:option_a' });
});

export default Router;
