import { helper } from '@ember/component/helper';
import carto from '../utils/carto';

export function getUniqueOptionsFor([column, sql]) {
  const uniqueSQL = `select distinct(${column}) as option from (${sql}) a ORDER BY option ASC`;
  return carto.SQL(uniqueSQL)
    .then(response =>
      response.map(row =>
        row.option,
      ),
    );
}

export default helper(getUniqueOptionsFor);
