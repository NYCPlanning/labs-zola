export default {
  id: 'preliminary-flood-insurance-rate',
  title: 'Preliminary Flood Insurance Rate Maps 2015',
  titleTooltip: 'V Zone: portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger); A Zone: A portion of the area subject to flooding from the 1% annual chance flood; Shaded X Zone: The area of moderate flood risk outside the regulatory 1% annual chance flood but within the limits of the 0.2% annual chance flood level (the 500-year floodplain). ',
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
