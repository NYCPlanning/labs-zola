// this fixture file is intended for testing purposes only
// it replaces "real" requests for tile resources with
// s3-provided dummy tiles, fonts, etc.

// the name of this s3-bucket is https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com

// see v3.json also to update the bucket name.

export default {
  data: [
    {
      type: 'layer-groups',
      id: 'zoning-districts',
      attributes: {
        id: 'zoning-districts',
        visible: true,
        legend: {
          label: 'Zoning Districts',
          tooltip: 'A zoning district is a residential, commercial or manufac­turing area of the city within which zoning regulations govern land use and building bulk.',
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'zd-fill',
            },
            {
              type: 'layers',
              id: 'zd-lines',
            },
            {
              type: 'layers',
              id: 'zd_labels',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'zoning-districts',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'street-centerlines',
      attributes: {
        id: 'street-centerlines',
        visible: true,
        legend: {
          label: 'Street Names',
          tooltip: 'Legal street names as shown on the City Map',
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'citymap-street-centerlines-symbol',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'digital-citymap',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'commercial-overlays',
      attributes: {
        id: 'commercial-overlays',
        visible: true,
        legend: {
          label: 'Commercial Overlays',
          tooltip: 'A commercial overlay is a C1 or C2 district mapped within residential districts to serve local retail needs.',
          icon: {
            type: 'fa-icon',
            layers: [
              {
                'fa-icon': 'square',
                prefix: 'far',
                color: 'rgba(220,10,10,0.75)',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'co-fill',
            },
            {
              type: 'layers',
              id: 'co',
            },
            {
              type: 'layers',
              id: 'co_labels',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'zoning-map-amendments',
      attributes: {
        id: 'zoning-map-amendments',
        visible: false,
        legend: {
          label: 'Zoning Map Amendments',
          tooltip: 'Changes to the Zoning Map that have been adopted since 2002',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(159, 199, 62, 0.6)',
                stroke: 'rgba(159, 199, 62, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'zma-line',
            },
            {
              type: 'layers',
              id: 'zma-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'zoning-map-amendments',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'zoning-map-amendments-pending',
      attributes: {
        id: 'zoning-map-amendments-pending',
        visible: false,
        legend: {
          label: 'Pending Zoning Map Amendments',
          tooltip: 'Changes to the Zoning Map that are currently undergoing public review',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(176, 31, 31, 0.6)',
                stroke: 'rgba(176, 31, 31, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'zmacert-line',
            },
            {
              type: 'layers',
              id: 'zmacert-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'zoning-map-amendments',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'special-purpose-districts',
      attributes: {
        id: 'special-purpose-districts',
        visible: false,
        legend: {
          label: 'Special Purpose Districts',
          tooltip: 'The regulations for special purpose districts are designed to supplement and modify the underlying zoning in order to respond to distinctive neighborhoods with particular issues and goals',
          icon: {
            type: 'fa-icon',
            layers: [
              {
                'fa-icon': 'square',
                color: 'rgba(94,102,51, 1)',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'zoning-sp-line',
            },
            {
              type: 'layers',
              id: 'zoning-sp-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'special-purpose-subdistricts',
      attributes: {
        id: 'special-purpose-subdistricts',
        visible: false,
        legend: {
          label: 'Special Purpose Subdistricts',
          tooltip: 'Areas within Special Purpose Districts where unique rules apply. Special Purpose Subdistrict data is currently incomplete. See the Zoning Resolution for a complete description of the special purpose district.',
          infolink: 'https://zr.planning.nyc.gov',
          icon: {
            type: 'fa-icon',
            layers: [
              {
                'fa-icon': 'square',
                color: '#8DA610',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'zoning-sp-sd-line',
            },
            {
              type: 'layers',
              id: 'zoning-sp-sd-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'limited-height-districts',
      attributes: {
        id: 'limited-height-districts',
        visible: false,
        legend: {
          label: 'Limited Height Districts',
          tooltip: 'A limited height district may be superimposed on an area designated as an historic district by the Landmarks Preservation Commission. It is mapped in areas of the Upper East Side, Gramercy Park, Brooklyn Heights and Cobble Hill. The maximum building height is 50 feet in a LH-1 district, 60 feet in a LH-1A district, 70 feet in a LH-2 district and 100 feet in a LH-3 district.',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(118, 66, 10, 0.2)',
                stroke: 'rgba(118, 66, 10, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'limited-height-districts-line',
            },
            {
              type: 'layers',
              id: 'limited-height-districts-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'mandatory-inclusionary-housing',
      attributes: {
        id: 'mandatory-inclusionary-housing',
        visible: false,
        legend: {
          label: 'Mandatory Inclusionary Housing Areas',
          tooltip: 'Areas where developments, enlargements and conversions over a certain size are required to set aside a percentage of floor area for permanently affordable housing',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/inclusionary-housing.page',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(204, 61, 93, 0.2)',
                stroke: 'rgba(204, 61, 93, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'mandatory-inclusionary-housing-line',
            },
            {
              type: 'layers',
              id: 'mandatory-inclusionary-housing-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'inclusionary-housing',
      attributes: {
        id: 'inclusionary-housing',
        visible: false,
        legend: {
          label: 'Inclusionary Housing Designated Areas',
          tooltip: 'Areas where zoning incentives are offered to encourage the creation of permanently affordable housing',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/inclusionary-housing.page',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(229, 115, 0, 0.2)',
                stroke: 'rgba(229, 115, 0, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'inclusionary-housing-line',
            },
            {
              type: 'layers',
              id: 'inclusionary-housing-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'transit-zones',
      attributes: {
        id: 'transit-zones',
        visible: false,
        legend: {
          label: 'Transit Zones',
          tooltip: 'Transit-accessible areas where parking is optional for new affordable housing units and special rules apply to existing affordable units',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/glossary.page#transit_zone',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(230, 214, 46, 0.2)',
                stroke: 'rgba(230, 214, 46, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'transit-zones-line',
            },
            {
              type: 'layers',
              id: 'transit-zones-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'fresh',
      attributes: {
        id: 'fresh',
        visible: false,
        legend: {
          label: 'FRESH Zones',
          tooltip: 'FRESH promotes the establishment and expansion of neighborhood grocery stores in underserved communities by providing zoning and financial incentives',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/fresh-food-stores.page',
          items: [
            {
              label: 'Zoning incentives',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: 'rgba(11, 147, 144, 0.2)',
                  },
                ],
              },
            },
            {
              label: 'Zoning and discretionary tax incentives',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: 'rgba(48, 191, 78, 0.2)',
                  },
                ],
              },
            },
            {
              label: 'Discretionary tax incentives',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: 'rgba(143, 227, 57, 0.2)',
                  },
                ],
              },
            },
          ],
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'fresh-line',
            },
            {
              type: 'layers',
              id: 'fresh-fill-zoning-and-tax',
            },
            {
              type: 'layers',
              id: 'fresh-fill-zoning',
            },
            {
              type: 'layers',
              id: 'fresh-fill-tax',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'sidewalk-cafes',
      attributes: {
        id: 'sidewalk-cafes',
        visible: false,
        legend: {
          label: 'Sidewalk Cafes',
          tooltip: 'Areas where different types of sidewalk cafes are permitted on public sidewalks',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/sidewalk-cafes.page',
          items: [
            {
              label: 'All Cafes Permitted',
              icon: {
                type: 'line',
                layers: [
                  {
                    stroke: '#28AD15',
                  },
                ],
              },
            },
            {
              label: 'Small Cafes Permitted',
              icon: {
                type: 'line',
                layers: [
                  {
                    stroke: '#CC3DCA',
                  },
                ],
              },
            },
            {
              label: 'Unenclosed and Small Cafes Permitted',
              icon: {
                type: 'line',
                layers: [
                  {
                    stroke: '#216BC6',
                  },
                ],
              },
            },
          ],
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'sidewalkcafes-line-all',
            },
            {
              type: 'layers',
              id: 'sidewalkcafes-line-small',
            },
            {
              type: 'layers',
              id: 'sidewalkcafes-line-unenclosed',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'low-density-growth-mgmt-areas',
      attributes: {
        id: 'low-density-growth-mgmt-areas',
        visible: false,
        legend: {
          label: 'Lower Density Growth Management Areas',
          tooltip: 'Areas where special zoning controls intend to limit growth and better match available infrastructure and services in lower-density areas experiencing rapid development',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/lower-density-growth-mngmt.page',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(157, 71, 178, 0.2)',
                stroke: 'rgba(157, 71, 178, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'low-density-growth-mgmt-areas-line',
            },
            {
              type: 'layers',
              id: 'low-density-growth-mgmt-areas-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'coastal-zone-boundary',
      attributes: {
        id: 'coastal-zone-boundary',
        visible: false,
        legend: {
          label: 'Coastal Zone Boundary',
          tooltip: 'Projects within the coastal zone boundary are subject to additional review under the Waterfront Revitalization Program',
          infolink: 'https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-wrp.page',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(93, 198, 228, 0.2)',
                stroke: 'rgba(93, 198, 228, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'coastal-zone-boundary-line',
            },
            {
              type: 'layers',
              id: 'coastal-zone-boundary-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'waterfront-access-plan',
      attributes: {
        id: 'waterfront-access-plan',
        visible: false,
        legend: {
          label: 'Waterfront Access Plan',
          tooltip: 'These areas reflect site specific modification of waterfront public access requirements for waterfront parcels with unique conditions and opportunities',
          infolink: 'https://www1.nyc.gov/site/planning/zoning/districts-tools/waterfront-zoning.page',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(0, 164, 210, 0.2)',
                stroke: 'rgba(0, 164, 210, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'waterfront-access-plan-line',
            },
            {
              type: 'layers',
              id: 'waterfront-access-plan-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'historic-districts',
      attributes: {
        id: 'historic-districts',
        visible: false,
        legend: {
          label: 'Historic Districts',
          tooltip: 'Areas designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(70, 130, 180, 0.2)',
                stroke: 'rgba(70, 130, 180, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'historic-districts-line',
            },
            {
              type: 'layers',
              id: 'historic-districts-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'landmark-historic',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'floodplain-efirm2007',
      attributes: {
        id: 'floodplain-efirm2007',
        visible: false,
        legend: {
          label: 'Effective Flood Insurance Rate Maps 2007',
          tooltip: 'The Effective Flood Insurance Rate Maps (FIRMs), first adopted by New York City in 1983 and last updated in 2007, establish the floodplain currently subject to the National Flood Insurance Program purchase requirements.',
          infolink: 'https://www1.nyc.gov/site/planning/plans/climate-resiliency-faq.page',
          items: [
            {
              label: 'V Zone',
              tooltip: 'Portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger). V Zones are subject to more stringent building requirements than other zones because of the damaging force of waves.',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: '#0084a8',
                  },
                ],
              },
            },
            {
              label: 'A Zone',
              tooltip: 'A portion of the area subject to flooding from the 1% annual chance flood. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: '#00a9e6',
                  },
                ],
              },
            },
          ],
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'effective-flood-insurance-rate-2007',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'floodplains',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'floodplain-pfirm2015',
      attributes: {
        id: 'floodplain-pfirm2015',
        visible: false,
        legend: {
          label: 'Preliminary Flood Insurance Rate Maps 2015',
          tooltip: 'Released in 2015 as part of a citywide flood map update, the Preliminary FIRMs establish the 1% annual chance floodplain. For building code and zoning purposes, the more expansive of the either the 2015 or 2007 maps is used.',
          infolink: 'https://www1.nyc.gov/site/planning/plans/climate-resiliency-faq.page',
          items: [
            {
              label: 'V Zone',
              tooltip: 'Portion of the 1% annual chance floodplain subject to high velocity wave action (a breaking wave 3 feet high or larger). V Zones are subject to more stringent building requirements than other zones because of the damaging force of waves.',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: '#0084a8',
                  },
                ],
              },
            },
            {
              label: 'A Zone',
              tooltip: 'A portion of the area subject to flooding from the 1% annual chance flood. These areas are not subject to high velocity wave action but are still considered high risk flooding areas.',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'square',
                    color: '#00a9e6',
                  },
                ],
              },
            },
          ],
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'preliminary-flood-insurance-rate',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'floodplains',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'appendixj-designated-mdistricts',
      attributes: {
        id: 'appendixj-designated-mdistricts',
        visible: false,
        legend: {
          label: 'Appendix J Designated M Districts',
          tooltip: 'Designated areas within Manufacturing Districts in which self service storage facilities are subject to certain as-of-right provisions (subarea 1) or are subject to special permit by the City Planning Commission (subarea 2)',
          infolink: 'https://www1.nyc.gov/assets/planning/download/pdf/data-maps/open-data/designated_areas_m_districts_metadata.pdf',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(243, 51, 225, 0.2)',
                stroke: 'rgba(243, 51, 225, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'appendixj-designated-mdistricts-line',
            },
            {
              type: 'layers',
              id: 'appendixj-designated-mdistricts-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'business-improvement-districts',
      attributes: {
        id: 'business-improvement-districts',
        visible: false,
        legend: {
          label: 'Business Improvement Districts',
          tooltip: 'A Business Improvement District (BID) is a geographical area where local stakeholders oversee and fund the maintenance, improvement, and promotion of their commercial district.',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(118, 66, 10, 0.2)',
                stroke: 'rgba(118, 66, 10, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'business-improvement-districts-line',
            },
            {
              type: 'layers',
              id: 'business-improvement-districts-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'industrial-business-zones',
      attributes: {
        id: 'industrial-business-zones',
        visible: false,
        legend: {
          label: 'Industrial Business Zones',
          tooltip: 'Industrial Business Zones (IBZs) are areas where expanded business services are available for industrial and manufacturing businesses. This designation fosters high-performing business districts by creating competitive advantages over locating in areas outside of New York City.',
          icon: {
            type: 'rectangle',
            layers: [
              {
                fill: 'rgba(43, 10, 118, 0.2)',
                stroke: 'rgba(43, 10, 118, 0.6)',
                'stroke-dasharray': '1',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'industrial-business-zones-line',
            },
            {
              type: 'layers',
              id: 'industrial-business-zones-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'boroughs',
      attributes: {
        id: 'boroughs',
        visible: false,
        legend: {
          label: 'Boroughs',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#edbd12',
                'stroke-width': 4,
                'stroke-opacity': 0.5,
              },
              {
                stroke: '#7a6000',
                'stroke-width': 1.5,
                'stroke-opacity': 0.8,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'boroughs-line-glow',
            },
            {
              type: 'layers',
              id: 'boroughs-line',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'community-districts',
      attributes: {
        id: 'community-districts',
        visible: false,
        legend: {
          label: 'Community Districts',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#a5ed12',
                'stroke-width': 4,
                'stroke-opacity': 0.5,
              },
              {
                stroke: '#527a00',
                'stroke-width': 1.5,
                'stroke-opacity': 0.8,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'community-districts-line-glow',
            },
            {
              type: 'layers',
              id: 'community-districts-line',
            },
            {
              type: 'layers',
              id: 'community-districts-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'nyc-council-districts',
      attributes: {
        id: 'nyc-council-districts',
        visible: false,
        legend: {
          label: 'NYC Council Districts',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#12eded',
                'stroke-width': 4,
                'stroke-opacity': 0.7,
              },
              {
                stroke: '#007a7a',
                'stroke-width': 1.5,
                'stroke-opacity': 0.8,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'nyc-council-districts-line-glow',
            },
            {
              type: 'layers',
              id: 'nyc-council-districts-line',
            },
            {
              type: 'layers',
              id: 'nyc-council-districts-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'nyc-council-districts-combined',
      attributes: {
        id: 'nyc-council-districts-combined',
        title: 'NYC Council Districts',
        visible: false,
        meta: {
          description: 'Administrative and Political Districts v17D, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data.page',
          ],
          'updated-at': '15 May 2023',
        },
        legend: {
          label: 'NYC Council Districts',
          tooltip: '2013-2023 NYC Council District boundaries remain in effect until the end of the year. 2024-2033 boundaries are used in the November 7th, 2023 City Council election.',
        },
        'legend-icon': 'admin-line',
        'legend-color': '#76CAF5',
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'dcp_city_council_districts_combined-line-glow',
            },
            {
              type: 'layers',
              id: 'dcp_city_council_districts_combined-line',
            },
            {
              type: 'layers',
              id: 'dcp_city_council_districts_combined-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'ny-senate-districts',
      attributes: {
        id: 'ny-senate-districts',
        visible: false,
        legend: {
          label: 'NY State Senate Districts',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#9912ed',
                'stroke-width': 4,
                'stroke-opacity': 0.4,
              },
              {
                stroke: '#4b007a',
                'stroke-width': 1.5,
                'stroke-opacity': 0.6,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'nysenatedistricts-line-glow',
            },
            {
              type: 'layers',
              id: 'nysenatedistricts-line',
            },
            {
              type: 'layers',
              id: 'nysenatedistricts-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'assembly-districts',
      attributes: {
        id: 'assembly-districts',
        visible: false,
        legend: {
          label: 'NY State Assembly Districts',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#ed1294',
                'stroke-width': 4,
                'stroke-opacity': 0.4,
              },
              {
                stroke: '#7a0048',
                'stroke-width': 1.5,
                'stroke-opacity': 0.8,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'assemblydistricts-line-glow',
            },
            {
              type: 'layers',
              id: 'assemblydistricts-line',
            },
            {
              type: 'layers',
              id: 'assemblydistricts-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'neighborhood-tabulation-areas',
      attributes: {
        id: 'neighborhood-tabulation-areas',
        visible: false,
        legend: {
          label: 'Neighborhood Tabulation Areas',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: '#2929ed',
                'stroke-width': 4,
                'stroke-opacity': 0.3,
              },
              {
                stroke: '#00007a',
                'stroke-width': 1.5,
                'stroke-opacity': 0.6,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'nta-line-glow',
            },
            {
              type: 'layers',
              id: 'nta-line',
            },
            {
              type: 'layers',
              id: 'nta-label',
            },
            {
              type: 'layers',
              id: 'neighborhood-tabulation-areas-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'admin-boundaries',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'subway',
      attributes: {
        id: 'subway',
        visible: true,
        legend: {
          label: 'Subways',
          icon: {
            type: 'line',
            layers: [
              {
                stroke: 'rgba(238, 53, 46, 1)',
                'stroke-width': 2,
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'subway_green',
            },
            {
              type: 'layers',
              id: 'subway_yellow',
            },
            {
              type: 'layers',
              id: 'subway_gray',
            },
            {
              type: 'layers',
              id: 'subway_brown',
            },
            {
              type: 'layers',
              id: 'subway_light_green',
            },
            {
              type: 'layers',
              id: 'subway_orange',
            },
            {
              type: 'layers',
              id: 'subway_blue',
            },
            {
              type: 'layers',
              id: 'subway_purple',
            },
            {
              type: 'layers',
              id: 'subway_red',
            },
            {
              type: 'layers',
              id: 'subway_stations',
            },
            {
              type: 'layers',
              id: 'subway_stations_labels',
            },
            {
              type: 'layers',
              id: 'subway_entrances',
            },
            {
              type: 'layers',
              id: 'subway_entrances_labels',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'transportation',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'building-footprints',
      attributes: {
        id: 'building-footprints',
        visible: true,
        legend: {
          label: 'Building Footprints',
          tooltip: 'Building footprints based on OpenStreetMap data',
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'building-footprints',
            },
          ],
        },
        sources: {
          data: [

          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'three-d-buildings',
      attributes: {
        id: 'three-d-buildings',
        visible: false,
        legend: {
          label: '3D Buildings',
          tooltip: 'Extruded building height from OpenStreetMap data',
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'three-d-buildings',
            },
          ],
        },
        sources: {
          data: [

          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'aerials',
      attributes: {
        id: 'aerials',
        visible: false,
        legend: {
          label: 'Aerial Imagery',
          tooltip: 'Aerial Photos Raster Tiles provided by DoITT GIS',
        },
        'layer-visibility-type': 'singleton',
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'aerials-2016',
            },
            {
              type: 'layers',
              id: 'aerials-2014',
            },
            {
              type: 'layers',
              id: 'aerials-2012',
            },
            {
              type: 'layers',
              id: 'aerials-2010',
            },
            {
              type: 'layers',
              id: 'aerials-2008',
            },
            {
              type: 'layers',
              id: 'aerials-2006',
            },
            {
              type: 'layers',
              id: 'aerials-2004',
            },
            {
              type: 'layers',
              id: 'aerials-20012',
            },
            {
              type: 'layers',
              id: 'aerials-1996',
            },
            {
              type: 'layers',
              id: 'aerials-1951',
            },
            {
              type: 'layers',
              id: 'aerials-1924',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'aerials-1924',
            },
            {
              type: 'sources',
              id: 'aerials-1951',
            },
            {
              type: 'sources',
              id: 'aerials-1996',
            },
            {
              type: 'sources',
              id: 'aerials-20012',
            },
            {
              type: 'sources',
              id: 'aerials-2004',
            },
            {
              type: 'sources',
              id: 'aerials-2006',
            },
            {
              type: 'sources',
              id: 'aerials-2008',
            },
            {
              type: 'sources',
              id: 'aerials-2010',
            },
            {
              type: 'sources',
              id: 'aerials-2012',
            },
            {
              type: 'sources',
              id: 'aerials-2014',
            },
            {
              type: 'sources',
              id: 'aerials-2016',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'tax-lots',
      attributes: {
        id: 'tax-lots',
        visible: true,
        legend: {
          label: 'Tax Lots',
          tooltip: 'A tax lot is a parcel of land identified with a unique borough, block and lot number for property tax purposes.',
          icon: {
            type: 'fa-icon',
            layers: [
              {
                'fa-icon': 'square-o',
                color: 'rgba(130, 130, 130, 1)',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'pluto-fill',
            },
            {
              type: 'layers',
              id: 'pluto-line',
            },
            {
              type: 'layers',
              id: 'pluto-labels',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'pluto',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'landmarks',
      attributes: {
        id: 'landmarks',
        visible: false,
        legend: {
          label: 'Landmarks',
          tooltip: 'Sites designated by the NYC Landmarks Preservation Commission that possess historical significance and to which special zoning regulations apply',
          items: [
            {
              label: 'Individual Landmarks',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'circle',
                    color: 'rgba(147, 245, 201, 1)',
                    transform: 'shrink-4',
                  },
                  {
                    'fa-icon': 'circle',
                    prefix: 'far',
                    color: '#012700',
                    transform: 'shrink-4',
                  },
                ],
              },
            },
            {
              label: 'Interior Landmarks',
              icon: {
                type: 'fa-icon',
                layers: [
                  {
                    'fa-icon': 'circle',
                    color: 'rgba(152, 152, 247, 1)',
                    transform: 'shrink-4',
                  },
                  {
                    'fa-icon': 'circle',
                    prefix: 'far',
                    color: '#012700',
                    transform: 'shrink-4',
                  },
                ],
              },
            },
            {
              label: 'Scenic Landmarks',
              icon: {
                type: 'rectangle',
                layers: [
                  {
                    fill: 'rgba(153, 18, 237, 0.2)',
                    stroke: 'rgba(153, 18, 237, 0.6)',
                    'stroke-dasharray': '1',
                  },
                ],
              },
            },
          ],
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'landmarks_v0-circle-outline',
            },
            {
              type: 'layers',
              id: 'landmarks_v0-circle',
            },
            {
              type: 'layers',
              id: 'scenic-landmarks-line',
            },
            {
              type: 'layers',
              id: 'scenic-landmarks-fill',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'landmark-historic',
            },
          ],
        },
      },
    },
    {
      type: 'layer-groups',
      id: 'e-designations',
      attributes: {
        id: 'e-designations',
        visible: false,
        legend: {
          label: 'Environmental Designations',
          tooltip: 'An E-Designation is a NYC zoning map designation that indicates the presence of an environmental requirement pertaining to potential Hazardous Materials Contamination, Window/Wall Noise Attenuation, or Air Quality impacts on a particular tax lot.',
          infolink: 'https://www1.nyc.gov/site/planning/applicants/e-faq.page',
          icon: {
            type: 'fa-icon',
            layers: [
              {
                'fa-icon': 'circle',
                color: 'rgba(255, 255, 255, 0.65)',
              },
              {
                'fa-icon': 'circle',
                prefix: 'far',
                color: 'rgba(52, 33, 220, 1)',
              },
            ],
          },
        },
      },
      relationships: {
        layers: {
          data: [
            {
              type: 'layers',
              id: 'e-designations-circle',
            },
            {
              type: 'layers',
              id: 'e-designations-label',
            },
          ],
        },
        sources: {
          data: [
            {
              type: 'sources',
              id: 'supporting-zoning',
            },
          ],
        },
      },
    },
  ],
  included: [
    {
      type: 'layers',
      id: 'zd-fill',
      attributes: {
        style: {
          id: 'zd-fill',
          type: 'fill',
          source: 'zoning-districts',
          'source-layer': 'zoning-districts',
          paint: {
            'fill-color': {
              property: 'primaryzone',
              type: 'categorical',
              stops: [
                [
                  'BP',
                  '#808080',
                ],
                [
                  'C1',
                  '#ffa89c',
                ],
                [
                  'C2',
                  '#fd9a8f',
                ],
                [
                  'C3',
                  '#fa867c',
                ],
                [
                  'C4',
                  '#f76e67',
                ],
                [
                  'C5',
                  '#f2544e',
                ],
                [
                  'C6',
                  '#ee3a36',
                ],
                [
                  'C7',
                  '#ea2220',
                ],
                [
                  'C8',
                  '#e50000',
                ],
                [
                  'M1',
                  '#f3b3ff',
                ],
                [
                  'M2',
                  '#e187f3',
                ],
                [
                  'M3',
                  '#cf5ce6',
                ],
                [
                  'PA',
                  '#78D271',
                ],
                [
                  'R1',
                  '#fff8a6',
                ],
                [
                  'R2',
                  '#fff7a6',
                ],
                [
                  'R3',
                  '#fff797',
                ],
                [
                  'R4',
                  '#fff584',
                ],
                [
                  'R5',
                  '#fff36c',
                ],
                [
                  'R6',
                  '#fff153',
                ],
                [
                  'R7',
                  '#ffee39',
                ],
                [
                  'R8',
                  '#ffec22',
                ],
                [
                  'R9',
                  '#ffeb0e',
                ],
                [
                  'R10',
                  '#ffea00',
                ],
              ],
            },
            'fill-opacity': {
              stops: [
                [
                  15,
                  0.3,
                ],
                [
                  16,
                  0,
                ],
              ],
            },
            'fill-antialias': true,
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-districts',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Zoning District {{{zonedist}}}',
      },
    },
    {
      type: 'layers',
      id: 'zd-lines',
      attributes: {
        style: {
          id: 'zd-lines',
          type: 'line',
          source: 'zoning-districts',
          'source-layer': 'zoning-districts',
          paint: {
            'line-opacity': {
              stops: [
                [
                  12,
                  0,
                ],
                [
                  13,
                  0.2,
                ],
                [
                  16,
                  0.5,
                ],
              ],
            },
            'line-width': {
              stops: [
                [
                  13,
                  1,
                ],
                [
                  14,
                  3,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-districts',
          },
        },
        before: 'place_other',
      },
    },
    {
      type: 'layers',
      id: 'zd_labels',
      attributes: {
        style: {
          id: 'zd_labels',
          source: 'zoning-districts',
          type: 'symbol',
          'source-layer': 'zoning-districts',
          paint: {
            'text-color': {
              stops: [
                [
                  15,
                  '#626262',
                ],
                [
                  16,
                  '#444',
                ],
              ],
            },
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
            'text-opacity': {
              stops: [
                [
                  12,
                  0,
                ],
                [
                  13,
                  1,
                ],
              ],
            },
          },
          layout: {
            'symbol-placement': 'point',
            'text-field': '{zonedist}',
            'text-size': {
              stops: [
                [
                  10,
                  8,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-districts',
          },
        },
      },
    },
    {
      type: 'sources',
      id: 'zoning-districts',
      attributes: {
        id: 'zoning-districts',
        type: 'cartovector',
        'source-layers': [
          {
            id: 'zoning-districts',
            sql: "SELECT cartodb_id AS id, * FROM (SELECT the_geom_webmercator, zonedist, CASE WHEN SUBSTRING(zonedist, 3, 1) = '-' THEN LEFT(zonedist, 2) WHEN SUBSTRING(zonedist, 3, 1) ~ E'[A-Z]' THEN LEFT(zonedist, 2) WHEN SUBSTRING(zonedist, 3, 1) ~ E'[0-9]' THEN LEFT(zonedist, 3) ELSE zonedist END as primaryzone, cartodb_id FROM zoning_districts) a",
          },
        ],
        meta: {
          description: 'NYC GIS Zoning Features April 2019, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data.page',
          ],
          data_date: 'April 2019',
          updated_at: 'April 2019',
        },
      },
    },
    {
      type: 'layers',
      id: 'citymap-street-centerlines-symbol',
      attributes: {
        style: {
          id: 'citymap-street-centerlines-symbol',
          type: 'symbol',
          source: 'digital-citymap',
          'source-layer': 'street-centerlines',
          minzoom: 13,
          layout: {
            'text-field': '{streetname}{streetwidth}',
            'text-keep-upright': true,
            'symbol-placement': 'line',
            'text-size': 12,
            visibility: 'visible',
          },
          paint: {
            'text-color': 'rgba(37, 37, 37, 1)',
            'text-halo-color': '#fff',
            'text-translate': [
              0,
              0,
            ],
            'text-halo-width': 2,
            'text-halo-blur': 1,
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'street-centerlines',
          },
        },
        before: 'place_country_major',
      },
    },
    {
      type: 'sources',
      id: 'digital-citymap',
      attributes: {
        id: 'digital-citymap',
        type: 'cartovector',
        'source-layers': [
          {
            id: 'bulkhead-lines',
            sql: 'SELECT the_geom_webmercator, jurisdicti FROM citymap_bulkheadlines',
          },
          {
            id: 'arterials',
            sql: 'SELECT the_geom_webmercator, route_type FROM citymap_arterials',
          },
          {
            id: 'pierhead-lines',
            sql: 'SELECT the_geom_webmercator, jurisdicti FROM citymap_pierheadlines',
          },
          {
            id: 'amendments',
            sql: "SELECT the_geom_webmercator, ST_Area(the_geom) as area, cartodb_id as id, altmappdf, extract(epoch from effective) as effective, status FROM citymap_amendments WHERE effective IS NOT NULL OR status = '13' ORDER BY area DESC",
          },
          {
            id: 'street-centerlines',
            sql: "SELECT the_geom_webmercator, official_s AS streetname, COALESCE('   (' || streetwidt || ' ft)') AS streetwidth, roadway_ty, feature_st FROM citymap_streetcenterlines",
          },
          {
            id: 'citymap',
            sql: 'SELECT the_geom_webmercator, type, boro_nm FROM citymap_citymap',
          },
          {
            id: 'name-changes-points',
            sql: "SELECT the_geom_webmercator, intronumbe, intro_year, ll_effecti, CASE WHEN honoraryna = 'none' THEN officialna ELSE honoraryna END FROM citymap_streetnamechanges_points",
          },
          {
            id: 'name-changes-lines',
            sql: "SELECT the_geom_webmercator, intronumbe, intro_year, ll_effecti, CASE WHEN honoraryna = 'none' THEN officialna ELSE honoraryna END FROM citymap_streetnamechanges_streets",
          },
          {
            id: 'name-changes-areas',
            sql: "SELECT the_geom_webmercator, intronumbe, intro_year, ll_effecti, CASE WHEN honoraryna = 'none' THEN officialna ELSE honoraryna END FROM citymap_streetnamechanges_areas",
          },
          {
            id: 'rail-lines',
            sql: 'SELECT the_geom_webmercator, street FROM citymap_rails',
          },
        ],
        meta: {
          description: 'NYC Department of City Planning Technical Review Division',
          updated_at: '6 April 2018',
        },
      },
    },
    {
      type: 'layers',
      id: 'co-fill',
      attributes: {
        style: {
          id: 'co-fill',
          type: 'fill',
          source: 'supporting-zoning',
          minzoom: 12,
          'source-layer': 'commercial-overlays',
          paint: {
            'fill-outline-color': '#cdcdcd',
            'fill-opacity': 0,
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'commercial-overlays',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{overlay}}}',
      },
    },
    {
      type: 'layers',
      id: 'co',
      attributes: {
        style: {
          id: 'co',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'commercial-overlays',
          paint: {
            'line-width': {
              stops: [
                [
                  12,
                  0.1,
                ],
                [
                  15,
                  2,
                ],
              ],
            },
            'line-color': 'rgba(220,10,10,0.75)',
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'commercial-overlays',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'co_labels',
      attributes: {
        style: {
          id: 'co_labels',
          type: 'symbol',
          source: 'supporting-zoning',
          'source-layer': 'commercial-overlays',
          paint: {
            'text-color': 'rgba(200, 0, 0, 1)',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
            'text-opacity': 0.9,
          },
          layout: {
            'symbol-placement': 'point',
            'text-field': '{overlay}',
            visibility: 'visible',
          },
          minzoom: 14,
          metadata: {
            'nycplanninglabs:layergroupid': 'commercial-overlays',
          },
        },
        before: 'place_country_major',
      },
    },
    {
      type: 'sources',
      id: 'supporting-zoning',
      attributes: {
        id: 'supporting-zoning',
        type: 'cartovector',
        'source-layers': [
          {
            id: 'commercial-overlays',
            sql: 'SELECT cartodb_id AS id, * FROM commercial_overlays',
          },
          {
            id: 'special-purpose-districts',
            sql: 'SELECT the_geom_webmercator, cartodb_id, sdlbl, sdname FROM dcp_special_purpose_districts',
          },
          {
            id: 'special-purpose-subdistricts',
            sql: 'SELECT the_geom_webmercator, cartodb_id, splbl, spname, subdist FROM special_purpose_subdistricts',
          },
          {
            id: 'mandatory-inclusionary-housing',
            sql: 'SELECT the_geom_webmercator, projectnam, mih_option FROM mandatory_inclusionary_housing',
          },
          {
            id: 'inclusionary-housing',
            sql: 'SELECT the_geom_webmercator, projectnam FROM inclusionary_housing',
          },
          {
            id: 'transit-zones',
            sql: 'SELECT the_geom_webmercator FROM transitzones',
          },
          {
            id: 'fresh',
            sql: 'SELECT the_geom_webmercator, name FROM fresh_zones',
          },
          {
            id: 'sidewalk-cafes',
            sql: 'SELECT the_geom_webmercator, cafetype FROM sidewalk_cafes',
          },
          {
            id: 'low-density-growth-mgmt-areas',
            sql: 'SELECT the_geom_webmercator FROM lower_density_growth_management_areas',
          },
          {
            id: 'coastal-zone-boundary',
            sql: 'SELECT the_geom_webmercator FROM coastal_zone_boundary',
          },
          {
            id: 'waterfront-access-plan',
            sql: 'SELECT the_geom_webmercator, name FROM waterfront_access_plan',
          },
          {
            id: 'limited-height-districts',
            sql: 'SELECT the_geom_webmercator, lhlbl, lhname FROM limited_height_districts',
          },
          {
            id: 'business-improvement-districts',
            sql: 'SELECT the_geom_webmercator, bid FROM business_improvement_districts',
          },
          {
            id: 'e-designations',
            sql: 'SELECT the_geom_webmercator, bbl, ceqr_num, enumber, ulurp_num FROM e_designations',
          },
          {
            id: 'industrial-business-zones',
            sql: 'SELECT the_geom_webmercator, name FROM industrial_business_zones',
          },
          {
            id: 'appendixj-designated-mdistricts',
            sql: 'SELECT the_geom_webmercator, name, subarea FROM appendixj_designated_mdistricts',
          },
        ],
        meta: {
          description: 'Zoning related datasets April 2019, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data.page#zoning_related',
          ],
          data_date: 'April 2019',
          updated_at: 'April 2019',
        },
      },
      relationships: {

      },
    },
    {
      type: 'layers',
      id: 'zma-line',
      attributes: {
        style: {
          id: 'zma-line',
          type: 'line',
          source: 'zoning-map-amendments',
          'source-layer': 'zoning-map-amendments',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(159, 199, 62, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-map-amendments',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'zma-fill',
      attributes: {
        style: {
          id: 'zma-fill',
          type: 'fill',
          source: 'zoning-map-amendments',
          'source-layer': 'zoning-map-amendments',
          paint: {
            'fill-color': 'rgba(159, 199, 62, 0.6)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-map-amendments',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{project_na}}} - Effective {{{effectiveformatted}}}',
      },
    },
    {
      type: 'sources',
      id: 'zoning-map-amendments',
      attributes: {
        id: 'zoning-map-amendments',
        type: 'cartovector',
        'source-layers': [
          {
            id: 'zoning-map-amendments',
            sql: "SELECT * FROM (SELECT the_geom_webmercator, to_char(effective, 'MM/DD/YYYY') as effectiveformatted, extract(epoch from effective) * 1000 as effective_epoch, ulurpno, status, project_na FROM planninglabs.dcp_zoning_map_amendments WHERE status = 'Adopted') a",
          },
          {
            id: 'zoning-map-amendments-pending',
            sql: "SELECT the_geom_webmercator, ulurpno, status, project_na FROM dcp_zoning_map_amendments WHERE status = 'Certified'",
          },
        ],
        meta: {
          description: 'NYC GIS Zoning Features April 2019, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-gis-zoning.page',
          ],
          data_date: 'April 2019',
          updated_at: 'April 2019',
        },
      },
      relationships: {

      },
    },
    {
      type: 'layers',
      id: 'zmacert-line',
      attributes: {
        style: {
          id: 'zmacert-line',
          type: 'line',
          source: 'zoning-map-amendments',
          'source-layer': 'zoning-map-amendments-pending',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(176, 31, 31, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-map-amendments-pending',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'zmacert-fill',
      attributes: {
        style: {
          id: 'zmacert-fill',
          type: 'fill',
          source: 'zoning-map-amendments',
          'source-layer': 'zoning-map-amendments-pending',
          paint: {
            'fill-color': 'rgba(176, 31, 31, 0.6)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'zoning-map-amendments-pending',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{project_na}}}',
      },
    },
    {
      type: 'layers',
      id: 'zoning-sp-line',
      attributes: {
        style: {
          id: 'zoning-sp-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'special-purpose-districts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(94,102,51, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'special-purpose-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'zoning-sp-fill',
      attributes: {
        style: {
          id: 'zoning-sp-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'special-purpose-districts',
          paint: {
            'fill-color': '#5E6633',
            'fill-opacity': 0.2,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'special-purpose-districts',
          },
        },
        clickable: true,
        highlightable: true,
      },
    },
    {
      type: 'layers',
      id: 'zoning-sp-sd-line',
      attributes: {
        style: {
          id: 'zoning-sp-sd-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'special-purpose-subdistricts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': '#8DA610',
            'line-dasharray': [
              1,
              1,
            ],
            'line-opacity': 0.6,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'special-purpose-subdistricts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'zoning-sp-sd-fill',
      attributes: {
        style: {
          id: 'zoning-sp-sd-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'special-purpose-subdistricts',
          paint: {
            'fill-color': '#8DA610',
            'fill-opacity': 0.2,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'special-purpose-subdistricts',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{spname}}} - {{{subdist}}}',
      },
    },
    {
      type: 'layers',
      id: 'limited-height-districts-line',
      attributes: {
        style: {
          id: 'limited-height-districts-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'limited-height-districts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(118, 66, 10, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'limited-height-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'limited-height-districts-fill',
      attributes: {
        style: {
          id: 'limited-height-districts-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'limited-height-districts',
          paint: {
            'fill-color': 'rgba(118, 66, 10, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'limited-height-districts',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Limited height district - {{{lhlbl}}}',
      },
    },
    {
      type: 'layers',
      id: 'mandatory-inclusionary-housing-line',
      attributes: {
        style: {
          id: 'mandatory-inclusionary-housing-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'mandatory-inclusionary-housing',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(204, 61, 93, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'mandatory-inclusionary-housing',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'mandatory-inclusionary-housing-fill',
      attributes: {
        style: {
          id: 'mandatory-inclusionary-housing-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'mandatory-inclusionary-housing',
          paint: {
            'fill-color': 'rgba(204, 61, 93, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'mandatory-inclusionary-housing',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{projectnam}}} - {{{mih_option}}}',
      },
    },
    {
      type: 'layers',
      id: 'inclusionary-housing-line',
      attributes: {
        style: {
          id: 'inclusionary-housing-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'inclusionary-housing',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(229, 115, 0, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'inclusionary-housing',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'inclusionary-housing-fill',
      attributes: {
        style: {
          id: 'inclusionary-housing-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'inclusionary-housing',
          paint: {
            'fill-color': 'rgba(229, 115, 0, 0.2)',
            'fill-opacity': 0.2,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'inclusionary-housing',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{projectnam}}}',
      },
    },
    {
      type: 'layers',
      id: 'transit-zones-line',
      attributes: {
        style: {
          id: 'transit-zones-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'transit-zones',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(230, 214, 46, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'transit-zones',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'transit-zones-fill',
      attributes: {
        style: {
          id: 'transit-zones-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'transit-zones',
          paint: {
            'fill-color': 'rgba(230, 214, 46, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'transit-zones',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Transit Zone',
      },
    },
    {
      type: 'layers',
      id: 'fresh-line',
      attributes: {
        style: {
          id: 'fresh-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'fresh',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(48, 191, 78, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'fresh',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'fresh-fill-zoning-and-tax',
      attributes: {
        style: {
          id: 'fresh-fill-zoning-and-tax',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'fresh',
          paint: {
            'fill-color': 'rgba(48, 191, 78, 0.2)',
          },
          filter: [
            'all',
            [
              '==',
              'name',
              'Zoning and discretionary tax incentives',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'fresh',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'FRESH - {{{name}}}',
      },
    },
    {
      type: 'layers',
      id: 'fresh-fill-zoning',
      attributes: {
        style: {
          id: 'fresh-fill-zoning',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'fresh',
          paint: {
            'fill-color': 'rgba(11, 147, 144, 0.2)',
          },
          filter: [
            'all',
            [
              '==',
              'name',
              'Zoning incentives',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'fresh',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'FRESH - {{{name}}}',
      },
    },
    {
      type: 'layers',
      id: 'fresh-fill-tax',
      attributes: {
        style: {
          id: 'fresh-fill-tax',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'fresh',
          paint: {
            'fill-color': 'rgba(143, 227, 57, 0.2)',
          },
          filter: [
            'all',
            [
              '==',
              'name',
              'Discretionary tax incentives',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'fresh',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'FRESH - {{{name}}}',
      },
    },
    {
      type: 'layers',
      id: 'sidewalkcafes-line-all',
      attributes: {
        style: {
          id: 'sidewalkcafes-line-all',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'sidewalk-cafes',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  0.5,
                ],
                [
                  13,
                  1,
                ],
                [
                  15,
                  5,
                ],
              ],
            },
            'line-color': '#28AD15',
          },
          filter: [
            'all',
            [
              '==',
              'cafetype',
              'All Cafes',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'sidewalk-cafes',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'sidewalkcafes-line-small',
      attributes: {
        style: {
          id: 'sidewalkcafes-line-small',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'sidewalk-cafes',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  0.5,
                ],
                [
                  13,
                  1,
                ],
                [
                  15,
                  5,
                ],
              ],
            },
            'line-color': '#CC3DCA',
          },
          filter: [
            'all',
            [
              '==',
              'cafetype',
              'Small Only',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'sidewalk-cafes',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'sidewalkcafes-line-unenclosed',
      attributes: {
        style: {
          id: 'sidewalkcafes-line-unenclosed',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'sidewalk-cafes',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  0.5,
                ],
                [
                  13,
                  1,
                ],
                [
                  15,
                  5,
                ],
              ],
            },
            'line-color': '#216BC6',
          },
          filter: [
            'all',
            [
              '==',
              'cafetype',
              'Unenclosed Only',
            ],
          ],
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'sidewalk-cafes',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'low-density-growth-mgmt-areas-line',
      attributes: {
        style: {
          id: 'low-density-growth-mgmt-areas-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'low-density-growth-mgmt-areas',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(157, 71, 178, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'low-density-growth-mgmt-areas',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'low-density-growth-mgmt-areas-fill',
      attributes: {
        style: {
          id: 'low-density-growth-mgmt-areas-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'low-density-growth-mgmt-areas',
          paint: {
            'fill-color': 'rgba(157, 71, 178, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'low-density-growth-mgmt-areas',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Lower Density Growth Management Area',
      },
    },
    {
      type: 'layers',
      id: 'coastal-zone-boundary-line',
      attributes: {
        style: {
          id: 'coastal-zone-boundary-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'coastal-zone-boundary',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(93, 198, 228, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'coastal-zone-boundary',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'coastal-zone-boundary-fill',
      attributes: {
        style: {
          id: 'coastal-zone-boundary-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'coastal-zone-boundary',
          paint: {
            'fill-color': 'rgba(93, 198, 228, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'coastal-zone-boundary',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Coastal Zone Boundary',
      },
    },
    {
      type: 'layers',
      id: 'waterfront-access-plan-line',
      attributes: {
        style: {
          id: 'waterfront-access-plan-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'waterfront-access-plan',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(0, 164, 210, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'waterfront-access-plan',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'waterfront-access-plan-fill',
      attributes: {
        style: {
          id: 'waterfront-access-plan-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'waterfront-access-plan',
          paint: {
            'fill-color': 'rgba(0, 164, 210, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'waterfront-access-plan',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': 'Waterfront Access Plan - {{{name}}}',
      },
    },
    {
      type: 'layers',
      id: 'historic-districts-line',
      attributes: {
        style: {
          id: 'historic-districts-line',
          type: 'line',
          source: 'landmark-historic',
          'source-layer': 'historic-districts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(70, 130, 180, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'historic-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'historic-districts-fill',
      attributes: {
        style: {
          id: 'historic-districts-fill',
          type: 'fill',
          source: 'landmark-historic',
          'source-layer': 'historic-districts',
          paint: {
            'fill-color': 'rgba(70, 130, 180, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'historic-districts',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{area_name}}}',
      },
    },
    {
      type: 'sources',
      id: 'landmark-historic',
      attributes: {
        id: 'landmark-historic',
        type: 'cartovector',
        minzoom: 0,
        'source-layers': [
          {
            id: 'historic-districts',
            sql: "SELECT the_geom_webmercator, area_name FROM historic_districts_lpc WHERE status_of = 'DESIGNATED'",
          },
          {
            id: 'landmarks',
            sql: "SELECT the_geom_webmercator, lm_name, lm_type FROM individual_landmarks_lpc WHERE (lm_type = 'Individual Landmark' OR lm_type = 'Interior Landmark') AND last_actio = 'DESIGNATED'",
          },
          {
            id: 'scenic-landmarks',
            sql: "SELECT the_geom_webmercator, scen_lm_na FROM scenic_landmarks_lpc WHERE last_actio = 'DESIGNATED'",
          },
        ],
        meta: {
          description: 'Individual Landmarks Shapefile, NYC Open Data Portal',
          url: [
            'https://data.cityofnewyork.us/Housing-Development/Individual-Landmarks/ch5p-r223/data',
          ],
          updated_at: '17 May 2018',
        },
      },
      relationships: {

      },
    },
    {
      type: 'layers',
      id: 'effective-flood-insurance-rate-2007',
      attributes: {
        style: {
          id: 'effective-flood-insurance-rate-2007',
          type: 'fill',
          source: 'floodplains',
          'source-layer': 'effective-flood-insurance-rate-2007',
          paint: {
            'fill-color': {
              property: 'fld_zone',
              type: 'categorical',
              stops: [
                [
                  'V',
                  '#0084a8',
                ],
                [
                  'A',
                  '#00a9e6',
                ],
              ],
            },
            'fill-opacity': 0.7,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'floodplain-efirm2007',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '2007 {{{fld_zone}}} Zone',
      },
    },
    {
      type: 'sources',
      id: 'floodplains',
      attributes: {
        id: 'floodplains',
        type: 'cartovector',
        'source-layers': [
          {
            id: 'effective-flood-insurance-rate-2007',
            sql: "SELECT the_geom_webmercator, CASE WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A' WHEN fld_zone = 'VE' THEN 'V' END as fld_zone FROM floodplain_firm2007 WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'",
          },
          {
            id: 'preliminary-flood-insurance-rate',
            sql: "SELECT the_geom_webmercator, CASE WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A' WHEN fld_zone = 'VE' THEN 'V' WHEN fld_zone = '0.2 PCT ANNUAL CHANCE FLOOD HAZARD' THEN 'Shaded X' END as fld_zone FROM floodplain_pfirm2015 WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE' ",
          },
        ],
        meta: {
          description: 'Flood Insurance Rate Data provided by FEMA',
          url: [
            'http://www.region2coastal.com/view-flood-maps-data/view-preliminary-flood-map-data/',
          ],
          updated_at: 'September 2017',
        },
      },
      relationships: {

      },
    },
    {
      type: 'layers',
      id: 'preliminary-flood-insurance-rate',
      attributes: {
        style: {
          id: 'preliminary-flood-insurance-rate',
          type: 'fill',
          source: 'floodplains',
          'source-layer': 'preliminary-flood-insurance-rate',
          paint: {
            'fill-color': {
              property: 'fld_zone',
              type: 'categorical',
              stops: [
                [
                  'V',
                  '#0084a8',
                ],
                [
                  'A',
                  '#00a9e6',
                ],
              ],
            },
            'fill-opacity': 0.7,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'floodplain-pfirm2015',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '2015 {{{fld_zone}}} Zone',
      },
    },
    {
      type: 'layers',
      id: 'appendixj-designated-mdistricts-line',
      attributes: {
        style: {
          id: 'appendixj-designated-mdistricts-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'appendixj-designated-mdistricts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(243, 51, 225, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'appendixj-designated-mdistricts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'appendixj-designated-mdistricts-fill',
      attributes: {
        style: {
          id: 'appendixj-designated-mdistricts-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'appendixj-designated-mdistricts',
          paint: {
            'fill-color': 'rgba(243, 51, 225, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'appendixj-designated-mdistricts',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{name}}} - Subarea {{{subarea}}}',
      },
    },
    {
      type: 'layers',
      id: 'business-improvement-districts-line',
      attributes: {
        style: {
          id: 'business-improvement-districts-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'business-improvement-districts',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(118, 66, 10, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'business-improvement-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'business-improvement-districts-fill',
      attributes: {
        style: {
          id: 'business-improvement-districts-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'business-improvement-districts',
          paint: {
            'fill-color': 'rgba(118, 66, 10, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'business-improvement-districts',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{bid}}}',
      },
    },
    {
      type: 'layers',
      id: 'industrial-business-zones-line',
      attributes: {
        style: {
          id: 'industrial-business-zones-line',
          type: 'line',
          source: 'supporting-zoning',
          'source-layer': 'industrial-business-zones',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(43, 10, 118, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'industrial-business-zones',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'industrial-business-zones-fill',
      attributes: {
        style: {
          id: 'industrial-business-zones-fill',
          type: 'fill',
          source: 'supporting-zoning',
          'source-layer': 'industrial-business-zones',
          paint: {
            'fill-color': 'rgba(43, 10, 118, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'industrial-business-zones',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{name}}} IBZ',
      },
    },
    {
      type: 'layers',
      id: 'boroughs-line-glow',
      attributes: {
        style: {
          id: 'boroughs-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'boroughs',
          paint: {
            'line-color': '#edbd12',
            'line-opacity': 0.5,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'boroughs',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'boroughs-line',
      attributes: {
        style: {
          id: 'boroughs-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'boroughs',
          paint: {
            'line-color': '#7a6000',
            'line-opacity': 0.8,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'boroughs',
          },
        },
      },
    },
    {
      type: 'sources',
      id: 'admin-boundaries',
      attributes: {
        id: 'admin-boundaries',
        type: 'cartovector',
        minzoom: 0,
        'source-layers': [
          {
            id: 'community-districts',
            sql: "SELECT the_geom_webmercator, borocd, CASE WHEN LEFT(borocd::text, 1) = '1' THEN 'Manhattan ' || borocd % 100 WHEN LEFT(borocd::text, 1) = '2' THEN 'Bronx ' || borocd % 100 WHEN LEFT(borocd::text, 1) = '3' THEN 'Brooklyn ' || borocd % 100 WHEN LEFT(borocd::text, 1) = '4' THEN 'Queens ' || borocd % 100 WHEN LEFT(borocd::text, 1) = '5' THEN 'Staten Island ' || borocd % 100 END as boro_district FROM community_districts WHERE borocd % 100 < 20",
          },
          {
            id: 'neighborhood-tabulation-areas',
            sql: "SELECT the_geom_webmercator, ntaname, ntaname AS id, a.ntacode AS geoid FROM nta_boundaries a WHERE ntaname NOT ILIKE 'park-cemetery-etc%' AND ntaname != 'Airport'",
          },
          {
            id: 'neighborhood-tabulation-areas-centroids',
            sql: "SELECT ST_Centroid(the_geom_webmercator) as the_geom_webmercator, ntaname FROM nta_boundaries WHERE ntaname NOT ILIKE 'park-cemetery-etc%'",
          },
          {
            id: 'boroughs',
            sql: 'SELECT the_geom_webmercator, boroname FROM boro_boundaries',
          },
          {
            id: 'nyc-council-districts',
            sql: 'SELECT the_geom_webmercator, coundist FROM nyc_council_districts',
          },
          {
            id: 'dcp_city_council_districts_combined',
            sql: "SELECT the_geom_webmercator, coundist, '2024' as year FROM dcp_city_council_districts union select the_geom_webmercator, coundist, '2013' as year from dcp_city_council_districts_2013",
          },
          {
            id: 'ny-senate-districts',
            sql: 'SELECT the_geom_webmercator, stsendist FROM ny_senate_districts',
          },
          {
            id: 'ny-assembly-districts',
            sql: 'SELECT the_geom_webmercator, assemdist FROM ny_assembly_districts',
          },
          {
            id: 'nyc-pumas',
            sql: 'SELECT the_geom_webmercator, puma, puma AS id, puma AS geoid FROM nyc_pumas',
          },
          {
            id: 'bk-qn-mh-boundary',
            sql: "SELECT the_geom_webmercator, label1 || '/' || label2 AS boro_boundary FROM bk_qn_mh_boundary",
          },
        ],
        buffersize: {
          mvt: 10,
        },
        meta: {
          description: 'Administrative and Political Districts v18D, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data.page',
          ],
          updated_at: '30 November 2018',
        },
      },
      relationships: {

      },
    },
    {
      type: 'layers',
      id: 'community-districts-line-glow',
      attributes: {
        style: {
          id: 'community-districts-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'community-districts',
          paint: {
            'line-color': '#a5ed12',
            'line-opacity': 0.5,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'community-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'community-districts-line',
      attributes: {
        style: {
          id: 'community-districts-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'community-districts',
          paint: {
            'line-color': '#527a00',
            'line-opacity': 0.8,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'community-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'community-districts-label',
      attributes: {
        style: {
          id: 'community-districts-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'community-districts',
          minzoom: 11,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{boro_district}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'community-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nyc-council-districts-line-glow',
      attributes: {
        style: {
          id: 'nyc-council-districts-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts',
          minzoom: 10,
          paint: {
            'line-color': '#12eded',
            'line-opacity': 0.7,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc-council-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nyc-council-districts-line',
      attributes: {
        style: {
          id: 'nyc-council-districts-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts',
          paint: {
            'line-color': '#007a7a',
            'line-opacity': 0.8,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc-council-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nyc-council-districts-label',
      attributes: {
        style: {
          id: 'nyc-council-districts-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts',
          minzoom: 10,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{coundist}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc-council-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'dcp_city_council_districts_combined-line-glow',
      attributes: {
        style: {
          id: 'dcp_city_council_districts_combined-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts-combined',
          minzoom: 10,
          paint: {
            'line-color':
            {
              property: 'year',
              type: 'categorical',
              stops: [
                [
                  '2013',
                  '#33D8DC',
                ],
                [
                  '2024',
                  '#DC333D',
                ],
              ],
            },
            'line-opacity': 0.7,
            'line-width':
            {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc_council_districts_combined',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'dcp_city_council_districts_combined-line',
      attributes: {
        style: {
          id: 'dcp_city_council_districts_combined-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts-combined',
          paint: {
            'line-color': '#007a7a',
            'line-opacity': 0.8,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc_council_districts_combined',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'dcp_city_council_districts_combined-label',
      attributes: {
        style: {
          id: 'dcp_city_council_districts_combined-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'nyc-council-districts-combined',
          minzoom: 10,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{coundist}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'nyc_council_districts_combined',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nysenatedistricts-line-glow',
      attributes: {
        style: {
          id: 'nysenatedistricts-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'ny-senate-districts',
          paint: {
            'line-color': '#9912ed',
            'line-opacity': 0.4,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'ny-senate-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nysenatedistricts-line',
      attributes: {
        style: {
          id: 'nysenatedistricts-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'ny-senate-districts',
          paint: {
            'line-color': '#4b007a',
            'line-opacity': 0.6,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'ny-senate-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nysenatedistricts-label',
      attributes: {
        style: {
          id: 'nysenatedistricts-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'ny-senate-districts',
          minzoom: 10,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{stsendist}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'ny-senate-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'assemblydistricts-line-glow',
      attributes: {
        style: {
          id: 'assemblydistricts-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'ny-assembly-districts',
          paint: {
            'line-color': '#ed1294',
            'line-opacity': 0.4,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'assembly-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'assemblydistricts-line',
      attributes: {
        style: {
          id: 'assemblydistricts-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'ny-assembly-districts',
          paint: {
            'line-color': '#7a0048',
            'line-opacity': 0.8,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'assembly-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'assemblydistricts-label',
      attributes: {
        style: {
          id: 'assemblydistricts-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'ny-assembly-districts',
          minzoom: 10,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{assemdist}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'assembly-districts',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nta-line-glow',
      attributes: {
        style: {
          id: 'nta-line-glow',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'neighborhood-tabulation-areas',
          paint: {
            'line-color': '#2929ed',
            'line-opacity': 0.3,
            'line-width': {
              stops: [
                [
                  11,
                  4,
                ],
                [
                  16,
                  8,
                ],
              ],
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'neighborhood-tabulation-areas',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nta-line',
      attributes: {
        style: {
          id: 'nta-line',
          type: 'line',
          source: 'admin-boundaries',
          'source-layer': 'neighborhood-tabulation-areas',
          paint: {
            'line-color': '#00007a',
            'line-opacity': 0.6,
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  16,
                  3,
                ],
              ],
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'neighborhood-tabulation-areas',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'nta-label',
      attributes: {
        style: {
          id: 'nta-label',
          type: 'symbol',
          source: 'admin-boundaries',
          'source-layer': 'neighborhood-tabulation-areas-centroids',
          minzoom: 12,
          paint: {
            'text-color': '#626262',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 2,
            'text-halo-blur': 2,
          },
          layout: {
            'text-field': '{ntaname}',
            'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold',
            ],
            'text-size': {
              stops: [
                [
                  11,
                  12,
                ],
                [
                  14,
                  16,
                ],
              ],
            },
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'neighborhood-tabulation-areas',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'neighborhood-tabulation-areas-fill',
      attributes: {
        style: {
          id: 'neighborhood-tabulation-areas-fill',
          type: 'fill',
          source: 'admin-boundaries',
          'source-layer': 'neighborhood-tabulation-areas',
          paint: {
            'fill-opacity': 0.01,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'neighborhood-tabulation-areas',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_green',
      attributes: {
        style: {
          id: 'subway_green',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              '4',
            ],
          ],
          paint: {
            'line-color': 'rgba(0, 147, 60, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_yellow',
      attributes: {
        style: {
          id: 'subway_yellow',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              'N',
            ],
          ],
          paint: {
            'line-color': 'rgba(252, 204, 10, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_gray',
      attributes: {
        style: {
          id: 'subway_gray',
          source: 'transportation',
          'source-layer': 'subway-routes',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              'L',
            ],
          ],
          paint: {
            'line-color': 'rgba(167, 169, 172, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_brown',
      attributes: {
        style: {
          id: 'subway_brown',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              'J',
            ],
          ],
          paint: {
            'line-color': 'rgba(153, 102, 51, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_light_green',
      attributes: {
        style: {
          id: 'subway_light_green',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              'G',
            ],
          ],
          paint: {
            'line-color': 'rgba(108, 190, 69, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_orange',
      attributes: {
        style: {
          id: 'subway_orange',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              'B',
            ],
          ],
          paint: {
            'line-color': 'rgba(255, 99, 25, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_blue',
      attributes: {
        style: {
          id: 'subway_blue',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'any',
            [
              '==',
              'rt_symbol',
              'A',
            ],
            [
              '==',
              'rt_symbol',
              'SI',
            ],
          ],
          paint: {
            'line-color': 'rgba(0, 57, 166, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_purple',
      attributes: {
        style: {
          id: 'subway_purple',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              '7',
            ],
          ],
          paint: {
            'line-color': 'rgba(185, 51, 173, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_red',
      attributes: {
        style: {
          id: 'subway_red',
          source: 'transportation',
          'source-layer': 'subway-routes',
          type: 'line',
          filter: [
            'all',
            [
              '==',
              'rt_symbol',
              '1',
            ],
          ],
          paint: {
            'line-color': 'rgba(238, 53, 46, 1)',
            'line-width': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  4,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_stations',
      attributes: {
        style: {
          id: 'subway_stations',
          minzoom: 11,
          source: 'transportation',
          'source-layer': 'subway-stops',
          type: 'circle',
          paint: {
            'circle-color': 'rgba(255, 255, 255, 1)',
            'circle-opacity': {
              stops: [
                [
                  11,
                  0,
                ],
                [
                  12,
                  1,
                ],
              ],
            },
            'circle-stroke-opacity': {
              stops: [
                [
                  11,
                  0,
                ],
                [
                  12,
                  1,
                ],
              ],
            },
            'circle-radius': {
              stops: [
                [
                  10,
                  2,
                ],
                [
                  14,
                  5,
                ],
              ],
            },
            'circle-stroke-width': 1,
            'circle-pitch-scale': 'map',
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'subway_stations_labels',
      attributes: {
        style: {
          id: 'subway_stations_labels',
          minzoom: 13,
          source: 'transportation',
          'source-layer': 'subway-stops',
          type: 'symbol',
          layout: {
            'text-field': '{name}',
            'symbol-placement': 'point',
            'symbol-spacing': 250,
            'symbol-avoid-edges': false,
            'text-size': 14,
            'text-anchor': 'center',
            visibility: 'visible',
          },
          paint: {
            'text-halo-color': 'rgba(255, 255, 255, 1)',
            'text-halo-width': 1,
            'text-translate': [
              1,
              20,
            ],
            'text-opacity': {
              stops: [
                [
                  13,
                  0,
                ],
                [
                  14,
                  1,
                ],
              ],
            },
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
        before: 'place_other',
      },
    },
    {
      type: 'layers',
      id: 'subway_entrances',
      attributes: {
        style: {
          id: 'subway_entrances',
          minzoom: 15,
          source: 'transportation',
          'source-layer': 'subway-entrances',
          type: 'circle',
          layout: {
            visibility: 'visible',
          },
          paint: {
            'circle-stroke-color': 'rgba(33, 35, 38, 1)',
            'circle-color': 'rgba(255, 255, 255, 0.2)',
            'circle-stroke-width': 0.5,
            'circle-radius': 2,
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
        before: 'place_other',
      },
    },
    {
      type: 'layers',
      id: 'subway_entrances_labels',
      attributes: {
        style: {
          id: 'subway_entrances_labels',
          minzoom: 15,
          source: 'transportation',
          'source-layer': 'subway-entrances',
          type: 'symbol',
          layout: {
            'text-field': 'Entrance',
            'symbol-placement': 'point',
            'symbol-spacing': 250,
            'symbol-avoid-edges': false,
            'text-size': 8,
            'text-offset': [
              0,
              1,
            ],
            'text-anchor': 'center',
            visibility: 'visible',
          },
          paint: {
            'text-halo-color': 'rgba(255, 255, 255, 1)',
            'text-halo-width': 1,
            'text-opacity': {
              stops: [
                [
                  16.5,
                  0,
                ],
                [
                  17.5,
                  1,
                ],
              ],
            },
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'subway',
          },
        },
        before: 'place_other',
      },
    },
    {
      type: 'sources',
      id: 'transportation',
      attributes: {
        id: 'transportation',
        type: 'cartovector',
        minzoom: 0,
        'source-layers': [
          {
            id: 'bike-routes',
            sql: 'SELECT the_geom_webmercator, cartodb_id FROM bike_routes',
          },
          {
            id: 'subway-routes',
            sql: 'SELECT the_geom_webmercator, rt_symbol FROM mta_subway_routes',
          },
          {
            id: 'subway-stops',
            sql: 'SELECT the_geom_webmercator, name FROM mta_subway_stops',
          },
          {
            id: 'subway-entrances',
            sql: 'SELECT the_geom_webmercator, cartodb_id FROM mta_subway_entrances',
          },
        ],
        meta: {
          description: 'NYC Subway Lines and Stops - Originally Sourced from NYC DoITT GIS, combined with SI Railway data from Baruch College NYC Mass Transit Spatial Layers | Subway entrances from NYC Open Data',
          url: [
            'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mta_subway_stops&format=SHP',
            'https://planninglabs.carto.com/api/v2/sql?q=SELECT * FROM mta_subway_routes&format=SHP',
            'https://data.cityofnewyork.us/Transportation/Subway-Entrances/drex-xx56',
            'https://www.baruch.cuny.edu/confluence/display/geoportal/NYC+Mass+Transit+Spatial+Layers',
          ],
          updated_at: '21 November 2017',
        },
      },
    },
    {
      type: 'layers',
      id: 'building-footprints',
      attributes: {
        style: {
          id: 'building-footprints',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'building',
          minzoom: 15,
          paint: {
            'fill-opacity': {
              stops: [
                [
                  15,
                  0,
                ],
                [
                  16,
                  0.3,
                ],
              ],
            },
            'fill-color': 'rgba(175, 175, 175, 1)',
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'building-footprints',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'three-d-buildings',
      attributes: {
        style: {
          id: 'three-d-buildings',
          type: 'fill-extrusion',
          source: 'openmaptiles',
          'source-layer': 'building',
          minzoom: 0,
          paint: {
            'fill-extrusion-color': 'rgba(203, 203, 203, 1)',
            'fill-extrusion-opacity': 0.95,
            'fill-extrusion-translate': [
              3,
              0,
            ],
            'fill-extrusion-height': {
              property: 'render_height',
              type: 'identity',
            },
            'fill-extrusion-base': {
              property: 'render_min_height',
              type: 'identity',
            },
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'three-d-buildings',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'aerials-2016',
      attributes: {
        style: {
          id: 'aerials-2016',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2016',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2016',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2014',
      attributes: {
        style: {
          id: 'aerials-2014',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2014',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2014',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2012',
      attributes: {
        style: {
          id: 'aerials-2012',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2012',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2012',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2010',
      attributes: {
        style: {
          id: 'aerials-2010',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2010',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2010',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2008',
      attributes: {
        style: {
          id: 'aerials-2008',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2008',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2008',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2006',
      attributes: {
        style: {
          id: 'aerials-2006',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2006',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2006',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-2004',
      attributes: {
        style: {
          id: 'aerials-2004',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-2004',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2004',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-20012',
      attributes: {
        style: {
          id: 'aerials-20012',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-20012',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '2001-2',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-1996',
      attributes: {
        style: {
          id: 'aerials-1996',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-1996',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '1996',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-1951',
      attributes: {
        style: {
          id: 'aerials-1951',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-1951',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '1951',
        before: 'boundary_state',
      },
    },
    {
      type: 'layers',
      id: 'aerials-1924',
      attributes: {
        style: {
          id: 'aerials-1924',
          layout: {
            visibility: 'none',
          },
          source: 'aerials-1924',
          type: 'raster',
          metadata: {
            'nycplanninglabs:layergroupid': 'aerials',
          },
        },
        'display-name': '1924',
        before: 'boundary_state',
      },
    },
    {
      type: 'sources',
      id: 'aerials-1924',
      attributes: {
        id: 'aerials-1924',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-1951',
      attributes: {
        id: 'aerials-1951',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-1996',
      attributes: {
        id: 'aerials-1996',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-20012',
      attributes: {
        id: 'aerials-20012',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2001-2/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2004',
      attributes: {
        id: 'aerials-2004',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2006',
      attributes: {
        id: 'aerials-2006',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2008',
      attributes: {
        id: 'aerials-2008',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2010',
      attributes: {
        id: 'aerials-2010',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2012',
      attributes: {
        id: 'aerials-2012',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2014',
      attributes: {
        id: 'aerials-2014',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'sources',
      id: 'aerials-2016',
      attributes: {
        id: 'aerials-2016',
        type: 'raster',
        tiles: [
          'https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8',
        ],
        'tile-size': 256,
        meta: {
          description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
          url: [
            'https://maps.nyc.gov/tiles/',
          ],
          updated_at: 'n/a',
        },
      },
    },
    {
      type: 'layers',
      id: 'pluto-fill',
      attributes: {
        style: {
          id: 'pluto-fill',
          type: 'fill',
          source: 'pluto',
          minzoom: 15,
          'source-layer': 'pluto',
          paint: {
            'fill-outline-color': '#cdcdcd',
            'fill-color': {
              property: 'landuse',
              type: 'categorical',
              stops: [
                [
                  '01',
                  '#FEFFA8',
                ],
                [
                  '02',
                  '#FCB842',
                ],
                [
                  '03',
                  '#B16E00',
                ],
                [
                  '04',
                  '#ff8341',
                ],
                [
                  '05',
                  '#fc2929',
                ],
                [
                  '06',
                  '#E362FB',
                ],
                [
                  '07',
                  '#E0BEEB',
                ],
                [
                  '08',
                  '#44A3D5',
                ],
                [
                  '09',
                  '#78D271',
                ],
                [
                  '10',
                  '#BAB8B6',
                ],
                [
                  '11',
                  '#555555',
                ],
              ],
              default: '#EEEEEE',
            },
            'fill-opacity': 0,
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'tax-lots',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{address}}}',
      },
    },
    {
      type: 'layers',
      id: 'pluto-line',
      attributes: {
        style: {
          id: 'pluto-line',
          type: 'line',
          source: 'pluto',
          minzoom: 15,
          'source-layer': 'pluto',
          paint: {
            'line-width': 0.5,
            'line-color': 'rgba(130, 130, 130, 1)',
            'line-opacity': {
              stops: [
                [
                  15,
                  0,
                ],
                [
                  16,
                  1,
                ],
              ],
            },
          },
          layout: {
            visibility: 'visible',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'tax-lots',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'pluto-labels',
      attributes: {
        style: {
          id: 'pluto-labels',
          type: 'symbol',
          source: 'pluto',
          'source-layer': 'pluto',
          minzoom: 15,
          layout: {
            'text-field': '{lot}',
            'text-font': [
              'Open Sans Regular',
              'Arial Unicode MS Regular',
            ],
            'text-size': 11,
            visibility: 'visible',
          },
          paint: {
            'text-opacity': {
              stops: [
                [
                  16.5,
                  0,
                ],
                [
                  17.5,
                  1,
                ],
              ],
            },
            'icon-color': 'rgba(193, 193, 193, 1)',
            'text-color': 'rgba(154, 154, 154, 1)',
            'text-halo-color': 'rgba(152, 152, 152, 0)',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'tax-lots',
          },
        },
      },
    },
    {
      type: 'sources',
      id: 'pluto',
      attributes: {
        id: 'pluto',
        type: 'cartovector',
        minzoom: 12,
        'source-layers': [
          {
            id: 'pluto',
            sql: 'SELECT bbl AS id, the_geom_webmercator, bbl, lot, landuse, address, numfloors FROM dcp_mappluto',
          },
          {
            id: 'block-centroids',
            sql: 'SELECT the_geom_webmercator, block FROM mappluto_block_centroids',
          },
        ],
        meta: {
          description: 'MapPLUTO™ 18v2.1, BYTES of the BIG APPLE™',
          url: [
            'https://www1.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page#mappluto',
          ],
          updated_at: 'March 2019',
        },
      },
    },
    {
      type: 'layers',
      id: 'landmarks_v0-circle-outline',
      attributes: {
        style: {
          id: 'landmarks_v0-circle-outline',
          type: 'circle',
          source: 'landmark-historic',
          'source-layer': 'landmarks',
          paint: {
            'circle-radius': {
              stops: [
                [
                  10,
                  3,
                ],
                [
                  15,
                  7,
                ],
              ],
            },
            'circle-color': '#012700',
            'circle-opacity': 0.7,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'landmarks',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'landmarks_v0-circle',
      attributes: {
        style: {
          id: 'landmarks_v0-circle',
          type: 'circle',
          source: 'landmark-historic',
          'source-layer': 'landmarks',
          paint: {
            'circle-radius': {
              stops: [
                [
                  10,
                  1,
                ],
                [
                  15,
                  5,
                ],
              ],
            },
            'circle-color': {
              property: 'lm_type',
              type: 'categorical',
              stops: [
                [
                  'Individual Landmark',
                  'rgba(147, 245, 201, 1)',
                ],
                [
                  'Interior Landmark',
                  'rgba(152, 152, 247, 1)',
                ],
              ],
            },
            'circle-opacity': 0.7,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'landmarks',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{lm_name}}}',
      },
    },
    {
      type: 'layers',
      id: 'scenic-landmarks-line',
      attributes: {
        style: {
          id: 'scenic-landmarks-line',
          type: 'line',
          source: 'landmark-historic',
          'source-layer': 'scenic-landmarks',
          paint: {
            'line-width': {
              stops: [
                [
                  11,
                  1,
                ],
                [
                  12,
                  3,
                ],
              ],
            },
            'line-color': 'rgba(153, 18, 237, 0.6)',
            'line-dasharray': [
              1,
              1,
            ],
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'landmarks',
          },
        },
      },
    },
    {
      type: 'layers',
      id: 'scenic-landmarks-fill',
      attributes: {
        style: {
          id: 'scenic-landmarks-fill',
          type: 'fill',
          source: 'landmark-historic',
          'source-layer': 'scenic-landmarks',
          paint: {
            'fill-color': 'rgba(153, 18, 237, 0.2)',
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'landmarks',
          },
        },
        highlightable: true,
        tooltipable: true,
        'tooltip-template': '{{{scen_lm_na}}}',
      },
    },
    {
      type: 'layers',
      id: 'e-designations-circle',
      attributes: {
        style: {
          id: 'e-designations-circle',
          type: 'circle',
          source: 'supporting-zoning',
          'source-layer': 'e-designations',
          paint: {
            'circle-radius': {
              stops: [
                [
                  16,
                  2,
                ],
                [
                  17,
                  5,
                ],
              ],
            },
            'circle-color': 'rgba(255, 255, 255, 0.65)',
            'circle-stroke-opacity': {
              stops: [
                [
                  15,
                  1,
                ],
                [
                  16,
                  1,
                ],
              ],
            },
            'circle-stroke-color': 'rgba(52, 33, 220, 1)',
            'circle-pitch-scale': 'map',
            'circle-stroke-width': 1.5,
            'circle-opacity': 1,
          },
          layout: {
            visibility: 'none',
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'e-designations',
          },
        },
        clickable: true,
        highlightable: true,
        tooltipable: true,
        'tooltip-template': "{{fa-icon icon='external-link-alt'}} E-designation, E-Number: {{{enumber}}}, CEQR: {{{ceqr_num}}}, ULURP: {{{ulurp_num}}}",
      },
    },
    {
      type: 'layers',
      id: 'e-designations-label',
      attributes: {
        style: {
          id: 'e-designations-label',
          type: 'symbol',
          source: 'supporting-zoning',
          'source-layer': 'e-designations',
          minzoom: 16,
          layout: {
            'text-field': 'E',
            'text-size': 8,
            'text-allow-overlap': true,
            visibility: 'none',
          },
          paint: {
            'text-opacity': {
              stops: [
                [
                  16,
                  0,
                ],
                [
                  17,
                  1,
                ],
              ],
            },
          },
          metadata: {
            'nycplanninglabs:layergroupid': 'e-designations',
          },
        },
      },
    },
  ],
  meta: {
    mapboxStyle: {
      version: 8,
      name: 'NYCPlanning Positron',
      metadata: {
        attribution: 'Based on OpenMapTiles Positron style: https://github.com/openmaptiles/positron-gl-style',
      },
      center: [
        -73.869324,
        40.815888,
      ],
      zoom: 9.72,
      bearing: 0,
      pitch: 0,
      sources: {
        openmaptiles: {
          type: 'vector',
          url: 'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/static/v3.json',
        },
        paws: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'boat-launches': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'citibike-stations': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        transportation: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'aerials-2016': {
          id: 'aerials-2016',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2014': {
          id: 'aerials-2014',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2012': {
          id: 'aerials-2012',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2010': {
          id: 'aerials-2010',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2008': {
          id: 'aerials-2008',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2006': {
          id: 'aerials-2006',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-2004': {
          id: 'aerials-2004',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-20012': {
          id: 'aerials-20012',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/2001-2/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-1996': {
          id: 'aerials-1996',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-1951': {
          id: 'aerials-1951',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        'aerials-1924': {
          id: 'aerials-1924',
          type: 'raster',
          tiles: [
            'https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8',
          ],
          tileSize: 256,
          meta: {
            description: 'NYC DoITT GIS Aerial Photography Tile Layers (TMS)',
            url: [
              'https://maps.nyc.gov/tiles/',
            ],
            updated_at: 'n/a',
          },
        },
        ferries: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'admin-boundaries': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'census-geoms': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        pluto: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'zoning-districts': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'digital-citymap': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        planimetrics: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'supporting-zoning': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'zoning-map-amendments': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'landmark-historic': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        floodplains: {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
        'preliminary-flood-insurance-rate': {
          type: 'vector',
          tiles: [
            'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/dummy-tile.mvt',
          ],
        },
      },
      sprite: 'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/static/sprite',
      glyphs: 'https://labs-mapbox-gl-noop-tiles.nyc3.digitaloceanspaces.com/fonts/dummy-font.pbf?noop={fontstack}{range}',
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': 'rgb(242,243,240)',
          },
        },
        {
          id: 'park',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'park',
          filter: [
            '==',
            '$type',
            'Polygon',
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'rgb(230, 233, 229)',
          },
        },
        {
          id: 'water',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'water',
          filter: [
            '==',
            '$type',
            'Polygon',
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'rgb(194, 200, 202)',
            'fill-antialias': true,
          },
        },
        {
          id: 'landcover_ice_shelf',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          maxzoom: 8,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Polygon',
            ],
            [
              '==',
              'subclass',
              'ice_shelf',
            ],
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'hsl(0, 0%, 98%)',
            'fill-opacity': 0.7,
          },
        },
        {
          id: 'landcover_glacier',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          maxzoom: 8,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Polygon',
            ],
            [
              '==',
              'subclass',
              'glacier',
            ],
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'hsl(0, 0%, 98%)',
            'fill-opacity': {
              base: 1,
              stops: [
                [
                  0,
                  1,
                ],
                [
                  8,
                  0.5,
                ],
              ],
            },
          },
        },
        {
          id: 'landuse_residential',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landuse',
          maxzoom: 16,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Polygon',
            ],
            [
              '==',
              'class',
              'residential',
            ],
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'rgb(234, 234, 230)',
            'fill-opacity': {
              base: 0.6,
              stops: [
                [
                  8,
                  0.8,
                ],
                [
                  9,
                  0.6,
                ],
              ],
            },
          },
        },
        {
          id: 'landcover_grass',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          minzoom: 10,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Polygon',
            ],
            [
              '==',
              'class',
              'grass',
            ],
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'rgba(211, 230, 211, 1)',
            'fill-opacity': {
              base: 1,
              stops: [
                [
                  8,
                  0,
                ],
                [
                  12,
                  1,
                ],
              ],
            },
          },
        },
        {
          id: 'landuse_cemetery',
          type: 'fill',
          metadata: {

          },
          source: 'openmaptiles',
          'source-layer': 'landuse',
          filter: [
            '==',
            'class',
            'cemetery',
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-color': 'rgba(211, 230, 211, 1)',
          },
        },
        {
          id: 'waterway',
          type: 'line',
          source: 'openmaptiles',
          'source-layer': 'waterway',
          filter: [
            '==',
            '$type',
            'LineString',
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'line-color': '#bbccdd',
            'line-dasharray': [
              3,
              3,
            ],
          },
        },
        {
          id: 'water_name',
          type: 'symbol',
          source: 'openmaptiles',
          'source-layer': 'water_name',
          filter: [
            '==',
            '$type',
            'LineString',
          ],
          layout: {
            'text-field': '{name:latin}\n{name:nonlatin}',
            'symbol-placement': 'line',
            'text-rotation-alignment': 'map',
            'symbol-spacing': 500,
            'text-font': [
              'Metropolis Medium Italic',
              'Noto Sans Italic',
            ],
            'text-size': 12,
          },
          paint: {
            'text-color': 'rgb(157,169,177)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'building',
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'building',
          minzoom: 12,
          paint: {
            'fill-color': 'rgb(234, 234, 229)',
            'fill-outline-color': 'rgb(219, 219, 218)',
            'fill-antialias': true,
          },
          filter: [
            'all',
          ],
        },
        {
          id: 'tunnel_motorway_casing',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'brunnel',
                'tunnel',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'butt',
            'line-join': 'miter',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(213, 213, 213)',
            'line-width': {
              base: 1.4,
              stops: [
                [
                  5.8,
                  0,
                ],
                [
                  6,
                  3,
                ],
                [
                  20,
                  40,
                ],
              ],
            },
            'line-opacity': 1,
          },
        },
        {
          id: 'tunnel_motorway_inner',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'brunnel',
                'tunnel',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(234,234,234)',
            'line-width': {
              base: 1.4,
              stops: [
                [
                  4,
                  2,
                ],
                [
                  6,
                  1.3,
                ],
                [
                  20,
                  30,
                ],
              ],
            },
          },
        },
        {
          id: 'aeroway-taxiway',
          type: 'line',
          metadata: {
            'mapbox:group': '1444849345966.4436',
          },
          source: 'openmaptiles',
          'source-layer': 'aeroway',
          minzoom: 12,
          filter: [
            'all',
            [
              'in',
              'class',
              'taxiway',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'hsl(0, 0%, 88%)',
            'line-width': {
              base: 1.55,
              stops: [
                [
                  13,
                  1.8,
                ],
                [
                  20,
                  20,
                ],
              ],
            },
            'line-opacity': 1,
          },
        },
        {
          id: 'aeroway-runway-casing',
          type: 'line',
          metadata: {
            'mapbox:group': '1444849345966.4436',
          },
          source: 'openmaptiles',
          'source-layer': 'aeroway',
          minzoom: 11,
          filter: [
            'all',
            [
              'in',
              'class',
              'runway',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'hsl(0, 0%, 88%)',
            'line-width': {
              base: 1.5,
              stops: [
                [
                  11,
                  6,
                ],
                [
                  17,
                  55,
                ],
              ],
            },
            'line-opacity': 1,
          },
        },
        {
          id: 'aeroway-area',
          type: 'fill',
          metadata: {
            'mapbox:group': '1444849345966.4436',
          },
          source: 'openmaptiles',
          'source-layer': 'aeroway',
          minzoom: 4,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Polygon',
            ],
            [
              'in',
              'class',
              'runway',
              'taxiway',
            ],
          ],
          layout: {
            visibility: 'visible',
          },
          paint: {
            'fill-opacity': {
              base: 1,
              stops: [
                [
                  13,
                  0,
                ],
                [
                  14,
                  1,
                ],
              ],
            },
            'fill-color': 'rgba(255, 255, 255, 1)',
          },
        },
        {
          id: 'aeroway-runway',
          type: 'line',
          metadata: {
            'mapbox:group': '1444849345966.4436',
          },
          source: 'openmaptiles',
          'source-layer': 'aeroway',
          minzoom: 11,
          maxzoom: 24,
          filter: [
            'all',
            [
              'in',
              'class',
              'runway',
            ],
            [
              '==',
              '$type',
              'LineString',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgba(255, 255, 255, 1)',
            'line-width': {
              base: 1.5,
              stops: [
                [
                  11,
                  4,
                ],
                [
                  17,
                  50,
                ],
              ],
            },
            'line-opacity': 1,
          },
        },
        {
          id: 'highway_path',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              '==',
              'class',
              'path',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(234, 234, 234)',
            'line-width': {
              base: 1.2,
              stops: [
                [
                  13,
                  1,
                ],
                [
                  20,
                  10,
                ],
              ],
            },
            'line-opacity': 0.9,
          },
        },
        {
          id: 'highway_minor',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 8,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'in',
              'class',
              'minor',
              'service',
              'track',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'hsl(0, 0%, 88%)',
            'line-width': {
              base: 1.55,
              stops: [
                [
                  13,
                  1.8,
                ],
                [
                  20,
                  20,
                ],
              ],
            },
            'line-opacity': 0.9,
          },
        },
        {
          id: 'highway_major_casing',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 11,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'in',
              'class',
              'primary',
              'secondary',
              'tertiary',
              'trunk',
            ],
          ],
          layout: {
            'line-cap': 'butt',
            'line-join': 'miter',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(213, 213, 213)',
            'line-dasharray': [
              12,
              0,
            ],
            'line-width': {
              base: 1.3,
              stops: [
                [
                  10,
                  3,
                ],
                [
                  20,
                  23,
                ],
              ],
            },
          },
        },
        {
          id: 'highway_major_inner',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 11,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'in',
              'class',
              'primary',
              'secondary',
              'tertiary',
              'trunk',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': '#fff',
            'line-width': {
              base: 1.3,
              stops: [
                [
                  10,
                  2,
                ],
                [
                  20,
                  20,
                ],
              ],
            },
          },
        },
        {
          id: 'highway_major_subtle',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          maxzoom: 11,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'in',
              'class',
              'primary',
              'secondary',
              'tertiary',
              'trunk',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'hsla(0, 0%, 85%, 0.69)',
            'line-width': 2,
          },
        },
        {
          id: 'highway_motorway_casing',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '!in',
                'brunnel',
                'bridge',
                'tunnel',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'butt',
            'line-join': 'miter',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(213, 213, 213)',
            'line-width': {
              base: 1.4,
              stops: [
                [
                  5.8,
                  0,
                ],
                [
                  6,
                  3,
                ],
                [
                  20,
                  40,
                ],
              ],
            },
            'line-dasharray': [
              2,
              0,
            ],
            'line-opacity': 1,
          },
        },
        {
          id: 'highway_motorway_inner',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '!in',
                'brunnel',
                'bridge',
                'tunnel',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': {
              base: 1,
              stops: [
                [
                  5.8,
                  'hsla(0, 0%, 85%, 0.53)',
                ],
                [
                  6,
                  '#fff',
                ],
              ],
            },
            'line-width': {
              base: 1.4,
              stops: [
                [
                  4,
                  2,
                ],
                [
                  6,
                  1.3,
                ],
                [
                  20,
                  30,
                ],
              ],
            },
          },
        },
        {
          id: 'highway_motorway_subtle',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          maxzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              '==',
              'class',
              'motorway',
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'hsla(0, 0%, 85%, 0.53)',
            'line-width': {
              base: 1.4,
              stops: [
                [
                  4,
                  2,
                ],
                [
                  6,
                  1.3,
                ],
              ],
            },
          },
        },
        {
          id: 'railway_transit',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 16,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'class',
                'transit',
              ],
              [
                '!in',
                'brunnel',
                'tunnel',
              ],
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#dddddd',
            'line-width': 3,
          },
        },
        {
          id: 'railway_transit_dashline',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 16,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'class',
                'transit',
              ],
              [
                '!in',
                'brunnel',
                'tunnel',
              ],
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#fafafa',
            'line-width': 2,
            'line-dasharray': [
              3,
              3,
            ],
          },
        },
        {
          id: 'railway_service',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 16,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'class',
                'rail',
              ],
              [
                'has',
                'service',
              ],
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#dddddd',
            'line-width': 3,
          },
        },
        {
          id: 'railway_service_dashline',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 16,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              '==',
              'class',
              'rail',
            ],
            [
              'has',
              'service',
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#fafafa',
            'line-width': 2,
            'line-dasharray': [
              3,
              3,
            ],
          },
        },
        {
          id: 'railway',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 13,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '!has',
                'service',
              ],
              [
                '==',
                'class',
                'rail',
              ],
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#dddddd',
            'line-width': {
              base: 1.3,
              stops: [
                [
                  16,
                  3,
                ],
                [
                  20,
                  7,
                ],
              ],
            },
          },
        },
        {
          id: 'railway_dashline',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 13,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '!has',
                'service',
              ],
              [
                '==',
                'class',
                'rail',
              ],
            ],
          ],
          layout: {
            visibility: 'visible',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#fafafa',
            'line-width': {
              base: 1.3,
              stops: [
                [
                  16,
                  2,
                ],
                [
                  20,
                  6,
                ],
              ],
            },
            'line-dasharray': [
              3,
              3,
            ],
          },
        },
        {
          id: 'highway_motorway_bridge_casing',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'brunnel',
                'bridge',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'butt',
            'line-join': 'miter',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgb(213, 213, 213)',
            'line-width': {
              base: 1.4,
              stops: [
                [
                  5.8,
                  0,
                ],
                [
                  6,
                  5,
                ],
                [
                  20,
                  45,
                ],
              ],
            },
            'line-dasharray': [
              2,
              0,
            ],
            'line-opacity': 1,
          },
        },
        {
          id: 'highway_motorway_bridge_inner',
          type: 'line',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation',
          minzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              'all',
              [
                '==',
                'brunnel',
                'bridge',
              ],
              [
                '==',
                'class',
                'motorway',
              ],
            ],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': {
              base: 1,
              stops: [
                [
                  5.8,
                  'hsla(0, 0%, 85%, 0.53)',
                ],
                [
                  6,
                  '#fff',
                ],
              ],
            },
            'line-width': {
              base: 1.4,
              stops: [
                [
                  4,
                  2,
                ],
                [
                  6,
                  1.3,
                ],
                [
                  20,
                  30,
                ],
              ],
            },
          },
        },
        {
          id: 'highway_name_other',
          type: 'symbol',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation_name',
          filter: [
            'all',
            [
              '!=',
              'class',
              'motorway',
            ],
            [
              '==',
              '$type',
              'LineString',
            ],
          ],
          layout: {
            'text-size': 10,
            'text-max-angle': 30,
            'text-transform': 'uppercase',
            'symbol-spacing': 350,
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'symbol-placement': 'line',
            visibility: 'visible',
            'text-rotation-alignment': 'map',
            'text-pitch-alignment': 'viewport',
            'text-field': '{name:latin} {name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': '#fff',
            'text-translate': [
              0,
              0,
            ],
            'text-halo-width': 2,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'highway_name_motorway',
          type: 'symbol',
          metadata: {
            'mapbox:group': 'b6371a3f2f5a9932464fa3867530a2e5',
          },
          source: 'openmaptiles',
          'source-layer': 'transportation_name',
          filter: [
            'all',
            [
              '==',
              '$type',
              'LineString',
            ],
            [
              '==',
              'class',
              'motorway',
            ],
          ],
          layout: {
            'text-size': 10,
            'symbol-spacing': 350,
            'text-font': [
              'Metropolis Light',
              'Noto Sans Regular',
            ],
            'symbol-placement': 'line',
            visibility: 'visible',
            'text-rotation-alignment': 'viewport',
            'text-pitch-alignment': 'viewport',
            'text-field': '{ref}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'hsl(0, 0%, 100%)',
            'text-translate': [
              0,
              2,
            ],
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'boundary_state',
          type: 'line',
          metadata: {
            'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f',
          },
          source: 'openmaptiles',
          'source-layer': 'boundary',
          filter: [
            '==',
            'admin_level',
            4,
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
            visibility: 'visible',
          },
          paint: {
            'line-color': 'rgba(230, 204, 207, 0)',
            'line-width': {
              base: 1.3,
              stops: [
                [
                  3,
                  1,
                ],
                [
                  22,
                  15,
                ],
              ],
            },
            'line-blur': 0.4,
            'line-dasharray': [
              2,
              2,
            ],
            'line-opacity': 1,
          },
        },
        {
          id: 'boundary_country',
          type: 'line',
          metadata: {
            'mapbox:group': 'a14c9607bc7954ba1df7205bf660433f',
          },
          source: 'openmaptiles',
          'source-layer': 'boundary',
          filter: [
            '==',
            'admin_level',
            2,
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': 'rgba(230, 204, 207, 0)',
            'line-width': {
              base: 1.1,
              stops: [
                [
                  3,
                  1,
                ],
                [
                  22,
                  20,
                ],
              ],
            },
            'line-blur': {
              base: 1,
              stops: [
                [
                  0,
                  0.4,
                ],
                [
                  22,
                  4,
                ],
              ],
            },
            'line-opacity': 1,
          },
        },
        {
          id: 'place_other',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 14,
          filter: [
            'all',
            [
              'in',
              'class',
              'continent',
              'hamlet',
              'neighbourhood',
              'isolated_dwelling',
            ],
            [
              '==',
              '$type',
              'Point',
            ],
          ],
          layout: {
            'text-size': 10,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_suburb',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 15,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'suburb',
            ],
          ],
          layout: {
            'text-size': 10,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_village',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 14,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'village',
            ],
          ],
          layout: {
            'text-size': 10,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_town',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 15,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'town',
            ],
          ],
          layout: {
            'text-size': 10,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_city',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 14,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              'all',
              [
                '!=',
                'capital',
                2,
              ],
              [
                '==',
                'class',
                'city',
              ],
              [
                '>',
                'rank',
                3,
              ],
            ],
          ],
          layout: {
            'text-size': 10,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_capital',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 12,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              'all',
              [
                '==',
                'capital',
                2,
              ],
              [
                '==',
                'class',
                'city',
              ],
            ],
          ],
          layout: {
            'text-size': 14,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-anchor': 'center',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_city_large',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 12,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              'all',
              [
                '!=',
                'capital',
                2,
              ],
              [
                '<=',
                'rank',
                3,
              ],
              [
                '==',
                'class',
                'city',
              ],
            ],
          ],
          layout: {
            'text-size': 14,
            'text-transform': 'uppercase',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-justify': 'center',
            visibility: 'visible',
            'text-field': '{name:latin}\n{name:nonlatin}',
          },
          paint: {
            'text-color': 'rgb(117, 129, 145)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_state',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 12,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'state',
            ],
          ],
          layout: {
            visibility: 'visible',
            'text-field': '{name:latin}\n{name:nonlatin}',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-transform': 'uppercase',
            'text-size': 10,
          },
          paint: {
            'text-color': 'rgb(113, 129, 144)',
            'text-halo-color': 'rgb(242,243,240)',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        },
        {
          id: 'place_country_other',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 8,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'country',
            ],
            [
              '!has',
              'iso_a2',
            ],
          ],
          layout: {
            visibility: 'visible',
            'text-field': '{name:latin}',
            'text-font': [
              'Metropolis Light Italic',
              'Noto Sans Italic',
            ],
            'text-transform': 'uppercase',
            'text-size': {
              base: 1,
              stops: [
                [
                  0,
                  9,
                ],
                [
                  6,
                  11,
                ],
              ],
            },
          },
          paint: {
            'text-halo-width': 1.4,
            'text-halo-color': 'rgba(236,236,234,0.7)',
            'text-color': {
              base: 1,
              stops: [
                [
                  3,
                  'rgb(157,169,177)',
                ],
                [
                  4,
                  'rgb(153, 153, 153)',
                ],
              ],
            },
          },
        },
        {
          id: 'place_country_minor',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 8,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '==',
              'class',
              'country',
            ],
            [
              '>=',
              'rank',
              2,
            ],
            [
              'has',
              'iso_a2',
            ],
          ],
          layout: {
            visibility: 'visible',
            'text-field': '{name:latin}',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-transform': 'uppercase',
            'text-size': {
              base: 1,
              stops: [
                [
                  0,
                  10,
                ],
                [
                  6,
                  12,
                ],
              ],
            },
          },
          paint: {
            'text-halo-width': 1.4,
            'text-halo-color': 'rgba(236,236,234,0.7)',
            'text-color': {
              base: 1,
              stops: [
                [
                  3,
                  'rgb(157,169,177)',
                ],
                [
                  4,
                  'rgb(153, 153, 153)',
                ],
              ],
            },
          },
        },
        {
          id: 'place_country_major',
          type: 'symbol',
          metadata: {
            'mapbox:group': '101da9f13b64a08fa4b6ac1168e89e5f',
          },
          source: 'openmaptiles',
          'source-layer': 'place',
          maxzoom: 6,
          filter: [
            'all',
            [
              '==',
              '$type',
              'Point',
            ],
            [
              '<=',
              'rank',
              1,
            ],
            [
              '==',
              'class',
              'country',
            ],
            [
              'has',
              'iso_a2',
            ],
          ],
          layout: {
            visibility: 'visible',
            'text-field': '{name:latin}',
            'text-font': [
              'Metropolis Regular',
              'Noto Sans Regular',
            ],
            'text-transform': 'uppercase',
            'text-size': {
              base: 1.4,
              stops: [
                [
                  0,
                  10,
                ],
                [
                  3,
                  12,
                ],
                [
                  4,
                  14,
                ],
              ],
            },
            'text-anchor': 'center',
          },
          paint: {
            'text-halo-width': 1.4,
            'text-halo-color': 'rgba(236,236,234,0.7)',
            'text-color': {
              base: 1,
              stops: [
                [
                  3,
                  'rgb(157,169,177)',
                ],
                [
                  4,
                  'rgb(153, 153, 153)',
                ],
              ],
            },
          },
        },
      ],
    },
  },
};
