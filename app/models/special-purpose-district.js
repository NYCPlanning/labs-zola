import DS from 'ember-data';

const { attr } = DS;

export default class SpecialPurposeDistrict extends DS.Model {
  @attr()
  geometry;

  @attr('string')
  sdlbl;

  @attr('string')
  sdname;
}
