import Ember from 'ember';

const { get,
  run: { scheduleOnce } } = Ember;

export default Ember.Mixin.create({
  metrics: Ember.inject.service(),

  didTransition(...args) {
    this._super(...args);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      get(this, 'metrics').trackPage({ page, title });
    });
  },
});
