import Route from '@ember/routing/route';

const cartoQueryTemplate = function(id) {
  return `SELECT * FROM (
    SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, overlay as id, overlay FROM commercial_overlays GROUP BY overlay
  ) a WHERE id='${id}'`;
};

export default class CommercialOverlayRoute extends Route {
  model(params) {
    const { id } = params;
    const cartoQuery = cartoQueryTemplate(id);

    return {
      cartoQuery,
    };
  }
}
