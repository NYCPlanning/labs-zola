import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route('lot', { path: 'lot/:boro/:block/:lot' });
  this.route('about');
  return null;
});

export default Router;
