import Component from '@ember/component';
import numeral from 'numeral';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import drawStyles from '../layers/draw-styles';

function formatMeasurements(measurements) {
  // metric calculation

  let metricUnits = 'm';
  let metricFormat = '0,0';
  let metricMeasurement;

  let standardUnits = 'feet';
  let standardFormat = '0,0';
  let standardMeasurement;

  if (measurements.type === 'line') {
    // user is drawing a line
    metricMeasurement = measurements.metric;
    if (measurements.metric >= 1000) {
      // if over 1000 meters, upgrade metric
      metricMeasurement = measurements.metric / 1000;
      metricUnits = 'km';
      metricFormat = '0.00';
    }

    standardMeasurement = measurements.standard;
    if (standardMeasurement >= 5280) {
      // if over 5280 feet, upgrade standard
      standardMeasurement /= 5280;
      standardUnits = 'mi';
      standardFormat = '0.00';
    }
  } else {
    // user is drawing a polygon
    metricUnits = 'm²';
    metricFormat = '0,0';
    metricMeasurement = measurements.metric;

    standardUnits = 'ft²';
    standardFormat = '0,0';
    standardMeasurement = measurements.standard;

    if (measurements.metric >= 1000000) {
      // if over 1,000,000 meters, upgrade metric
      metricMeasurement = measurements.metric / 1000000;
      metricUnits = 'km²';
      metricFormat = '0.00';
    }

    if (standardMeasurement >= 27878400) {
      // if over 27878400 sf, upgrade standard
      standardMeasurement /= 27878400;
      standardUnits = 'mi²';
      standardFormat = '0.00';
    }
  }

  const formattedMeasurements = {
    metric: `${numeral(metricMeasurement).format(metricFormat)} ${metricUnits}`,
    standard: `${numeral(standardMeasurement).format(
      standardFormat
    )} ${standardUnits}`,
  };

  return formattedMeasurements;
}

export default class MapMeasurementToolsComponent extends Component {
  @service mainMap;

  @service metrics;

  measurementUnitType = 'standard';

  drawnMeasurements = null;

  previousStoredMeasurements = {
    type: null,
    metric: 0,
    standard: 0,
  };

  measurementMenuOpen = false;

  drawToolsOpen = false;

  draw = null;

  didStartDraw = false;

  drawDidRender = false;

  drawnFeatures = [];

  @computed(
    'drawnMeasurements.{metric,standard,type}',
    'previousStoredMeasurements.{metric,standard}'
  )
  get shownMeasurements() {
    return formatMeasurements({
      id: crypto.randomUUID(),
      type: this.drawnMeasurements.type,
      metric:
        this.drawnMeasurements.metric + this.previousStoredMeasurements.metric,
      standard:
        this.drawnMeasurements.standard +
        this.previousStoredMeasurements.standard,
    });
  }

  @action
  async startDraw(type) {
    gtag('event', 'draw_tool', {
      event_category: 'Measurement',
      event_action: `Measurement #${this.drawnFeatures.length}`,
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'Measurement',
      action: 'Used measurement tool',
      name: `Measurement #${this.drawnFeatures.length}`,
    });

    this.set('didStartDraw', true);
    const draw =
      this.draw ||
      (await import('@mapbox/mapbox-gl-draw').then(
        ({ default: MapboxDraw }) =>
          new MapboxDraw({
            displayControlsDefault: false,
            styles: drawStyles,
          })
      ));
    this.set('draw', draw);
    const drawMode = type === 'line' ? 'draw_line_string' : 'draw_polygon';
    const { mainMap } = this;
    if (!mainMap.get('drawMode')) {
      mainMap.mapInstance.addControl(draw);
    }
    mainMap.set('drawMode', drawMode);
    draw.changeMode(drawMode);
  }

  @action
  clearDraw() {
    const { draw } = this;
    const { mainMap } = this;
    if (mainMap.get('drawMode')) {
      mainMap.mapInstance.removeControl(draw);
    }

    mainMap.set('drawMode', null);
    this.set('drawnFeatures', []);
    this.set('drawnMeasurements', null);
    this.set('previousStoredMeasurements', { metric: 0, standard: 0 });
  }

  @action
  handleDrawCreate(e) {
    const { draw } = this;

    this.set('drawnFeatures', [
      ...this.drawnFeatures,
      { ...e.features[0].geometry, id: crypto.randomUUID() },
    ]);
    this.set('previousStoredMeasurements', {
      type: this.drawnMeasurements.type,
      metric:
        this.drawnMeasurements.metric + this.previousStoredMeasurements.metric,
      standard:
        this.drawnMeasurements.standard +
        this.previousStoredMeasurements.standard,
    });
    setTimeout(() => {
      if (!this.mainMap.isDestroyed && !this.mainMap.isDestroying) {
        this.mainMap.mapInstance.removeControl(draw);
        this.mainMap.set('drawMode', null);
        this.set('drawnMeasurements', {
          type: this.drawnMeasurements.type,
          metric: 0,
          standard: 0,
        });
      }
    }, 100);
  }

  @action
  async handleMeasurement() {
    this.set('drawDidRender', true);
    const { draw } = this;
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

  const drawnLength = lineDistance(feature) * 1000; // meters
  const drawnArea = area(feature); // square meters

  let featureType;
  let metricMeasurement;
  let standardMeasurement;

  if (drawnLength > drawnArea) {
    // user is drawing a line
    metricMeasurement = drawnLength;
    standardMeasurement = drawnLength * 3.28084;
    featureType = 'line';
  } else {
    // user is drawing a polygon
    metricMeasurement = drawnArea;
    standardMeasurement = drawnArea * 10.7639;
    featureType = 'polygon';
  }

  const drawnMeasurements = {
    metric: metricMeasurement,
    standard: standardMeasurement,
    type: featureType,
  };

  return drawnMeasurements;
}
