[![CircleCI](https://circleci.com/gh/NYCPlanning/labs-zola/tree/develop.svg?style=svg)](https://circleci.com/gh/NYCPlanning/labs-zola/tree/develop)

# ZoLa (New York City’s Zoning & Land Use Map)

ZoLa provides a simple way to research zoning regulations and other information relevant to planners. Find the zoning for your property, discover new proposals for your neighborhood, and learn where City Planning initiatives are happening throughout the City.

![image](https://user-images.githubusercontent.com/409279/34126699-83fe1ab0-e408-11e7-84eb-1f228f43c071.png)

## How we work

[NYC Planning Labs](https://planninglabs.nyc) takes on a single project at a time, working closely with our customers from concept to delivery in a matter of weeks.  We conduct regular maintenance between larger projects.  

Take a look at our [sprint planning board](https://waffle.io/NYCPlanning/labs-zola) to get an idea of our current priorities for this project.

## How you can help

In the spirit of free software, everyone is encouraged to help improve this project.  Here are some ways you can contribute.

- Comment on or clarify [issues](https://github.com/NYCPlanning/labs-zola/issues)
- Report [bugs](https://github.com/NYCPlanning/labs-zola/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
- Suggest new features
- Write or edit documentation
- Write code (no patch is too small)
  - Fix typos
  - Add comments
  - Clean up code
  - Add new features

**[Read more about contributing.](CONTRIBUTING.md)**

## Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM)
- [Ember CLI](https://ember-cli.com/)
- [PhantomJS](http://phantomjs.org/)

## Local development

- Clone this repository: `git clone https://github.com/NYCPlanning/labs-zola.git`
- Navigate to the repo: `cd labs-zola`
- Install dependencies: `yarn`
- Run the development server: `ember serve`

## Architecture

ZoLa is an [Ember.js](https://www.emberjs.com/) single page application (SPA).  The frontend handles routing, web mapping, layout, and user interactions, and communicates with various APIs for content and data.

#### Map Styling

To style the map in development, we use [Maputnik Dev Server](https://github.com/NYCPlanning/labs-maputnik-dev-server). Check the `README` of maputnik-dev-server for the commands necessary to style the current map.

#### Layer-Groups

ZoLa introduces a meta definition of the [MapboxGL API](https://mapbox.com/mapbox-gl-js/api/) which allows you to define groups of mapboxGL layers. This means that sources may have many layers, hence a "layer group". For example, the "subways" layer group includes the subway lines, subway routes, and subway station entrances layers. Layer group configs are located in `app/layer-groups`.

- To create a layer-group: `ember g layer-group <layer-group-name>` - This will create a layer group definition file inside the `layer-groups` folder. Edit layer configuration there. To add it to the map, it must be explicitly imported and added as a layer.

- To create a simple layer style definition: `ember g layer <layer-name>`

- Import simple layer style definitions inside layer-groups, if necessary:  
```javascript
// layer-groups/my-layer-group
import myLayer from '../layers/my-layer';

export default {
  layers:[{
    layer: myLayer
  }]
}
```

(Make use of the many other generators for code, try `ember help generate` for more details.)

## Backend services

Carto is the primary backend resource for ZoLa, which provides a PostGIS database, Map Tiler, and JSON/GeoJSON data API.  All of the data represented in the app starts out as a PostGIS table in Carto.

- **Carto Maps API** - Spatial data used in ZoLa's web maps are served as vector tiles from the Carto Maps API.  Vector tiles are defined by a SQL query, and may include several named internal layers.  Vector Tiles are defined in config files in `app/sources`, and the frontend converts each of these into a call to the Maps API, which produces a vector tile template that can be added to mapboxGL as a 'source'.
- **Carto SQL API** - The SQL API is used to retrieve record-specific data, such as tax lot details when a user navigates to a specific lot.  It is also used to cross-reference a selected lot on-the-fly with various other layers to find intersections.
- **Zola Search API** - Zola Search API provides autocomplete search results, and aggregates results from ZoLa's Carto database with those from the Mapzen Search API. The search API is an express.js app that lives in a separate repo: (https://github.com/NYCPlanning/labs-zola-search-api)

## BBL Route

 `https://zola.planning.nyc.gov/bbl/:bbl`

For convenience to other apps that work with NYC BBLs (10-digit Borough, Block, and Lot identifiers), a `/bbl` route is available for incoming links.  Incoming connections on this route will be redirected to the corresponding `lot` view.

Example BBL route

[https://zola.planning.nyc.gov/bbl/1000477501](https://zola.planning.nyc.gov/bbl/1000477501)

will redirect to 

[https://zola.planning.nyc.gov/lot/1/47/7501](https://zola.planning.nyc.gov/lot/1/47/7501)

## Bounding Box Route

`https://zola.planning.nyc.gov/bbox/:west/:south/:east/:north`


For compliance with NYC [Local Law #40 of 2018](http://nyc.legistar1.com/nyc/attachments/f6a21032-ecd2-4197-ba05-f415caa39ecf.pdf), the Department of Housing Preservation and Development is required to create a link to ZoLa for all NYC Urban Renewal Areas "that directs to the highest practicable zoom level that contains all blocks and lots within such urban renewal area".  The `/bbox` route allows for specifying a bounding box defined by WGS84 latitude and longitude in decimal degrees.  When the ZoLa application loads the `bbox` route with valid bounds, the map will automatically zoom to fit the supplied bounds into the user's viewport.

Example Bounding Box Route:

https://zola.planning.nyc.gov/bbox/-73.9978/40.5705/-73.9804/40.5785

## Testing and checks

- **ESLint** - We use ESLint with Airbnb's rules for JavaScript projects
  - Add an ESLint plugin to your text editor to highlight broken rules while you code
  - You can also run `eslint` at the command line with the `--fix` flag to automatically fix some errors.

- **Testing**
  - Run the test suite: `ember test -server`
  - Load `http://localhost:7357/` to view the test UI
  - Before creating a Pull Request, make sure your branch is updated with the latest `develop` and passes all tests

## Deployment

The App is deployed to our VPS using dokku, you need only do a `git push` of the master branch to the `dokku` remote.

- To create a new remote named `dokku`: `git remote add dokku dokku@{domain}:zola`
- To Deploy: `git push dokku master`
- To deploy a branch other than master, alias it to master: `git push dokku {branchname}:master`

## Contact us

You can find us on Twitter at [@nycplanninglabs](https://twitter.com/nycplanninglabs), or comment on issues and we'll follow up as soon as we can. If you'd like to send an email, use [labs_dl@planning.nyc.gov](mailto:labs_dl@planning.nyc.gov)

## Updating MapPLUTO Data

- **Indices** - When updating MapPLUTO data, be sure to add an index to the BBL column: `CREATE INDEX idx_mappluto_{version}_bbl ON mappluto_{version} (bbl)`

- **Block Centroids** - You also need to regenerate the `mappluto_block_centroids` data table that provides the centroid of each block. This is used to add block labels to the map. 
  - Run the `CREATE TABLE` SQL below on the Carto Batch UI: https://cartodb.github.io/carto-batch-ui/. 
  - Once the batch query runs successfully, you need to query for the table via the regular Carto UI and save it as a dataset.
  - Then you can run `DROP TABLE mappluto_block_centroids_new` to delete the invisible table saved on Carto's backend.

```
CREATE TABLE mappluto_block_centroids_new AS (
SELECT
  ST_Centroid(
    ST_Union(
      ST_makevalid(
        the_geom
      )
    )
  ) as the_geom,
  ST_transform(
    ST_centroid(
      ST_Union(
        ST_makevalid(
          the_geom
        )
      )
    ), 3857
  ) as the_geom_webmercator,
  block,
  borocode
FROM planninglabs.mappluto_VERSION
GROUP BY block, borocode)
```
