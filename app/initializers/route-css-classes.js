import Ember from 'ember';

export function initialize() {
  Ember.Route.reopen({
    activate(...args) {
      this._super(...args);

      const el = this.getBodyElement();
      const routeCssClass = this.getRouteCssClass();

      if (el.classList) {
        el.classList.add(routeCssClass);
      } else {
        el.className += ` ${routeCssClass}`;
      }
    },

    deactivate(...args) {
      this._super(...args);

      const el = this.getBodyElement();
      const className = this.getRouteCssClass();

      if (el.classList) {
        el.classList.remove(className);
      } else {
        el.className = el.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
      }
    },

    getRouteCssClass() {
      return `${this.get('routeName').replace(/\./g, '-').dasherize()}`;
    },

    getBodyElement() {
      return document.querySelector('body');
    },
  });
}

export default {
  initialize,
};
