import FeatureFactory from './carto-geojson-feature';

export default FeatureFactory.extend({
  afterCreate(lot) {
    lot.update('properties', {
      ...lot.properties,
      ...{
        id: lot.id,
        bbl: lot.id,
      },
    });
  },
  properties() {
    return {
      id: this.id,
      bbl: this.id,

      address: '32 WEST 25 STREET',
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
      zonedist2: null,
      zonedist3: null,
      zonedist4: null,
      zonemap: '8d',
    };
  },
});
