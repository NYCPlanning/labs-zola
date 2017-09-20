import replacePaintStyleIn from 'labs-zola/utils/replace-paint-style-in';
import { module, test } from 'qunit';

const plutoLayerDef = {
  id: 'pluto',
  title: 'PLUTO (Tax Lots)',
  sql: 'SELECT the_geom_webmercator, bbl, landuse, address FROM support_mappluto',
  minzoom: 12,
  type: 'carto',
  layers: [
    {
      layer: {
        id: 'pluto-fill',
        type: 'fill',
        source: 'pluto',
        minzoom: 15,
        'source-layer': 'layer0',
        paint: {
          'fill-outline-color': '#cdcdcd',
          'fill-color': {
            property: 'landuse',
            type: 'categorical',
            stops: [
              ['01', '#f4f455'],
              ['02', '#f7d496'],
              ['03', '#FF9900'],
              ['04', '#f7cabf'],
              ['05', '#ea6661'],
              ['06', '#d36ff4'],
              ['07', '#dac0e8'],
              ['08', '#5CA2D1'],
              ['09', '#8ece7c'],
              ['10', '#bab8b6'],
              ['11', '#5f5f60'],
            ],
          },
          'fill-opacity': 0.2,
        },
      },
    },
  ],
};

const newPaintStyle = {
  'fill-outline-color': '#cdcdcd',
  'fill-color': '#000000',
  'fill-opacity': 1,
};

module('Unit | Utility | replace paint style in');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = replacePaintStyleIn();
  assert.ok(result);
});

test('it returns modified config object', function(assert) {
  let result = replacePaintStyleIn(plutoLayerDef, 'pluto-fill', newPaintStyle);
  assert.equal(result.layers[0].layer.paint, newPaintStyle);
});
