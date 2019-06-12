import DS from 'ember-data';

const { attr } = DS;

export default class SpecialPurposeSubdistrict extends DS.Model {
  @attr()
  geometry;

  @attr('string')
  splbl;

  @attr('string')
  spname;
}
