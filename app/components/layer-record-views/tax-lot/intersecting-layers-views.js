import Component from '@ember/component';

export default class IntersectingLayersViews extends Component {
  model = null;

  tables = [
    'inclusionary_housing',
    'transitzones',
    'fresh_zones',
    'waterfront_access_plan',
    'coastal_zone_boundary',
    'lower_density_growth_management_areas',
    'mandatory_inclusionary_housing',
    'upland_waterfront_areas',
    'appendixj_designated_mdistricts',
  ];
}
