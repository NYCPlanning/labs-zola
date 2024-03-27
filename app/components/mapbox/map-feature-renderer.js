import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class MapboxMapFeatureRenderer extends Component {
  // should be carto-feature-like
  model = {};

  @service mainMap;

  @service router;

  // this is usually a query param, which comes through a string.
  shouldFitBounds = true;

  didInsertElement(...args) {
    super.didInsertElement(...args);

    // if they match it's the selection
    // if the boro is 0 then there's no comparison area selected yet
    // otherwise, it's the comparison selection
    if (
      this.model.properties.borocode ===
        parseInt(this.router.currentRoute.params.boro, 10) &&
      this.model.properties.block ===
        parseInt(this.router.currentRoute.params.block, 10) &&
      this.model.properties.lot ===
        parseInt(this.router.currentRoute.params.lot, 10)
    ) {
      this.setSelectedFeature(this.model);
    } else if (this.router.currentRoute.params.comparisonboro !== '0') {
      this.setComparisonSelectedFeature(this.model);
    }

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

  setComparisonSelectedFeature(model) {
    this.set('mainMap.comparisonSelected', model);
  }
}
