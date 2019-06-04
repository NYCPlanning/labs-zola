import Component from '@ember/component';
import { action } from '@ember/object';

export default class PrintViewControls extends Component {
  classNames = ['print-view--controls', 'align-middle'];

  printViewOrientation = 'portrait';

  printViewPaperSize = 'letter';

  printViewShowMap = true;

  printViewShowLegend = true;

  printViewShowContent = true;

  widowResize() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
        resolve();
      }, 300);
    });
  }

  @action
  async disablePrintView() {
    this.set('print', false);

    await this.widowResize();
  }

  async click() {
    await this.widowResize();
  }
}
