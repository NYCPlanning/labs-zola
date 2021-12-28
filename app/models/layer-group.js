import LayerGroupModel from 'ember-mapbox-composer/models/layer-group';
import DS from 'ember-data';

const { hasMany } = DS;

export default LayerGroupModel.extend({
  sources: hasMany('source', { async: false }),
});
