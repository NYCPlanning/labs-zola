const SQUARE_POLYGON = {
  type: 'Polygon',
  coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]],
};

export default (testScope, properties) => {
  testScope.server.get('https://planninglabs.carto.com/api/v2/sql', (schema, request) => {
    const { queryParams } = request;
    const { format } = queryParams;

    if (format === 'geojson') {
      return {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: SQUARE_POLYGON,
          properties,
        }],
      };
    }

    return { rows: [] };
  });
};
