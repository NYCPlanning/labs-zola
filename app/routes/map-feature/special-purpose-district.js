import Route from '@ember/routing/route';

const cartoQueryTemplate = function(id) {
  return `SELECT cartodb_id as id, the_geom, sdname, sdlbl FROM special_purpose_districts WHERE cartodb_id='${id}'`;
};

export default class SpecialPurposeDistrictRoute extends Route {
  model(params) {
    const { id } = params;
    const cartoQuery = cartoQueryTemplate(id);

    return {
      cartoQuery,
    };
  }
}
