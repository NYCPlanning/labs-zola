import DS from 'ember-data';
import { buildSqlUrl } from '../utils/carto';

const LotColumnsSQL = [
  'address',
  'bbl',
  'bldgarea',
  'bldgclass',
  'block',
  'borough',
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
    the_geom, bbl AS id FROM mappluto WHERE bbl=${id}`;
};

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
