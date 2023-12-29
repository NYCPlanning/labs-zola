import LayerRecordComponent from './-base';

export default class ZoningMapAmendmentRecordComponent extends LayerRecordComponent {
  get effectiveDisplay() {
    return import('moment').then(({ default: moment }) => {
      const { effective } = this.model;

      if (effective) {
        return moment(effective).utc().format('LL');
      }
      return 'To be determined';
    });
  }
}
