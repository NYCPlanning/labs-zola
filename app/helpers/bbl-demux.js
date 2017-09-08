import Ember from 'ember';
import demux from '../utils/bbl-demux';

export function bblDemux(params) {
  const [bbl] = params;
  return demux(bbl);
}

export default Ember.Helper.helper(bblDemux);
