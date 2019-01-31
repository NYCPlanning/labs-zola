import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import trackPage from './mixins/track-page';

const Router = EmberRouter.extend(trackPage, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () { // eslint-disable-line
  this.route('lot', { path: 'lot/:boro/:block/:lot' });
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
