import DS from 'ember-data';

const { attr } = DS;

export default class CommercialOverlay extends DS.Model {
  @attr()
  geometry;

  @attr('string')
  overlay;
}
