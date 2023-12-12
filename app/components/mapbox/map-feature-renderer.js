import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class MapboxMapFeatureRenderer extends Component {
  // should be carto-feature-like
  model = {};

  @service mainMap;

  // this is usually a query param, which comes through a string.
  shouldFitBounds = true;

  didInsertElement(...args) {
    super.didInsertElement(...args);
    this.setSelectedFeature(this.model);

    if (this.shouldFitBounds) {
      this.setFitBounds(this.model);
    }
  }

  setFitBounds(model) {
    const { bounds } = model;
    this.mainMap.setBounds.perform(bounds);
  }

  setSelectedFeature(model) {
    this.set('mainMap.selected', model);
  }
}
