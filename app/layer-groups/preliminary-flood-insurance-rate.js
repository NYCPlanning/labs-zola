export default {
  id: 'preliminary-flood-insurance-rate',
  title: 'Preliminary Flood Insurance Rate Maps 2015',
  titleTooltip: 'Released in 2015 as part of a citywide flood map update, the Preliminary FIRMs establish the 1% annual chance floodplain. For building code and zoning purposes, the more expansive of the either the 2015 or 2007 maps is used.',
  visible: false,
  meta: {
    description: 'Flood Insurance Rate Data provided by FEMA',
    url: ['http://www.region2coastal.com/view-flood-maps-data/view-preliminary-flood-map-data/'],
    updated_at: 'September 2017',
  },
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
