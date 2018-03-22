import { helper } from '@ember/component/helper';
import { buildSqlUrl } from '../utils/carto';

export function cartoDownloadLink([table, identifier, ids, format]) {
  const query = `SELECT * FROM ${table} WHERE ${identifier} IN (${ids.join(',')})`;
  return `${buildSqlUrl(query, format)}&filename=${table}`;
}

export default helper(cartoDownloadLink);
