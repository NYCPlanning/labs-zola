import DS from 'ember-data';
import TaskStoreMixin from 'ember-data-tasks/mixins/task-store';

export default DS.Store.extend(TaskStoreMixin);
