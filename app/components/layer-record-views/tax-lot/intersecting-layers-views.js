import Component from '@ember/component';

export default class IntersectingLayersViews extends Component {
  model = null;

  tables = [
    'inclusionary_housing',
    'fresh_zones',
    'waterfront_access_plan',
    'coastal_zone_boundary',
    'lower_density_growth_management_areas',
    'floodplain_firm2007',
    'floodplain_pfirm2015',
    'mandatory_inclusionary_housing',
    'e_designations',
    'upland_waterfront_areas',
    'transitzones',
    'appendixj_designated_mdistricts',
    'mta_rail_station_50ft_buffers',
  ];
}
