import Mixin from '@ember/object/mixin';
import { alias } from '@ember/object/computed';

export default Mixin.create({
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
