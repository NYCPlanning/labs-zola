import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import config from 'labs-zola/config/environment';

export default class IntersectingLayersViews extends Component {
  model = null;

  @tracked
  showZFALayer = config.featureFlagShowZFALayer;

  tables = [
    'dcp_inclusionary_housing',
    'dcp_fresh_zones',
    'dcp_waterfront_access_plan',
    'dcp_coastal_zone_boundary',
    'dcp_lower_density_growth_management_areas',
    'floodplain_firm2007',
    'floodplain_pfirm2015',
    'dcp_mandatory_inclusionary_housing',
    'dcp_e_designations',
    'upland_waterfront_areas',
    'dcp_appendixi_transit_zones',
    'dcp_appendixj_designated_mdistricts',
    'mta_rail_station_50ft_buffers',
  ];
}
