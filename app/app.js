import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import defineModifier from 'ember-concurrency-retryable/define-modifier';
import config from 'labs-zola/config/environment';

// necessary for applying e-concurrency extensions
// to their decorators
// see: https://github.com/maxfierke/ember-concurrency-retryable/issues/5
defineModifier();

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

Ember.MODEL_FACTORY_INJECTIONS = true;

loadInitializers(App, config.modulePrefix);
