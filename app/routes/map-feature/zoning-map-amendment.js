import Route from '@ember/routing/route';

const cartoQueryTemplate = function(ulurpno) {
  return `SELECT the_geom, ulurpno as id, project_na, effective, status, lucats FROM zoning_map_amendments WHERE ulurpno='${ulurpno}'`;
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
