import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';

export default class PrintViewControlsComponent extends Component {
  classNames = ['print-view--controls'];

  @argument
  printViewOrientation;

  @argument
  printViewPaperSize;
}
