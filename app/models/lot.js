import Ember from 'ember';
import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

// columns requested from server
// update to add more
const LotColumnsSQL = [
  'address',
  'bbl',
  'bldgarea',
  'bldgclass',
  'block',
  'borough',
  'cd',
  'condono',
  'council',
  'firecomp',
  'histdist',
  'landmark',
  'landuse',
  'lot',
  'lotarea',
  'lotdepth',
  'lotfront',
  'numbldgs',
  'numfloors',
  'ownername',
  'ownertype',
  'policeprct',
  'sanitboro',
  // 'sanitdist', // TODO: Adding this column breaks the app. 
  'sanitsub',
  'schooldist',
  'unitsres',
  'unitstotal',
  'yearbuilt',
  'yearalter1',
  'yearalter2',
  'zipcode',
  'zonedist1',
  'zonedist2',
  'zonedist3',
  'zonedist4',
  'zonemap',
];

const boroughLookup = {
  BX: 'Bronx',
  BK: 'Brooklyn',
  MN: 'Manhattan',
  QN: 'Queens',
  SI: 'Staten Island',
};

const boroLookup = {
  1: 'Manhattan',
  2: 'Bronx',
  3: 'Brooklyn',
  4: 'Queens',
  5: 'Staten Island',
};

const ownertypeLookup = {
  C: 'City',
  M: 'Mixed City & Private',
  O: 'Public Authority, State, or Federal',
  P: 'Private',
  X: 'Mixed',
};

const landuseLookup = {
  '01': 'One & Two Family Buildings',
  '02': 'Multi-Family Walk-Up Buildings',
  '03': 'Multi-Family Elevator Buildings',
  '04': 'Mixed Residential & Commercial Buildings',
  '05': 'Commercial & Office Buildings',
  '06': 'Industrial & Manufacturing',
  '07': 'Transportation & Utility',
  '08': 'Public Facilities & Institutions',
  '09': 'Open Space & Outdoor Recreation',
  10: 'Parking Facilities',
  11: 'Vacant Land',
};

export default DS.Model.extend({
  geometry: DS.attr(),
  address: DS.attr('string'),
  bbl: DS.attr('number'),
  bldgarea: DS.attr('number'),
  bldgclass: DS.attr('string'),
  block: DS.attr('number'),
  borocode: Ember.computed('cd', function() {
    const borocd = this.get('cd');
    return borocd.substring(0, 1);
  }),
  borough: DS.attr('string'),
  boroname: Ember.computed('borough', function() {
    return boroughLookup[this.get('borough')];
  }),
  cd: DS.attr('string'),
  cdName: Ember.computed('cd', function() {
    const borocd = this.get('cd');
    const boro = borocd.substring(0, 1);
    const cd = parseInt(borocd.substring(1, 3), 10).toString();
    return `${boroLookup[boro]} Community District ${cd}`;
  }),
  cdURLSegment: Ember.computed('cd', function() {
    const borocd = this.get('cd');
    const boro = borocd.substring(0, 1);
    const cleanBorough = boroLookup[boro].toLowerCase().replace(/\s/g, '-');
    const cd = parseInt(borocd.substring(1, 3), 10).toString();
    return `${cleanBorough}/${cd}`;
  }),
  condono: DS.attr('number'),
  council: DS.attr('string'),
  firecomp: DS.attr('string'),
  histdist: DS.attr('string'),
  landmark: DS.attr('string'),
  landuse: DS.attr('string'),
  landusename: Ember.computed('landuse', function() {
    return landuseLookup[this.get('landuse')];
  }),
  lot: DS.attr('number'),
  lotarea: DS.attr('number'),
  lotdepth: DS.attr('number'),
  lotfront: DS.attr('number'),
  numbldgs: DS.attr('number'),
  numfloors: DS.attr('number'),
  ownername: DS.attr('string'),
  ownertype: DS.attr('string'),
  ownertypename: Ember.computed('ownertype', function() {
    return ownertypeLookup[this.get('ownertype')];
  }),
  policeprct: DS.attr('string'),
  sanitboro: DS.attr('string'),
  sanitdist: DS.attr('string'),
  sanitsub: DS.attr('string'),
  schooldist: DS.attr('string'),
  unitsres: DS.attr('number'),
  unitstotal: DS.attr('number'),
  yearbuilt: DS.attr('string'),
  yearalter1: DS.attr('number'),
  yearalter2: DS.attr('number'),
  zipcode: DS.attr('number'),
  zonedist1: DS.attr('string'),
  zonedist2: DS.attr('string'),
  zonedist3: DS.attr('string'),
  zonedist4: DS.attr('string'),
  zonemap: DS.attr('string'),

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});

export { LotColumnsSQL };
