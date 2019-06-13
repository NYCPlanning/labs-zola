import Route from '@ember/routing/route';
import bblDemux from 'labs-zola/utils/bbl-demux';
import updateSelectionSingleFeatureMixin from 'labs-zola/mixins/update-selection-single-feature';

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
  'overlay1', 'overlay2',
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

const cartoQueryTemplate = function(id) {
  return `SELECT ${LotColumnsSQL.join(',')}, 
    st_x(st_centroid(the_geom)) as lon, st_y(st_centroid(the_geom)) as lat,
    the_geom, bbl AS id FROM mappluto WHERE bbl=${id}`;
};

const GeometricRoute = Route.extend(updateSelectionSingleFeatureMixin);

export default class MapFeatureLotRoute extends GeometricRoute {
  model(params) {
    const id = bblDemux(params);
    const cartoQuery = cartoQueryTemplate(id);

    return {
      cartoQuery,
    };
  }
}
