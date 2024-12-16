import Component from '@glimmer/component';

export default class LegendItemComponent extends Component {
  /**
  This component expects to be passed an item object that with an particular
  format (as formatted in labs-layer-api):

  {
    "label":"Legend Item Label",
    "tooltip": "This is the legend item tooltip.",
    "icon": {
      "type": "line",
      "layers": [
        {
          "fill":"Green"
        },
        {
          "fill":"none",
          "stroke":"Blue"
        }
      ]
    }
  }

  */
}
