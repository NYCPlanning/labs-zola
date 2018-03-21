import { helper } from '@ember/component/helper';

function toTitleCase([str]) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

export default helper(toTitleCase);
