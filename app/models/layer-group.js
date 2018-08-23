import LayerGroupModel from 'ember-mapbox-composer/models/layer-group';
import { alias } from '@ember/object/computed';
import QueryParamMap from '../mixins/query-param-map';

export default LayerGroupModel.extend(QueryParamMap, {
  'query-param': alias('id'),
});
