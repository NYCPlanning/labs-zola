import Ember from 'ember';

const { alias } = Ember.computed;

export default Ember.Mixin.create({
  init(...args) {
    this._super(...args);

    const qps = this.get('qps');
    const queryParam = this.get('query-param');
    const queryParamBoundKey = this.get('queryParamBoundKey');

    if (qps) {
      this.set(
        queryParamBoundKey,
        alias(`qps.${queryParam}`),
      );
    }
  },
});
