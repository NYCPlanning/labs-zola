import Service from '@ember/service';
import { set } from '@ember/object';
import { next } from '@ember/runloop';

const matchesIdentifierFor = function(layerGroup) {
  return param => (param.id || param) === layerGroup.id;
};

export const applyQueryParamToLayerGroup = function(layerGroup, layerGroupIDsToShow) {
  const paramForLayerGroup = layerGroupIDsToShow
    .find(matchesIdentifierFor(layerGroup));

  set(layerGroup, 'visible', !!paramForLayerGroup);

  // handle layer group substate
  if (paramForLayerGroup && paramForLayerGroup.selected) {
    set(layerGroup, 'selected', paramForLayerGroup.selected);
  }
};

export const pluckQueryParamStateFrom = function(layerGroups) {
  return layerGroups
    .filter(layerGroup => layerGroup.get('visible'))
    .map((layerGroup) => {
      // handle layer group substate
      if (layerGroup.get('layerVisibilityType') === 'singleton') {
        return {
          id: layerGroup.get('id'),
          selected: layerGroup.get('selected.id'),
        };
      }

      return layerGroup.get('id');
    })
    .sort();
};

/**
 *
 * Layer Group aggregate service
 *
 * Allows for computed properties on the aggregate state of layer groups.
 * Initialized with `initializeObservers`
 * Many dependencies downstream fo this are sensitive to the timing with which
 * properties are computed... for example, you will see "attempted to render twice"
 * errors if making visibleLayerGroups a computed. This class is very fragile and changes
 * should be made with extreme caution
 *
 * @public
 * @class LayerGroupService
 *
 */
export default class LayerGroupService extends Service {
  /**
   * Array of layer group model instances. This is referenced from within each
   * layer group model, on init.
   */
  layerGroupRegistry = [];

  /**
   *  Public callback when layer group observer is fired
   */
  layerGroupsDidChange = () => {}

  rollbackLayerGroups() {
    this.layerGroupRegistry.forEach(model => model.rollbackAttributes());
  }

  /**
   * Initializer that should hould be called _after_ the fully
   * resolved _route_ model is set to the controller
   * sets up observers for the controller
   *
   * @public
   */
  initializeObservers() {
    // add the observers later on because they will initialize too early
    this.addObserver('layerGroupRegistry.@each.selected', this, '_modelsToParams');
    this.addObserver('layerGroupRegistry.@each.visible', this, '_modelsToParams');
  }

  /**
   * Maps out the visibility of all layer groups into a list of currently
   * visible layer gorups
   */
  _modelsToParams() {
    const layerGroups = this.get('layerGroupRegistry');
    const newQueryParams = pluckQueryParamStateFrom(layerGroups);

    // set the new param state object
    next(() => set(this, 'visibleLayerGroups', newQueryParams))
    this.layerGroupsDidChange(newQueryParams);
  }
}
