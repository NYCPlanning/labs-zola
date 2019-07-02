import { helper } from '@ember/component/helper';
import { capitalize } from '@ember/string';

export function humanizeDasherizedWords([phrase]) {
  return phrase
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
}

export default helper(humanizeDasherizedWords);
