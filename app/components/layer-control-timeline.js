import Component from '@ember/component';
import { action } from '@ember/object';

const defaultMax = new Date();
const defaultStart = [220924800, defaultMax.getTime()];

function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;

  return [year, month].join('-');
}

export default class LayerControlTimelineComponent extends Component {
  layerGroup;

  column = '';

  format = {
    to: (number) => formatDate(number),
    from: (number) => formatDate(number),
  };

  start = defaultStart;

  min = defaultStart[0];

  max = defaultStart[1];

  @action
  sliderChanged(value) {
    const [min, max] = value;
    const { layerGroup, column } = this;
    this.set('start', value);

    const expression = ['all', ['>=', column, min], ['<=', column, max]];

    layerGroup.layerIds.forEach((id) => {
      layerGroup.setFilterForLayer(id, expression);
    });
  }
}
