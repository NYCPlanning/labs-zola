import DS from 'ember-data';

const { attr } = DS;

export default class ZoningMapAmendment extends DS.Model {
  @attr() geometry;

  @attr('string') ulurpno;

  @attr('string') project_na;

  @attr('string') effective;

  @attr('string') status;

  @attr('string') lucats;
}
