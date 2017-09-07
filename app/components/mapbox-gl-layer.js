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
   * @private for use by mapbox-gl-source to pass in its source-layer
   */
  _sourceLayer: computed('layer', 'sourceLayer', function() {
    const layer = this.get('layer');
    return layer['source-layer'] || '';
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

  _filter: computed('_envConfig.filter', 'layer.filter', function() {
    return get(this, 'layer.filter') || null;
  }).readOnly(),

  init() {
    this._super(...arguments);

    const {
      _layerId,
      _layerType,
      _sourceId,
      _sourceLayer,
      _layout,
      _paint,
      _filter,
      before,

      // All of these properties are deprecated, but remain for backwards compatibility
      sourceId,
      layerType,
      layoutOptions,
      paintOptions
    } = getProperties(this, '_layerId', '_layerType', '_sourceId', '_sourceLayer', '_layout', '_paint', '_filter', 'before', 'sourceId', 'layerType', 'layoutOptions', 'paintOptions');

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

    const layer = {
      id: _layerId,
      type: _layerType,
      source: _sourceId,
      'source-layer': _sourceLayer,
      layout: _layout,
      paint: _paint
    };

    if (_filter !== null) {
      layer.filter = _filter;
    }

    this.map.addLayer(layer, before);
  },

  didUpdateAttrs() {
    this._super(...arguments);

    const {
      _layerId,
      _layout,
      _paint,
      _filter
    } = getProperties(this, '_layerId', '_layout', '_paint', '_filter');

    for (const k in _layout) {
      this.map.setLayoutProperty(_layerId, k, _layout[k]);
    }

    for (const k in _paint) {
      this.map.setPaintProperty(_layerId, k, _paint[k]);
    }

    this.map.setFilter(_layerId, _filter);
  },

  willDestroy() {
    this._super(...arguments);

    this.map.removeLayer(get(this, '_layerId'));
  }
});
