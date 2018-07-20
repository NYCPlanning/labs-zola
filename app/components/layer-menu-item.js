import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import { ParentMixin, ChildMixin } from 'ember-composability-tools';
import { next } from '@ember/runloop';
import trackEvent from '../utils/track-event'; // eslint-disable-line

export default Component.extend(ParentMixin, ChildMixin, {
  init(...args) {
    this._super(...args);
  },

  registeredLayers: service(),
  mainMap: service(),
  metrics: service(),
  visible: alias('layer.visible'),
  tagName: 'li',

  @computed('for', 'registeredLayers.layers.@each')
  layer(layerId, layers) {
    return layers.findBy('config.id', layerId);
  },

  title: alias('layer.config.title'),

  legendIcon: alias('layer.config.legendIcon'),

  legendColor: alias('layer.config.legendColor'),

  titleTooltip: alias('layer.config.titleTooltip'),

  @computed('layer.{minzoom,visible}', 'mainMap.currentZoom')
  warning(minzoom, visible, currentZoom) {
    return (minzoom && visible && (currentZoom < minzoom));
  },

  /**
   * @override: ember lifecycle
   */
  didInsertElement(...params) {
    this._super(...params);

    next(() => {
      this.get('menuItems').pushObject(this);
    });
  },

  actions: {
    @trackEvent('Toggle Layer', 'title', 'visible')
    toggleVisibility() {
      this.toggleProperty('visible');
    },
    updateSql(method, column, value) {
      const layer = this.layer;
      layer.send('updateSql', method, column, value);
    },
    updatePaintFor(id, paintObject) {
      const layer = this.layer;
      layer.send('updatePaintFor', id, paintObject);
    },
  },
});
