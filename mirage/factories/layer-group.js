import { Factory, trait } from 'miragejs';

export default Factory.extend({
  visible: true,
  layerVisibilityType: 'binary',
  titleTooltip: '',
  legendIcon: '',
  legendColor: '',
  legendConfig: {},
  meta: {},
  legend: {},

  hasLayers: trait({
    afterCreate(layerGroup, server) {
      server.createList('layer', 3, { layerGroup });
    },
  }),
});
