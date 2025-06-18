import LayerRecordComponent from './-base';

export default class ZoningMapIndexRecordComponent extends LayerRecordComponent {
  get displayName() {
    return this.model.id.length > 3
      ? `SUB PLAN OF ${this.model.id.slice(0, 3)}`
      : this.model.id;
  }
}
