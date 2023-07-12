import { Factory, association } from 'miragejs';

export default Factory.extend({
  position: -1,
  before: 'boundary_country',
  displayName: '',
  style: {},
  highlightable: true,
  clickable: true,
  tooltipable: true,
  tooltipTemplate: '',

  layerGroup: association(),
});
