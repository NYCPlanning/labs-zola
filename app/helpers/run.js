import { helper } from '@ember/component/helper';

export function run([object, func, ...args]) {
  object[func](...args);
}

export default helper(run);
