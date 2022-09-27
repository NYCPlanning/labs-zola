import { buildSqlUrl } from '../utils/carto';
import CartoGeojsonFeatureAdapter from './carto-geojson-feature';

const LotColumnsSQL = [
  'address',
  'bbl',
  'bldgarea',
  'bldgclass',
  'block',
  'borough',
  'borocode',
  'cd',
  'condono',
  'council',
  'firecomp',
  'histdist',
  'landmark',
  'landuse',
  'lot',
  'lotarea',
  'lotdepth',
  'lotfront',
  'notes',
  'numbldgs',
  'numfloors',
  'ownername',
  'ownertype',
  'overlay1',
  'overlay2',
  'policeprct',
  'sanitboro',
  'sanitdistr',
  'sanitsub',
  'schooldist',
  'spdist1',
  'spdist2',
  'spdist3',
  'unitsres',
  'unitstotal',
  'yearbuilt',
  'yearalter1',
  'yearalter2',
  'zipcode',
  'zonedist1',
  'zonedist2',
  'zonedist3',
  'zonedist4',
  'LOWER(zonemap) AS zonemap',
];

export const cartoQueryTemplate = function(id) {
  return `SELECT ${LotColumnsSQL.join(',')},
    st_x(st_centroid(the_geom)) as lon, st_y(st_centroid(the_geom)) as lat,
    the_geom, bbl AS id FROM dcp_mappluto WHERE bbl=${id}`;
};

export default CartoGeojsonFeatureAdapter.extend({
  handleResponse(status, headers, payload, requestData) {
    if (payload.error) {
      payload.errors = payload.error;
    }

    return this._super(status, headers, payload, requestData);
  },
  urlForFindRecord(id) {
    return buildSqlUrl(
      cartoQueryTemplate(id),
      'geojson',
    );
  },
});
