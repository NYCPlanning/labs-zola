import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  mainMap: service(),

  model() {
    return this.store.findAll('bookmark');
  },
});
