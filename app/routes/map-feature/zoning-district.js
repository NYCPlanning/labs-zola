import Route from '@ember/routing/route';

const cartoQueryTemplate = function(id) {
  return `SELECT * FROM (
    SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, zonedist as id FROM zoning_districts GROUP BY zonedist
  ) a WHERE id = '${id}'`;
};

export default class ZoningDistrictRoute extends Route {
  model(params) {
    const { id } = params;
    const cartoQuery = cartoQueryTemplate(id);

    return {
      cartoQuery,
    };
  }
}
