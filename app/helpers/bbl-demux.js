import { helper } from '@ember/component/helper';
import demux from '../utils/bbl-demux';

export function bblDemux(params) {
  const [bbl] = params;
  return demux(bbl);
}

export default helper(bblDemux);
