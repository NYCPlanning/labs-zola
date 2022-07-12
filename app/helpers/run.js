import { helper } from '@ember/component/helper';

export function run([object, func, ...args]) {
  console.log('is run')
  object[func](...args);
}

export default helper(run);
