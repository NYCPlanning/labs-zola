import patchXMLHTTPRequest from './helpers/mirage-mapbox-gl-monkeypatch';

export default function() {
  patchXMLHTTPRequest();
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.4.x/shorthands/
  */

  this.passthrough('/img/ht.png');
  this.passthrough('https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/**');

  this.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
    const { queryParams } = request;
    const { format, q } = queryParams;

    // by default, this will return a feature that looks like a PLUTO Lot
    if (format === 'geojson') {
      // by default, return anything created in this schema
      let schemaModel = schema.cartoGeojsonFeatures.all();

      // if it includes mappluto, it's asking for lots
      if (q.includes('mappluto')) {
        schemaModel = schema.lots.all();
      }

      const { models: features } = schemaModel;

      return {
        type: 'FeatureCollection',
        features,
      };
    }

    return { rows: [] };
  });

  this.namespace = '/v1';
  this.get('layer-groups');
}
