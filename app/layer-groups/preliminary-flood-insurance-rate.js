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
          'fill-color': {
            property: 'fld_zone',
            type: 'categorical',
            stops: [
              ['V', '#0084a8'],
              ['A', '#00a9e6'],
              ['Shaded X', '#00ffc5'],
            ],
          },
          'fill-opacity': 0.7,
        },
      },
      highlightable: true,
      tooltipTemplate: '2015 {{fld_zone}} Zone',
    },
  ],
};
