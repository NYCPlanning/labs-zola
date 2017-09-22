import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'nyccouncildistricts',
  title: 'NYC Council Districts',
  visible: false,
  type: 'carto',
  sql: ['SELECT the_geom_webmercator, coundist FROM support_admin_nyccouncildistricts'],
  layers: [
    {
      layer: {
        id: 'nyccouncildistricts-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nyccouncildistricts-label',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: paint.labels,
        layout: labelLayout('coundist'),
      },
    },
  ],
};
