import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { dasherize } from '@ember/string';

export function initialize() {
  Route.reopen({
    fastboot: service(),
    activate(...args) {
      this._super(...args);

      // if-guard to prevent the node-based fastboot server from running this
      // because it relies on DOM methods
      if (!this.fastboot.isFastBoot) {
        const el = this.getBodyElement();
        const routeCssClass = this.getRouteCssClass();

        if (el.classList) {
          el.classList.add(routeCssClass);
        } else {
          el.className += ` ${routeCssClass}`;
        }
      }
    },

    deactivate(...args) {
      this._super(...args);

      // if-guard to prevent the node-based fastboot server from running this
      // because it relies on DOM methods
      if (!this.fastboot.isFastBoot) {
        const el = this.getBodyElement();
        const className = this.getRouteCssClass();

        if (el.classList) {
          el.classList.remove(className);
        } else {
          el.className = el.className.replace(
            new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
            ' '
          );
        }
      }
    },

    getRouteCssClass() {
      return `${dasherize(this.routeName.replace(/\./g, '-'))}`;
    },

    getBodyElement() {
      return document.querySelector('body');
    },
  });
}

export default {
  initialize,
};
