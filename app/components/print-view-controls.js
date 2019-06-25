import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PrintViewControls extends Component {
  classNames = ['print-view--controls', 'align-middle'];

  @service('print')
  printSvc;

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
    this.set('printSvc.enabled', false);

    await this.widowResize();
  }

  async click() {
    await this.widowResize();
  }
}
