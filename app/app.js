import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import Resolver from './resolver';
import config from './config/environment';

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

Ember.MODEL_FACTORY_INJECTIONS = true;

loadInitializers(App, config.modulePrefix);

export default App;
