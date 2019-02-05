import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';

export default class PrintViewControlsComponent extends Component {
  classNames = ['print-view--controls', 'align-middle'];

  @argument
  printViewOrientation;

  @argument
  printViewPaperSize;

  @argument
  printViewShowMap

  @argument
  printViewShowLegend

  @argument
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
