import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  model() {
    const sources = this.store.peekAll('source');
    return sources.uniqBy('meta.description');
  },
});
