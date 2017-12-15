import fetch from 'fetch';
import { Promise } from 'rsvp';

const cartoUser = 'planninglabs';
const cartoDomain = 'planninglabs.carto.com';

const buildTemplate = (layergroupid, type) => { // eslint-disable-line
  return `https://${cartoDomain}/api/v1/map/${layergroupid}/{z}/{x}/{y}.${type}`;
};

const buildSqlUrl = (cleanedQuery, type = 'json') => { // eslint-disable-line
  return `https://${cartoDomain}/api/v2/sql?q=${cleanedQuery}&format=${type}`;
};
const carto = {
  SQL(query, type = 'json') {
    const cleanedQuery = query.replace('\n', '');
    const url = buildSqlUrl(cleanedQuery, type);

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Not found');
      })
      .then((d) => { // eslint-disable-line
        return type === 'json' ? d.rows : d;
      });
  },

  getVectorTileTemplate(SQLArray) {
    const CartoCSS = '#layer { polygon-fill: #FFF; }';
    const layers = SQLArray.map(sql => ({
      type: 'mapnik',
      options: {
        cartocss_version: '2.1.1',
        cartocss: CartoCSS,
        sql,
      },
    }));

    const params = {
      version: '1.3.0',
      layers,
    };

    return new Promise((resolve, reject) => {
      fetch(`https://${cartoDomain}/api/v1/map`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .catch(err => reject(err))
        .then(response => response.json())
        .then((json) => {
          resolve(buildTemplate(json.layergroupid, 'mvt'));
        });
    });
  },
};

export { buildSqlUrl };
export default carto;
