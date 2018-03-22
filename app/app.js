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

Ember.MODEL_FACTORY_INJECTIONS = true;

loadInitializers(App, config.modulePrefix);

DS.Model.reopen(TaskModelMixin);

export default App;
