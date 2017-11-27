import { lineStyle } from '../utils/polygon-layer-styles';

export default {
  id: 'fresh',
  title: 'FRESH Zones',
  titleTooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives',
  visible: false,
  meta: {
    description: 'FRESH Food Stores Zoning Boundaries release 2016.1, Bytes of the Big Apple',
    url: ['https://www1.nyc.gov/site/planning/data-maps/open-data.page'],
    updated_at: 'September 2017',
  },
  layers: [
    {
      layer: lineStyle('fresh-line', 'supporting-zoning', 'fresh', '#30BF4E'),
    },
    {
      layer: {
        id: 'fresh-fill-zoning-and-tax',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#30BF4E',
          'fill-opacity': 0.2,
        },
        filter: [
          'all',
          [
            '==',
            'name',
            'Zoning and discretionary tax incentives',
          ],
        ],
        layout: {},
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}',
    },
    {
      layer: {
        id: 'fresh-fill-zoning',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#0B9390',
          'fill-opacity': 0.2,
        },
        filter: [
          'all',
          [
            '==',
            'name',
            'Zoning incentives',
          ],
        ],
        layout: {},
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}',
    },
    {
      layer: {
        id: 'fresh-fill-tax',
        type: 'fill',
        source: 'supporting-zoning',
        'source-layer': 'fresh',
        paint: {
          'fill-color': '#8FE339',
          'fill-opacity': 0.2,
        },
        filter: [
          'all',
          [
            '==',
            'name',
            'Discretionary tax incentives',
          ],
        ],
        layout: {},
      },
      highlightable: true,
      tooltipTemplate: 'FRESH - {{{name}}}',
    },
  ],
};
