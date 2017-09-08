import Ember from 'ember';

const {
  assign,
  Component,
  computed,
  deprecate,
  get,
  getOwner,
  getProperties,
  guidFor
} = Ember;

export default Component.extend({
  tagName: '',

  map: null,

  /**
   * @param object
   * @description The style layer to add, conforming to the Mapbox Style Specification's layer definition.
   * {@link https://www.mapbox.com/mapbox-gl-js/api/#map#addlayer Mapbox}
  */
  layer: null,

  /**
   * @param string
   * @description The ID of an existing layer to insert the new layer before. If this argument is omitted, the layer will be appended to the end of the layers array.
   * {@link https://www.mapbox.com/mapbox-gl-js/api/#map#addlayer Mapbox}
  */
  before: null,

  /**
    * @deprecated in favor of `layer.type`
  */
  layerType: null,

  /**
    * @deprecated in favor of `layer.layout`
  */
  layoutOptions: null,

  /**
    * @deprecated in favor of `layer.paint`
  */
  paintOptions: null,

  /**
    * @deprecated in favor of `layer.source`
  */
  sourceId: null,

  /**
   * @private for use by mapbox-gl-source to pass in its sourceId
   */
  _sourceId: computed('layer.source', 'sourceId', function() {
    return get(this, 'layer.source') || get(this, 'sourceId');
  }),

  /**
   * @private
   */
  _layerId: computed('layer.id', function() {
    return get(this, 'layer.id') || guidFor(this);
  }).readOnly(),

  /**
   * @private
   */
  _layerType: computed('layer.type', 'layerType', function() {
    return get(this, 'layer.type') || get(this, 'layerType') || 'line';
  }).readOnly(),

  _envConfig: computed('_layerType', function() {
    const layerType = get(this, '_layerType');
    return get(getOwner(this).resolveRegistration('config:environment'), `mapbox-gl.${layerType}`);
  }).readOnly(),

  _layout: computed('_envConfig.layout', 'layer.layout', 'layoutOptions', function() {
    return assign({},
      get(this, '_envConfig.layout'),
      get(this, 'layer.layout'),
      get(this, 'layoutOptions'));
  }).readOnly(),

  _paint: computed('_envConfig.paint', 'layer.paint', 'paintOptions', function() {
    return assign({},
      get(this, '_envConfig.paint'),
      get(this, 'layer.paint'),
      get(this, 'paintOptions'));
  }).readOnly(),

  _layer: computed('layer', '_layerId', '_layerType', '_sourceId', '_layout', '_paint', function() {
    const {
      layer,
      _layerId,
      _layerType,
      _sourceId,
      _layout,
      _paint
    } = getProperties(this, 'layer', '_layerId', '_layerType', '_sourceId', '_layout', '_paint');

    const computedLayer = {
      id: _layerId,
      type: _layerType,
      source: _sourceId,
      layout: _layout,
      paint: _paint
    };

    // do this to pick up other properties like filter, re, metadata, source-layer, minzoom, maxzoom, etc
    return assign({}, layer, computedLayer);
  }),

  init() {
    this._super(...arguments);

    const {
      _layer,
      before,

      // All of these properties are deprecated, but remain for backwards compatibility
      sourceId,
      layerType,
      layoutOptions,
      paintOptions
    } = getProperties(this, '_layer', 'before', 'sourceId', 'layerType', 'layoutOptions', 'paintOptions');

    deprecate('Use of `sourceId` is deprecated in favor of `layer.source`', sourceId === null, {
      id: 'ember-mapbox-gl.mapbox-gl-layer',
      until: '1.0.0'
    });

    deprecate('Use of `layerType` is deprecated in favor of `layer.type`', layerType === null, {
      id: 'ember-mapbox-gl.mapbox-gl-layer',
      until: '1.0.0'
    });

    deprecate('Use of `layoutOptions` is deprecated in favor of `layer.layout`', layoutOptions === null, {
      id: 'ember-mapbox-gl.mapbox-gl-layer',
      until: '1.0.0'
    });

    deprecate('Use of `paintOptions` is deprecated in favor of `layer.paint`', paintOptions === null, {
      id: 'ember-mapbox-gl.mapbox-gl-layer',
      until: '1.0.0'
    });

    this.map.addLayer(_layer, before);
  },

  didUpdateAttrs() {
    this._super(...arguments);

    const _layer = get(this, '_layer');

    for (const k in _layer.layout) {
      this.map.setLayoutProperty(_layer.id, k, _layer.layout[k]);
    }

    for (const k in _layer.paint) {
      this.map.setPaintProperty(_layer.id, k, _layer.paint[k]);
    }

    if ('filter' in _layer) {
      this.map.setFilter(_layer.id, _layer.filter);
    }

    this.map.setLayerZoomRange(_layer.id, _layer.minzoom, _layer.maxzoom);
  },

  willDestroy() {
    this._super(...arguments);

    this.map.removeLayer(get(this, '_layerId'));
  }
});