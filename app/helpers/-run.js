import { helper } from '@ember/component/helper';

export function _run([object, func, ...args]) {
  object[func](...args);
}

export default helper(_run);
