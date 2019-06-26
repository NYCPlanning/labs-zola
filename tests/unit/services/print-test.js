import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | print', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const service = this.owner.lookup('service:print');
    assert.ok(service);
  });

  test('printViewHiddenAreas computed property returns correct classes', function(assert) {
    const printSvc = this.owner.lookup('service:print');
    assert.equal(printSvc.printViewHiddenAreas, '', 'printViewHiddenAreas default value is okay');
    printSvc.set('printViewShowMap', false);
    printSvc.set('printViewShowLegend', false);
    assert.equal(printSvc.printViewHiddenAreas, 'no-map no-legend', 'printViewHiddenAreas observes changes to ShowMap and ShowLegend');
    printSvc.set('printViewShowContent', false);
    assert.equal(printSvc.printViewHiddenAreas, 'no-map no-legend no-content', 'printViewHiddenAreas observes changes to ShowContent, too');
  });

  test('printViewClasses computed property returns correct classes', function(assert) {
    const printSvc = this.owner.lookup('service:print');
    assert.equal(printSvc.printViewClasses, '', 'printViewClasses is blank when print disabled');
    printSvc.set('enabled', true);
    assert.equal(printSvc.printViewClasses, 'paper letter portrait ', 'printViewClasses default value is okay');
    printSvc.set('printViewOrientation', 'landscape');
    assert.equal(printSvc.printViewClasses, 'paper letter landscape ', 'printViewClasses observes changes to printViewOrientation');
    printSvc.set('printViewPaperSize', 'tabloid');
    assert.equal(printSvc.printViewClasses, 'paper tabloid landscape ', 'printViewClasses observes changes to printViewPaperSize');
    printSvc.set('printViewShowContent', false);
    assert.equal(printSvc.printViewClasses, 'paper tabloid landscape no-content', 'printViewClasses observes changes to printViewHiddenAreas');
  });
});
