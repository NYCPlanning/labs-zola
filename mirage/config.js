import {
  discoverEmberDataModels,
  applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';
import layerGroupsFixtures from './static-fixtures/layer-groups';
import patchXMLHTTPRequest from './helpers/mirage-mapbox-gl-monkeypatch';

function routes() {
  patchXMLHTTPRequest();

  this.passthrough('https://zap-api-production.herokuapp.com/**');
  this.passthrough(
    'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/**'
  );

  this.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
    const { queryParams } = request;
    const { format, q } = queryParams;

    // by default, this will return a feature that looks like a PLUTO Lot
    if (format === 'geojson') {
      // by default, return anything created in this schema
      let schemaModel = schema.cartoGeojsonFeatures.all();
      // if it includes mappluto, it's asking for lots
      if (q.includes('dcp_mappluto')) {
        schemaModel = schema.lots.all();
      }

      let { models: features } = schemaModel;

      // NOTE: some tests will load the Mirage mock server with multiple fake carto responses. This leads
      // to multiple records being included with the response, something that should never happen in
      // production. This means that when it gets back to ember, the request includes an id but receives
      // a different record. In the past, this wouldn't be an issue in Ember Data. Now, it seems to throw an
      // error.
      // As a fix, this code looks for a key:value pair in the request query that's sent to carto: id:{id}". Then,
      // it filters for the correct record.
      // The reason it's stored as a comment is that pretender or mirage is truncating everything after the "="
      if (features.length > 1) {
        try {
          const regex = /([^, ]+):([^, ]+)/g;
          const found = q.match(regex);
          const cartoIdentifier = found[0]?.split(':')[1];
          features = features.filter((f) => f.id === cartoIdentifier);
        } catch (e) {
          console.error('Mirage error: ', e);
        }
      }

      return {
        type: 'FeatureCollection',
        features,
      };
    }

    return { rows: [] };
  });

  this.namespace = '/v1';
  this.get('layer-groups');
  this.post('v1/layer-groups', () => layerGroupsFixtures);
}

export default function (config) {
  const finalConfig = {
    ...config,
    namespace: '/v1',
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: { ...discoverEmberDataModels(), ...config.models },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };
  return createServer(finalConfig);
}
