export default {
  id: 'effective-flood-insurance-rate-2007',
  title: 'Effective Flood Insurance Rate Maps 2007',
  titleTooltip: 'The Effective Flood Insurance Rate Maps (FIRMs), first adopted by New York City in 1983 and last updated in 2007, establish the floodplain currently subject to the National Flood Insurance Program purchase requirements.',
  visible: false,
  meta: {
    description: 'Effective Flood Insurance Rate Maps (FIRMs) data are available at FEMA Flood Map Service Center',
    url: ['https://msc.fema.gov/portal'],
    updated_at: 'September 2017',
  },
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
