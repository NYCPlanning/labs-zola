# labs-zola

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd labs-zola`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

#### Adding Layer-Groups

Labs ZoLa introduces a meta definition of the [MapboxGL API](mapbox.com/mapbox-gl-js/api/) which allows you to define groups of layers bound to a single source. This means that sources may have many layers, hence a "layer group". 

There is a command for creating a layer-group:

* `ember g layer-group <layer-group-name>`

This will create a layer-grpoup definition file inside the layer-groups folder. Edit layer configuration there. To add it to the map, it must be explicitly imported and added as a layer. 

To create a simple layer style definition, simply run:

* `ember g layer <layer-name>`

Import simply layer style definitions inside layer-groups, if necessary:

javascript```
// layer-groups/my-layer-group
import myLayer from '../layers/my-layer';

export default {
  layers:[
    layer: myLayer
  ]
}```

Make use of the many other generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
