import Component from '@ember/component';

export default class PrintViewControls extends Component {
  classNames = ['print-view--controls', 'align-middle'];

  printViewOrientation;

  printViewPaperSize;

  printViewShowMap

  printViewShowLegend

  printViewShowContent

  click() {
    // When paper size/orientation change, make sure map is resized
    setTimeout(() => {
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    }, 300);
  }
}
