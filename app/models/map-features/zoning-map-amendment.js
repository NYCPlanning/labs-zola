import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';

const { attr } = DS;

// this model fragment structures the "properties"
// node of a geojson feature
export default class ZoningMapAmendmentFragment extends MF.Fragment {
  @attr('string') ulurpno;

  @attr('string') project_na;

  @attr('string') effective;

  @attr('string') status;

  @attr('string') lucats;

  @computed('effective')
  get effectiveDisplay() {
    return import('moment').then(({ default: moment }) => {
      const effective = this.get('effective');

      if (effective) {
        return moment(effective).utc().format('LL');
      }
      return 'To be determined';
    });
  }
}
