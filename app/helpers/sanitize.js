import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function sanitize([styleObject]) {
  return styleObject
    ? htmlSafe(
        Object.keys(styleObject).reduce(
          (acc, key) => acc.concat(`${key}:${styleObject[key]};`),
          ''
        )
      )
    : '';
}

export default helper(sanitize);
