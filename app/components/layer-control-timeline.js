import Component from '@ember/component';
import { ChildMixin } from 'ember-composability-tools';

const defaultMax = new Date();
const defaultStart = [1032370151000, defaultMax.getTime()];

function formatDate(date) {
  const d = new Date(date);
  let month = `${(d.getMonth() + 1)}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;

  return [year, month].join('-');
}

export default Component.extend(ChildMixin, {
  format: {
    to: number => formatDate(number),
    from: number => formatDate(number),
  },

  column: '',
  start: defaultStart, // epoch time
  min: defaultStart[0],
  max: defaultStart[1],

  actions: {
    sliderChanged(value) {
      const [min, max] = value;
      const { layerGroup, layerID, column } = this;

      this.set('start', value);

      const expression = ['all', ['>=', column, min], ['<=', column, max]];
      layerGroup.setFilterForLayer(layerID, expression);
    },
  },
});
