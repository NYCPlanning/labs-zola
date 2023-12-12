import Component from '@ember/component';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/labs-ui-overrides/layer-group-toggle';

export default class LayerGroupToggle extends Component {
  @service fastboot;

  @service metrics;

  // ember component class options
  classNames = ['layer-group-toggle'];

  classNameBindings = ['active'];

  layout = layout;

  init(...args) {
    super.init(args);

    this.didInit(this);
  }

  willDestroy(...args) {
    super.willDestroy(args);
    this.willDestroyHook(this);
  }

  // main layerGroup
  // should be a model
  layerGroup = {
    legend: {
      label: '',
      tooltip: '',
      infolink: '',
      icon: [],
    },
    visible: true,
  };

  // property bindings from the layer group
  // includes: label, tooltip, infolink, icon, active
  @alias('layerGroup.legend.label') label = '';

  @alias('layerGroup.legend.tooltip') tooltip = '';

  @alias('layerGroup.legend.infolink') infolink = '';

  @alias('layerGroup.legend.icon') icon = [];

  @alias('layerGroup.visible') active = true;

  // additional options
  infoLinkIcon = 'external-link-alt';

  tooltipIcon = 'info-circle';

  activeTooltip = '';

  activeTooltipIcon = 'exclamation-triangle';

  // public api hooks
  didInit() {}

  willDestroyHook() {}

  onToggle() {}

  // internal action
  @action
  toggle() {
    this.toggleProperty('active');
    this.onToggle(this.layerGroup);
  }

  @action
  async captureOutboundLink(label) {
    gtag('event', 'external_link', {
      event_category: 'Clicked Supporting Zoning Link',
      event_action: `Clicked ${label} Link`,
    });

    // GA
    this.metrics.trackEvent('MatomoTagManager', {
      category: 'External Link',
      action: 'Clicked Supporting Zoning Link',
      name: `Clicked ${label} Link`,
    });
  }
}
