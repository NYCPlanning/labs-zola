import Route from '@ember/routing/route';

const specialPurposeDistrict = {
  layerName: 'special-purpose-district',
  cartoQueryTemplate(id) {
    return `SELECT cartodb_id as id, the_geom, sdname, sdlbl FROM special_purpose_districts WHERE cartodb_id='${id}'`;
  },
};

export default Route.extend({
});
