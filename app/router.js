import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import trackPage from './mixins/track-page';

const Router = EmberRouter.extend(trackPage, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () { // eslint-disable-line
  // first class layer group routes
  this.route('lot', { path: 'lot/:boro/:block/:lot' });

  // supplementary navigation routes
  this.route('bbox', { path: 'bbox/:west/:south/:east/:north' });
  this.route('bbl', { path: 'bbl/:bbl' });

  // generic route for "second class" layer group views
  this.route('layer-group', { path: '/:type/:id' });

  // regular metadata routes
  this.route('about');
  this.route('bookmarks');
  this.route('data');
  this.route('features');
});

export default Router;
