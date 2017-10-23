export default {
  id: 'effective-flood-insurance-rate-2007',
  title: 'Effective Flood Insurance Rate Maps 2007',
  visible: false,
  layers: [
    {
      layer: {
        id: 'effective-flood-insurance-rate-2007',
        type: 'fill',
        source: 'effective-flood-insurance-rate-2007',
        'source-layer': 'effective-flood-insurance-rate-2007',
        paint: {
          'fill-color': {
            property: 'fld_zone',
            type: 'categorical',
            stops: [
              ['VE', '#0084a8'],
              ['AE', '#00a9e6'],
              ['A', '#00a9e6'],
              ['AO', '#00a9e6'],
              ['0.2 PCT ANNUAL CHANCE FLOOD HAZARD', '#00ffc5'],
            ],
          },
          'fill-opacity': 0.7,
        },
      },
    },
  ],
};
