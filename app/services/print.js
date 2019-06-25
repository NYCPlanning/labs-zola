import Service from '@ember/service';
import { computed } from '@ember/object';

export default class PrintService extends Service {
  enabled = false;

  // Print View Settings
  printViewOrientation = 'portrait';

  printViewPaperSize = 'letter';

  printViewShowMap = true;

  printViewShowLegend = true;

  printViewShowContent = true;

  @computed('printViewShowMap', 'printViewShowLegend', 'printViewShowContent')
  get printViewHiddenAreas() {
    const hiddenAreasClasses = [];

    if (!this.printViewShowMap) hiddenAreasClasses.push('no-map');
    if (!this.printViewShowLegend) hiddenAreasClasses.push('no-legend');
    if (!this.printViewShowContent) hiddenAreasClasses.push('no-content');

    return hiddenAreasClasses.join(' ');
  }

  @computed('printViewHiddenAreas', 'enabled', 'printViewPaperSize', 'printViewOrientation', 'printViewHiddenAreas')
  get printViewClasses() {
    const orientation = this.printViewOrientation;
    const size = this.printViewPaperSize;
    const areas = this.printViewHiddenAreas;

    return this.enabled ? `paper ${size} ${orientation} ${areas}` : '';
  }
}
