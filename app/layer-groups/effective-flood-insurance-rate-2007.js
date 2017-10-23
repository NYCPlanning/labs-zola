export default {
  id: 'effective-flood-insurance-rate-2007',
  title: 'Effective Flood Insurance Rate Maps 2007',
  titleTooltip: 'V Zone: portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger); A Zone: A portion of the area subject to flooding from the 1% annual chance flood; Shaded X Zone: The area of moderate flood risk outside the regulatory 1% annual chance flood but within the limits of the 0.2% annual chance flood level (the 500-year floodplain). ',
  visible: false,
  layers: [
    {
      layer: {
        id: 'effective-flood-insurance-rate-2007',
        type: 'fill',
        source: 'effective-flood-insurance-rate-2007',
        'source-layer': 'effective-flood-insurance-rate-2007',
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
