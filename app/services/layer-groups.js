import Service from '@ember/service';
import { set } from '@ember/object';

export const isEqual = function(array1, array2) {
  array1.sort();
  array2.sort();

  return array1.every((value, index) => value === array2[index]);
};

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
   * Public array of 'visible' layer group IDs. Use on the controller as a query param.
   * Mutated internally as well as by the controller itself.
   */
  visibleLayerGroups = [];

  /**
   * Initializer that should hould be called _after_ the fully
   * resolved _route_ model is set to the controller
   * sets up initial state and observers for the controller
   * signature is a model directly from the route
   *
   * @public
   * @param {Array} collection of layerGroups IDs
   */
  initializeObservers(layerGroups) {
    // initial state from QPs, grab init state from models
    // TODO: Test that mutations to model don't leak and overwrite
    // the default layer-group visibility, which is infered from the models
    const defaultVisibleLayerGroupIDs = layerGroups.filterBy('visible').mapBy('id');
    const layerGroupIDsToShow = this.get('visibleLayerGroups');

    // check if the provided params are the default
    const isDefault = isEqual(layerGroupIDsToShow, defaultVisibleLayerGroupIDs);

    // check if QP isn't default and there are other params
    if (!isDefault && layerGroupIDsToShow.length) {
      // set initial state from query layerGroupIDsToShow when not default
      layerGroups.forEach((layerGroup) => {
        applyQueryParamToLayerGroup(layerGroup, layerGroupIDsToShow);
      });
    }

    // run these initially
    this._modelsToParams();
    this._paramsToModels();

    // add the observers later on because they will initialize too early
    this.addObserver('layerGroupRegistry.@each.selected', this, '_modelsToParams');
    this.addObserver('layerGroupRegistry.@each.visible', this, '_modelsToParams');
    this.addObserver('visibleLayerGroups.length', this, '_paramsToModels');
  }

  /**
   * Maps out the visibility of all layer groups into a list of currently
   * visible layer gorups
   */
  _modelsToParams() {
    const layerGroups = this.get('layerGroupRegistry');
    const newQueryParams = pluckQueryParamStateFrom(layerGroups);

    // set the new param state object
    set(this, 'visibleLayerGroups', newQueryParams);
  }

  /**
   * Translate query params to model states.
   * The param state object is really either a string or object.
   * This is because it can include layer group "substate", things like
   * aerials can specify a single layer that's on
   */
  _paramsToModels() {
    const layerGroups = this.get('layerGroupRegistry');
    const layerGroupIDsToShow = this.get('visibleLayerGroups');

    if (layerGroupIDsToShow.length) {
      layerGroups.forEach((layerGroup) => {
        applyQueryParamToLayerGroup(layerGroup, layerGroupIDsToShow);
      });
    }
  }
}
