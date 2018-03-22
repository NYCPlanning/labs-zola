import Component from '@ember/component';
import { get } from '@ember/object';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import carto from '../utils/carto';

const SQL = function(table, geometry) {
  return `SELECT * FROM ${table} 
          WHERE 
            ST_Intersects(
              ST_SetSRID(
                ST_GeomFromGeoJSON('${JSON.stringify(geometry)}'), 4326), 
                ${table}.the_geom) LIMIT 1`;
};

const LinkToIntersectingComponent = Component.extend({
  responseIdentifier: 'cartodb_id',
  tagName: '',

  @computed('table', 'geometry', 'responseIdentifier')
  resultingFeature(table, geometry, responseIdentifier) {
    return carto.SQL(SQL(table, geometry))
      .then((response => get(response[0], responseIdentifier)));
  },
});

LinkToIntersectingComponent.reopenClass({
  positionalParams: ['string', 'route', 'table', 'geometry'],
});

export default LinkToIntersectingComponent;
