import adminBoundaryStyles from '../helpers/admin-boundary-styles';

const { paint, layout, labelLayout } = adminBoundaryStyles;

export default {
  id: 'neighborhood-tabulation-areas',
  title: 'Neighborhood Tabulation Areas',
  visible: false,
  type: 'carto', // raster, vector, geojson, or carto
  sql: [
    'SELECT the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
    'SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM support_admin_ntaboundaries WHERE ntaname NOT ILIKE \'park-cemetery-etc%\'',
  ],
  layers: [
    {
      layer: {
        id: 'nta-line',
        type: 'line',
        'source-layer': 'layer0',
        paint: paint.lines,
        layout: layout.lines,
      },
    },
    {
      layer: {
        id: 'nta-label',
        type: 'symbol',
        'source-layer': 'layer1',
        minzoom: 12,
        paint: paint.labels,
        layout: labelLayout('ntaname'),
      },
    },
  ],
};
