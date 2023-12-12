import { JSONAPISerializer } from 'miragejs';

export default JSONAPISerializer.extend({
  serialize({ models: features }) {
    return {
      type: 'FeatureCollection',
      features,
    };
  },
});
