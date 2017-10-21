import Ember from 'ember';
import { buildSqlUrl } from '../utils/carto';

export function cartoDownloadLink([table, identifier, ids, format]) {
  const query = `SELECT * FROM ${table} WHERE ${identifier} IN (${ids.join(',')})`;
  return `${buildSqlUrl(query, format)}&filename=${table}`;
}

export default Ember.Helper.helper(cartoDownloadLink);
