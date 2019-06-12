import Application from '@ember/application';
import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import DS from 'ember-data';
import TaskModelMixin from 'ember-data-tasks/mixins/task-model';
import Resolver from './resolver';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

// temporary fix due to importing registerWaiter
// see: https://github.com/emberjs/ember.js/issues/15670
/* eslint-disable ember-suave/no-direct-property-access, no-undef */
if (typeof Ember.Test === 'undefined') {
  Ember.Test = {
    registerWaiter() {

    },
  };
}
/* eslint-enable ember-suave/no-direct-property-access, no-undef */

Ember.MODEL_FACTORY_INJECTIONS = true;

loadInitializers(App, config.modulePrefix);

// TODO: why is this here?
DS.Model.reopen(TaskModelMixin);

export default App;
