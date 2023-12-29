import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class MapboxFixMapToAllButton extends Component {
  // should be carto-geojson-model-like
  model = {};

  @service mainMap;

  @action
  fitBounds() {
    gtag('event', 'fit_map', {
      event_category: 'Fit Map to Districts',
    });

    this.mainMap.setBounds.perform(this.model.bounds);
  }
}
