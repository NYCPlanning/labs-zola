export default {
  id: 'facdb',
  title: 'Facilities',
  type: 'carto',
  sql: 'SELECT the_geom_webmercator, facname, facdomain, uid FROM facdb_170522',
  visible: true,
  layers: [
    {
      layer: {
        id: 'facilities-points-outline',
        type: 'circle',
        source: 'facdb',
        'source-layer': 'layer0',
        paint: {
          'circle-radius': { stops: [[10, 3], [15, 7]] },
          'circle-color': '#012700',
          'circle-opacity': 0.7,
        },
      },
    },
  ],
  filters: [
    {
      columnName: 'proptype',
      type: 'multiSelect',
      disabled: true,
      values: [
        {
          value: 'City Owned',
          label: 'City Owned',
        },
        {
          value: 'City Leased',
          label: 'City Leased',
        },
        {
          value: '',
          label: 'Not Owned or Leased by City',
        },
      ],
    },
  ],
};
