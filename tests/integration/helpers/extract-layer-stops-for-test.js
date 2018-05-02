import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const inputValue = {
  id: 'zoning',
  title: 'Zoning Districts',
  sql: 'SELECT * FROM (SELECT *, LEFT(zonedist, 2) as primaryzone FROM zoning_districts_v201804) a',
  type: 'carto',
  layers: [
    {
      layer: {
        id: 'zd',
        type: 'fill',
        source: 'zoning',
        'source-layer': 'layer0',
        paint: {
          'fill-color': {
            property: 'primaryzone',
            type: 'categorical',
            stops: [
              ['BP', '#666666'],
              ['C1', '#ffa89c'],
              ['C2', '#ff9086'],
              ['C3', '#ff786f'],
              ['C4', '#ff6059'],
              ['C5', '#ff4843'],
              ['C6', '#ff302d'],
              ['C7', '#ff1816'],
              ['C8', '#ff0000'],
              ['M1', '#f3b7fb'],
              ['M2', '#eb8dfb'],
              ['M3', '#e362fb'],
              ['PA', '#78D271'],
              ['R1', '#f6f4b1'],
              ['R2', '#f6f49e'],
              ['R3', '#f5f58b'],
              ['R4', '#f5f578'],
              ['R5', '#f4f565'],
              ['R6', '#f4f551'],
              ['R7', '#f3f63e'],
              ['R8', '#f3f62b'],
              ['R9', '#f2f618'],
              ['R10', '#F0F614'],
            ],
          },
          'fill-opacity': 0.3,
          'fill-antialias': true,
        },
      },
      before: 'place_other',
    },
  ],
};

moduleForComponent('extract-layer-stops-for', 'helper:extract-layer-stops-for', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', inputValue);

  this.render(hbs`{{extract-layer-stops-for 'zd' inputValue}}`);

  assert.equal((typeof this), 'object');
});
