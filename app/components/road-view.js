import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default class RoadView extends Component.extend(InViewportMixin) {
  lat;

  lon;

  inView = false;
}
