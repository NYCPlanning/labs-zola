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
              ['V', '#0084a8'],
              ['A', '#00a9e6'],
              ['Shaded X', '#00ffc5'],
            ],
          },
          'fill-opacity': 0.7,
        },
      },
      highlightable: true,
      tooltipTemplate: '2007 {{fld_zone}} Zone',
    },
  ],
};
