import layerGroupsFixtures from '../../mirage/static-fixtures/layer-groups';

export default function(hooks) {
  hooks.beforeEach(function() {
    this.server.post('layer-groups', () => layerGroupsFixtures);
  });
}
