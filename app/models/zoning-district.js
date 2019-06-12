import DS from 'ember-data';

const { attr } = DS;

export default class ZoningDistrict extends DS.Model {
  @attr()
  geometry;
}
