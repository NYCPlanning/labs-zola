import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const sources = this.store.peekAll('source');
    return sources.toArray().uniqBy('meta.description');
  },
});
