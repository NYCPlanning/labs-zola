import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  serialize({ models: features }) {
    return {
      type: 'FeatureCollection',
      features,
    };
  },
});
