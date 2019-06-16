import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

const { attr } = DS;

// this model fragment structures the "properties"
// node of a geojson feature
export default class CommercialOverlayFragment extends MF.Fragment {
  @attr('string')
  overlay;
}
