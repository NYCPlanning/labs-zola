import Route from '@ember/routing/route';
import updateSelectionAllFeaturesMixin from '../mixins/update-selection-all-features';

const mappableRoute = Route.extend(updateSelectionAllFeaturesMixin);

// query and naming information for layers
// keys are the expected routes
export const layerQueries = {
  zma: {
    layerName: 'zoning-map-amendment',
    cartoQueryTemplate(ulurpno) {
      return `SELECT the_geom, ulurpno as id, project_na, effective, status, lucats FROM zoning_map_amendments WHERE ulurpno='${ulurpno}'`;
    },
  },

  'zoning-district': {
    layerName: 'zoning-district',
    cartoQueryTemplate(id) {
      return `SELECT * FROM (
        SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, zonedist as id FROM zoning_districts GROUP BY zonedist
      ) a WHERE id = '${id}'`;
    },
  },

  'special-purpose-subdistrict': {
    layerName: 'special-purpose-subdistrict',
    cartoQueryTemplate(id) {
      return `SELECT cartodb_id as id, the_geom, spname, splbl, subdist, subsub FROM special_purpose_subdistricts WHERE cartodb_id='${id}'`;
    },
  },

  'special-purpose-district': {
    layerName: 'special-purpose-district',
    cartoQueryTemplate(id) {
      return `SELECT cartodb_id as id, the_geom, sdname, sdlbl FROM special_purpose_districts WHERE cartodb_id='${id}'`;
    },
  },

  'commercial-overlay': {
    layerName: 'commercial-overlay',
    cartoQueryTemplate(id) {
      return `SELECT * FROM (
        SELECT ST_CollectionExtract(ST_Collect(the_geom),3) as the_geom, overlay as id, overlay FROM commercial_overlays GROUP BY overlay
      ) a WHERE id='${id}'`;
    },
  },
};

// responsible for mapping old layer group routes into new names
// looks up an object for querying data of a specific type
// for example, existing links may point to /zma but internally
// these should be zoning-map-amendment
export default class MapFeature extends mappableRoute {
}
