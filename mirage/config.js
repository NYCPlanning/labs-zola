import layerGroupsFixtures from './static-fixtures/layer-groups';
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

  this.passthrough('https://layers-api-staging.planninglabs.nyc/static/**');
  this.passthrough('https://tiles.planninglabs.nyc/fonts/**');
  this.passthrough('/img/ht.png');

  this.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
    const { queryParams } = request;
    const { format } = queryParams;

    if (format === 'geojson') {
      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: { type: 'MultiPolygon', coordinates: [[[[-73.902799, 40.691346], [-73.903011, 40.691127], [-73.903309, 40.691296], [-73.903301, 40.691305], [-73.903245, 40.691363], [-73.903193, 40.691416], [-73.903138, 40.691473], [-73.903097, 40.691515], [-73.902799, 40.691346]]]] },
          properties: {
            address: '323 MOFFAT STREET', bbl: 3034430054, bldgarea: 10000, bldgclass: 'E1', block: 3443, borough: 'BK', cd: 304, condono: 0, council: 37, firecomp: 'Q252', histdist: null, landmark: null, landuse: '06', lot: 54, lotarea: 10000, lotdepth: 100, lotfront: 100, numbldgs: 1, numfloors: 1, ownername: 'FREUND, TRUSTEE, MORD', ownertype: null, overlay1: null, overlay2: null, policeprct: 83, sanitboro: '3', sanitdistr: '04', sanitsub: '3B', schooldist: '32', spdist1: null, spdist2: null, spdist3: null, unitsres: 0, unitstotal: 1, yearbuilt: 1935, yearalter1: 0, yearalter2: 0, zipcode: 11237, zonedist1: 'M1-1', zonedist2: null, zonedist3: null, zonedist4: null, zonemap: '17c', lon: -73.9030539039584, lat: 40.6913211064174, id: 3034430054,
          },
        }],
      };
    }

    return { rows: [] };
  });

  this.namespace = '/v1';
  this.get('layer-groups');
}
