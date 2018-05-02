import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  click,
  fillIn,
  find,
  findAll,
  keyEvent,
  waitUntil,
  triggerEvent
} from 'ember-native-dom-helpers';
const timeout = 5000;

const commercialOverlays = {
  id: 'commercial-overlays',
  title: 'Commercial Overlays',
  type: 'carto',
  sql: 'SELECT * FROM commercial_overlays_v201804',
  visible: true,
  layers: [
    {
      layer: {
        id: 'co',
        type: 'line',
        source: 'co',
        'source-layer': 'layer0',
        paint: {
          'line-width': {
            stops: [
              [13, 1],
              [14, 3],
            ],
          },
          'line-opacity': 0.3,
          'line-color': 'rgba(255, 0, 0, 1)',
        },
      },
    },
    {
      layer: {
        id: 'co_labels',
        source: 'co',
        type: 'symbol',
        'source-layer': 'layer0',
        paint: {
          'text-color': 'rgba(255, 0, 0, 1)',
          'text-halo-color': '#FFFFFF',
          'text-halo-width': 2,
          'text-halo-blur': 2,
          'text-opacity': 0.6,
        },
        layout: {
          'symbol-placement': 'point',
          'text-field': '{overlay}',
        },
        minzoom: 14,
      },
    },
  ],
};

moduleForComponent('layer-checkbox', 'Integration | Component | layer checkbox', {
  integration: true,
});

// test('it renders', async function(assert) {

//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });

//   this.setProperties({
//     zoom: 10,
//     lng: 42,
//     lat: -71,
//     commercialOverlays,
//   });

//   await this.render(hbs`
//     {{#mapbox-gl
//       id='main-map'
//       initOptions=(hash style='mapbox://styles/mapbox/light-v9'
//                         zoom=zoom
//                         center=(array lng lat))
//       as |map|}}

//         {{#map.layer-group 
//           config=commercialOverlays as |group|}}

//             {{#group.multi-select-control 
//               column='overlay' as |multiSelect|}}

//               {{multiSelect.group-checkbox}}

//             {{/group.multi-select-control}}
//         {{/map.layer-group}}
//     {{/mapbox-gl}}
//   `);
//   await waitUntil(() => find('input'), { timeout });
//   await click('input');
//   assert.equal(this.$().text().trim(), '');
// });
