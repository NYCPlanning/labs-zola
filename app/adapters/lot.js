import DS from 'ember-data';
import { cartoQueryTemplate } from 'labs-zola/routes/map-feature/lot';
import { buildSqlUrl } from '../utils/carto';

export default DS.JSONAPIAdapter.extend({
  keyForAttribute(key) {
    return key;
  },
  urlForFindRecord(id) {
    return buildSqlUrl(
      cartoQueryTemplate(id),
      'geojson',
    );
  },
});
