import Route from '@ember/routing/route';

const cartoQueryTemplate = function(id) {
  return `SELECT cartodb_id as id, the_geom, spname, splbl, subdist, subsub FROM special_purpose_subdistricts WHERE cartodb_id='${id}'`;
};

export default class specialPurposeSubdistrictRoute extends Route {
  model(params) {
    const { id } = params;
    const cartoQuery = cartoQueryTemplate(id);

    return {
      cartoQuery,
    };
  }
}
