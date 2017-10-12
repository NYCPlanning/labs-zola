export default {
  id: 'preliminary-flood-insurance-rate',
  title: 'Preliminary Flood Insurance Rate Maps 2015',
  visible: false,
  layers: [
    {
      layer: {
        id: 'preliminary-flood-insurance-rate',
        type: 'fill',
        source: 'preliminary-flood-insurance-rate',
        'source-layer': 'preliminary-flood-insurance-rate',
        paint: {
          'fill-outline-color': '#cdcdcd',
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
