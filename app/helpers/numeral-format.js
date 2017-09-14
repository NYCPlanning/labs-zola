import Ember from 'ember';
import numeral from 'npm:numeral';

export function numeralFormat(params) {
  const [number, template] = params;
  return numeral(number).format(template);
}

export default Ember.Helper.helper(numeralFormat);
