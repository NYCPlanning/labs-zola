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
    const { format } = queryParams;

    // by default, this will return a feature that looks like a PLUTO Lot
    if (format === 'geojson') {
      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: { type: 'MultiPolygon', coordinates: [[[[-73.902799, 40.691346], [-73.903011, 40.691127], [-73.903309, 40.691296], [-73.903301, 40.691305], [-73.903245, 40.691363], [-73.903193, 40.691416], [-73.903138, 40.691473], [-73.903097, 40.691515], [-73.902799, 40.691346]]]] },
          properties: {
            id: '118721',
            address: '32 WEST 25 STREET',
            bbl: 1008260061,
            bldgarea: 5000,
            bldgclass: 'K1',
            lat: 40.7434315461862,
            lon: -73.9906654966893,
            block: 826,
            borough: 'MN',
            cd: '105',
            condono: 0,
            council: '3',
            firecomp: 'E001',
            histdist: null,
            landmark: null,
            landuse: '05',
            lot: 61,
            lotarea: 4938,
            lotdepth: 98.75,
            lotfront: 50,
            numbldgs: 1,
            numfloors: 1,
            ownername: 'HMH SPECIAL LLC',
            ownertype: null,
            overlay1: null,
            overlay2: null,
            policeprct: '13',
            sanitboro: '1',
            sanitdistr: '05',
            sanitsub: '1B',
            schooldist: '02',
            spdist1: null,
            spdist2: null,
            spdist3: null,
            unitsres: 0,
            unitstotal: 1,
            yearbuilt: '1935',
            yearalter1: 0,
            yearalter2: 0,
            zipcode: 10010,
            zonedist1: 'M1-6',
            zonedist2: 'M1-6',
            zonedist3: 'M1-6',
            zonedist4: 'M1-6',
            zonemap: '8d',
          },
        }],
      };
    }

    return { rows: [] };
  });

  this.namespace = '/v1';
  this.get('layer-groups');
}
