import Service from '@ember/service';
import { get } from '@ember/object';
import { computed } from '@ember-decorators/object';
import { inject as service } from '@ember-decorators/service';

export default class MapMouseoverService extends Service {
  @service
  registeredLayers;

  currentEvent = null;

  tooltipTemplate = '';

  highlightedLayer = null;

  @computed('currentEvent')
  get mousePosition() {
    const { event } = this.getProperties('currentEvent');

    if (event) {
      const { point: { x, y } } = event;

      return {
        x,
        y,
      };
    }

    return null;
  }

  @computed('mousePosition.{x,y}')
  get hasMousePosition() {
    const { x, y } = this.getProperties('mousePosition.{x,y}');

    return !!(x && y);
  }

  @computed('registeredLayers.visibleLayerIds.@each', 'currentEvent', 'mousePosition')
  get hoveredFeature() {
    const { layers, currentEvent } = this.getProperties('registeredLayers.visibleLayerIds.@each', 'currentEvent', 'mousePosition');

    if (currentEvent) {
      const map = currentEvent.target;

      return map
        .queryRenderedFeatures(
          currentEvent.point,
          { layers },
        )
        .objectAt(0) || {};
    }
    return {};
  }

  @computed('hoveredFeature')
  get tooltipText() {
    const { feature } = this.getProperties('hoveredFeature');

    return get(feature, 'properties.bbl');
  }

  highlightedLotFeatures = [];

  @computed('highlightedLotFeatures')
  get highlightedLotSource() {
    const { features } = this.getProperties('highlightedLotFeatures');

    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
      },
    };
  }

  highlighter() {
    // const map = e.target;
    // this.set('currentEvent', e);

    // // of all registered layers, we only want to query the ones
    // // that exist on the map AND are highlightable

    // const layers = this.get('registeredLayers.highlightableAndVisibleLayerIds');
    // const clickable = this.get('registeredLayers.clickableAndVisibleLayerIds');
    // const features = map.queryRenderedFeatures(e.point, { layers });
    // if (features.length > 0) {
    //   const thisFeature = features[0];

    //   const prevFeature = this.highlightedLotFeatures[0];
    //   if (!prevFeature || thisFeature.id !== prevFeature.id) {
    //     this.set('highlightedLotFeatures', [thisFeature]);
    //     // move the layer
    //     const layerId = thisFeature.layer.id;
    //     this.set('highlightedLayer', layerId);

    //     // set to pointer if the layer-group is also clickable
    //     map.getCanvas().style.cursor = (clickable.indexOf(layerId) > -1) ? 'pointer' : '';

    //     const beforeLayerId = map.getStyle().layers.reduce((acc, curr) => {
    //       if (curr.id === layerId) return 'hit';
    //       if (acc === 'hit') return curr;
    //       return acc;
    //     }).id;

    //     if (map.getLayer('highlighted-lot')) {
    //       map.moveLayer('highlighted-lot', beforeLayerId);
    //     }
    //   }

    //   this.set('tooltipTemplate', this.registeredLayers.getTooltipTemplate(thisFeature.layer.id));
    // } else {
    //   map.getCanvas().style.cursor = '';

    //   this.set('highlightedLotFeatures', []);
    // }
  }
}
