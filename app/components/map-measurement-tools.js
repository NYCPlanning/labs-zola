import Component from '@ember/component';
import numeral from 'numeral';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import drawStyles from '../layers/draw-styles';

export default class MapMeasurementToolsComponent extends Component {
  @service
  mainMap;

  @service
  metrics;

  measurementUnitType = 'standard';

  drawnMeasurements = null;

  measurementMenuOpen = false;

  drawToolsOpen = false;

  draw = null;

  didStartDraw = false;

  drawDidRender = false;

  drawnFeature = {
    type: 'Feature',
    geometry: null,
  };

  @action
  async startDraw(type) {
    gtag('event', 'draw_tool', {
      event_category: 'Measurement',
      event_action: 'Used measurement tool',
    });

    // GA
    this.get('metrics').trackEvent('MatomoTagManager', {
      category: 'Measurement',
      action: 'Used measurement tool',
      name: 'Measurement',
    });

    this.set('didStartDraw', true);
    const draw = this.get('draw') || await import('mapbox-gl-draw')
      .then(({ default: MapboxDraw }) => new MapboxDraw({
        displayControlsDefault: false,
        styles: drawStyles,
      }));
    this.set('draw', draw);
    const drawMode = type === 'line' ? 'draw_line_string' : 'draw_polygon';
    const { mainMap } = this;
    if (mainMap.get('drawMode')) {
      draw.deleteAll();
    } else {
      mainMap.mapInstance.addControl(draw);
      this.set('drawnFeature', null);
      this.set('drawnMeasurements', null);
    }
    mainMap.set('drawMode', drawMode);
    draw.changeMode(drawMode);
  }

  @action
  clearDraw() {
    const draw = this.get('draw');
    const { mainMap } = this;
    if (mainMap.get('drawMode')) {
      mainMap.mapInstance.removeControl(draw);
    }

    mainMap.set('drawMode', null);
    this.set('drawnFeature', null);
    this.set('drawnMeasurements', null);
  }

  @action
  handleDrawCreate(e) {
    const draw = this.get('draw');
    this.set('drawnFeature', e.features[0].geometry);
    setTimeout(() => {
      if (!this.mainMap.isDestroyed && !this.mainMap.isDestroying) {
        this.mainMap.mapInstance.removeControl(draw);
        this.mainMap.set('drawMode', null);
      }
    }, 100);
  }

  @action
  async handleMeasurement() {
    this.set('drawDidRender', true);
    const draw = this.get('draw');
    // should log both metric and standard display strings for the current drawn feature
    const { features } = draw.getAll();

    if (features.length > 0) {
      const feature = features[0];

      const drawnMeasurements = await calculateMeasurements(feature); //eslint-disable-line

      this.set('drawnMeasurements', drawnMeasurements);
    }
  }

  @action
  handleUnitsToggle(type) {
    this.set('measurementUnitType', type);
  }
}

async function calculateMeasurements(feature) {
  // metric calculation

  // lazy load these deps
  const { default: area } = await import('@turf/area');
  const { default: lineDistance } = await import('@turf/line-distance');

  const drawnLength = (lineDistance(feature) * 1000); // meters
  const drawnArea = area(feature); // square meters

  let metricUnits = 'm';
  let metricFormat = '0,0';
  let metricMeasurement;

  let standardUnits = 'feet';
  let standardFormat = '0,0';
  let standardMeasurement;

  if (drawnLength > drawnArea) { // user is drawing a line
    metricMeasurement = drawnLength;
    if (drawnLength >= 1000) { // if over 1000 meters, upgrade metric
      metricMeasurement = drawnLength / 1000;
      metricUnits = 'km';
      metricFormat = '0.00';
    }

    standardMeasurement = drawnLength * 3.28084;
    if (standardMeasurement >= 5280) { // if over 5280 feet, upgrade standard
      standardMeasurement /= 5280;
      standardUnits = 'mi';
      standardFormat = '0.00';
    }
  } else { // user is drawing a polygon
    metricUnits = 'm²';
    metricFormat = '0,0';
    metricMeasurement = drawnArea;

    standardUnits = 'ft²';
    standardFormat = '0,0';
    standardMeasurement = drawnArea * 10.7639;

    if (drawnArea >= 1000000) { // if over 1,000,000 meters, upgrade metric
      metricMeasurement = drawnArea / 1000000;
      metricUnits = 'km²';
      metricFormat = '0.00';
    }

    if (standardMeasurement >= 27878400) { // if over 27878400 sf, upgrade standard
      standardMeasurement /= 27878400;
      standardUnits = 'mi²';
      standardFormat = '0.00';
    }
  }

  const drawnMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(standardFormat)} ${standardUnits}`,
  };

  return drawnMeasurements;
}
