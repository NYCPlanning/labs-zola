import Route from '@ember/routing/route';

const specialPurposeSubdistrict = {
  layerName: 'special-purpose-subdistrict',
  cartoQueryTemplate(id) {
    return `SELECT cartodb_id as id, the_geom, spname, splbl, subdist, subsub FROM special_purpose_subdistricts WHERE cartodb_id='${id}'`;
  },
};

export default Route.extend({
});
