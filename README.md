[![CircleCI](https://circleci.com/gh/NYCPlanning/labs-zola.svg?style=svg)](https://circleci.com/gh/NYCPlanning/labs-zola)

# labs-zola

NYC's Zoning and Land Use App - ZoLa provides a simple way to research zoning regulations and other information relevant to planners. Find the zoning for your property, discover new proposals for your neighborhood, and learn where City Planning initiatives are happening throughout the City.

# Architecture

## Frontend

ZoLa is an ember.js single page application (SPA).  The frontend handles routing, web mapping, layout, and user interactions, and communicates with various APIs for content and data.

## Backend

Carto is the primary backend resource for ZoLa, which provides a PostGIS database, Map Tiler, and JSON/GeoJSON data API.  All of the data represented in the app starts out as a PostGIS table in Carto.

### Carto Maps API
  Spatial data used in ZoLa's web maps are served as vector tiles from the Carto Maps API.  Vector tiles are defined by a SQL query, and may include several named internal layers.  Vector Tiles are defined in config files in `app/sources`, and the frontend converts each of these into a call to the Maps API, which produces a vector tile template that can be added to mapboxGL as a 'source'.

### Carto SQL API
  The SQL API is used to retrieve record-specific data, such as tax lot details when a user navigates to a specific lot.  It is also used to cross-reference a selected lot on-the-fly with various other layers to find intersections.

### Zola Search API
  Zola Search API provides autocomplete search resutls, and aggregates retults from ZoLa's Carto database with those from the Mapzen Search API. The search API is an express.js app that lives in a separate repo: (https://github.com/NYCPlanning/labs-zola-search-api)


# Development

To develop locally, you'll need the following emberjs prerequisites:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Running Locally

* Clone this repository: `git clone https://github.com/NYCPlanning/labs-zola.git`
* Navigate to the repo: `cd labs-zola`
* Install dependencies: `npm install`
* Run the development server: `ember serve`

## Map Styling
To style the map in development, we use [Maputnik Dev Server](https://github.com/NYCPlanning/labs-maputnik-dev-server). Check the `README` of maputnik-dev-server for the commands necessary to style the current map.

### Tests

* Run the test suite: `ember test -server`
* Load `http://localhost:7357/` to view the test UI

## Deploying

The App is deployed to our VPS using dokku, you need only do a `git push` of the master branch to the `dokku` remote.

To create a new remote named `dokku`: `git remote add dokku dokku@{domain}:zola`
To deploy: `git push dokku master`
To deploy a branch other than master, alias it to master: `git push dokku {branchname}:master`

# Contributing

Issues are tracked using [github issues](https://github.com/NYCPlanning/labs-zola/issues), if you would like to work on a feature or bugfix, let us know by adding a comment to the relevant issue.  Submit a Pull Request to the `develop` branch, and we'll review it.

## Layer-Groups

Labs ZoLa introduces a meta definition of the [MapboxGL API](mapbox.com/mapbox-gl-js/api/) which allows you to define groups of mapboxGL layers. This means that sources may have many layers, hence a "layer group". (for example, the "subways" layergroup includes the subway lines, subway routes, and subway station entrances layers) Layergroup configs are located in `app/layer-groups`.

There is a command for creating a layer-group:

* `ember g layer-group <layer-group-name>`

This will create a layer-grpoup definition file inside the layer-groups folder. Edit layer configuration there. To add it to the map, it must be explicitly imported and added as a layer.

To create a simple layer style definition, simply run:

* `ember g layer <layer-name>`

Import simply layer style definitions inside layer-groups, if necessary:

```javascript
// layer-groups/my-layer-group
import myLayer from '../layers/my-layer';

export default {
  layers:[{
    layer: myLayer
  }]
}
```

Make use of the many other generators for code, try `ember help generate` for more details
