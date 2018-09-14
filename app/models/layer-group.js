import DS from 'ember-data';
import LayerGroupModel from 'ember-mapbox-composer/models/layer-group';
import { alias } from '@ember/object/computed';
import QueryParamMap from '../mixins/query-param-map';

export default LayerGroupModel.extend(QueryParamMap, {
  'query-param': alias('id'),
  title: alias('legend.label'),
  meta: DS.attr(),
  legend: DS.attr(),
});
