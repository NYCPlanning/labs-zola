import Route from '@ember/routing/route';

const zma = {
  layerName: 'zoning-map-amendment',
  cartoQueryTemplate(ulurpno) {
    return `SELECT the_geom, ulurpno as id, project_na, effective, status, lucats FROM zoning_map_amendments WHERE ulurpno='${ulurpno}'`;
  },
};

export default Route.extend({
});
