import Component from '@ember/component';
import { action } from '@ember-decorators/object';

const widowResize = () => {
  setTimeout(() => {
    const resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
  }, 300);
};

export default class PrintViewControls extends Component {
  classNames = ['print-view--controls', 'align-middle'];

  printViewOrientation;

  printViewPaperSize;

  printViewShowMap

  printViewShowLegend

  printViewShowContent

  @action
  disablePrintView() {
    this.set('print', false);

    widowResize();
  }

  click() {
    widowResize();
  }
}
