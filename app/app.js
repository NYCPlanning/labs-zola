import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import defineModifier from 'ember-concurrency-retryable/define-modifier';
import config from 'labs-zola/config/environment';

if (config.environment === 'production' || config.environment === 'staging') {
  Sentry.init({
    dsn: 'https://f93ba4c5c59740c4b70cdb571b54d6da@sentry.io/1492094',
    integrations: [new Integrations.Ember()],
    environment: config.environment,
  });
}

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
