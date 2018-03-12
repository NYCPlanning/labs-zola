import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

const zoningDescriptions = {
  m1: 'M1 districts are designated for areas with light industries.',
  m2: 'M2 districts occupy the middle ground between light and heavy industrial areas.',
  m3: 'M3 districts are designated for areas with heavy industries that generate noise, traffic or pollutants.',
  c1: 'C1 districts are mapped along streets that serve local retail needs within residential neighborhoods.',
  c2: 'C2 districts are mapped along streets that serve local retail needs within residential neighborhoods.',
  c3: 'C3 districts permit waterfront recreational activities, primarily boating and fishing, in areas along the waterfront.',
  c4: 'C4 districts are mapped in regional centers where larger stores, theaters and office uses serve a wider region and generate more traffic than neighborhood shopping areas.',
  c5: 'C5 districts are intended for commercial areas that require central locations or serve the entire metropolitan region.',
  c6: 'C6 districts are intended for commercial areas that require central locations or serve the entire metropolitan region.',
  c7: 'C7 districts are specifically designated for large open amusement parks.',
  c8: 'C8 districts, bridging commercial and manufacturing uses, provide for automotive and other heavy commercial services that often require large amounts of land.',
  p: 'A public park is any park, playground, beach, parkway, or roadway within the jurisdiction and control of the New York City Commissioner of Parks & Recreation. Typically, public parks are not subject to zoning regulations.',
  r1: 'R1 districts are leafy, low-density neighborhoods of large, single-family detached homes on spacious lots.',
  r2: 'Residential development in R2 districts is limited exclusively to single-family detached houses.',
  r2a: 'R2A is a contextual district intended to preserve low-rise neighborhoods characterized by single-family detached homes on lots with a minimum width of 40 feet',
  r2x: 'R2X districts allow large single-family detached houses on lots with a minimum width of 30 feet.',
  r31: 'R3-1 contextual districts are the lowest density districts that allow semi-detached one- and two-family residences, as well as detached homes',
  r32: 'R3-2 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
  r3a: 'Characteristic of many of the city’s older neighborhoods, R3A contextual districts feature modest single- and two-family detached residences on zoning lots as narrow as 25 feet in width.',
  r3x: 'R3X contextual districts, mapped extensively in lower-density neighborhoods permit only one- and two-family detached homes on lots that must be at least 35 feet wide.',
  r4: 'R4 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
  r41: 'R4-1 contextual districts permit only one- and two-family detached and semi-detached houses.',
  r4a: 'R4A contextual districts permit only one- and two-family detached residences characterized by houses with two stories and an attic beneath a pitched roof.',
  r4b: 'Primarily a contextual rowhouse district limited to low-rise, one- and two-family attached residences, R4B districts also permit detached and semi-detached buildings.',
  r5: 'R5 districts are general residence districts that allow a variety of housing types, including low-rise attached houses, small multifamily apartment houses, and detached and semi-detached one- and two-family residences.',
  r5a: 'R5A contextual districts permit only one- and two-family detached residences characterized by houses with two stories and an attic beneath a pitched roof.',
  r5b: 'Primarily a contextual rowhouse district limited to low-rise, one- and two-family attached residences, R4B districts also permit detached and semi-detached buildings.',
  r5d: 'R5D contextual districts are designed to encourage residential growth along major corridors in auto-dependent areas of the city.',
  r6: 'R6 zoning districts are widely mapped in built-up, medium-density areas of the city whose character can range from neighborhoods with a diverse mix of building types and heights to large-scale “tower in the park” developments.',
  r6a: 'R6A contextual districts produce high lot coverage, six- to eight-story apartment buildings set at or near the street line designed to be compatible with older buildings in medium-density neighborhoods.',
  r6b: 'R6B contextual districts are often traditional row house districts, which preserve the scale and harmonious streetscape of medium-density neighborhoods of four-story attached buildings developed during the 19th century.',
  r7: 'R7 zoning districts are medium-density apartment house districts that encourage lower apartment buildings on smaller lots and, on larger lots, taller buildings with less lot coverage.',
  r7a: 'R7A contextual districts produce high lot coverage, seven- to nine-story apartment buildings set at or near the street line designed to be compatible with older buildings in medium-density neighborhoods.',
  r7b: 'R7B contextual districts generally produce six- to seven-story apartment buildings in medium-density neighborhoods.',
  r7d: 'R7D contextual districts promote new medium-density contextual development along transit corridors that range between 10 and 11 stories.',
  r7x: 'R7X contextual districts are flexible medium-density districts that generally produce 12- to 14-story buildings.',
  r8: 'R8 zoning districts are high-density apartment house districts that encourage mid-rise apartment buildings on smaller lots and, on larger lots, taller buildings with less lot coverage.',
  r8a: 'R8A contextual districts are high-density districts designed to produce apartment buildings at heights of roughly twelve to fourteen stories.',
  r8b: 'R8B contextual districts are designed to preserve the character and scale of taller rowhouse neighborhoods.',
  r8x: 'R8X contextual districts are flexible high-density districts that generally produce 15- to 17-story buildings.',
  r9: 'R9 districts are high-density districts that permit a wide range of building types including towers.',
  r9a: 'R9A contextual districts are high-density districts designed to produce new buildings between 13 and 17 stories that mimics older, high street wall buildings in high-density neighborhoods.',
  r9d: 'R9D contextual districts are high-density districts that permit towers that sit on a contextual base.',
  r9x: 'R9X contextual districts are high-density districts designed to produce new buildings between 16 and 20 stories that mimics older, high street wall buildings in high-density neighborhoods.',
  r10: 'R10 districts are high-density districts that permit a wide range of building types including towers.',
  r10a: 'R10-A contextual districts are high-density districts designed to produce new buildings between 21 and 23 stories that mimics older, high street wall buildings in high-density neighborhoods.',
  r10x: 'R10X contextual districts are high-density districts that permit towers that sit on a contextual base.',
  bpc: 'The Special Battery Park City District (BPC) was created, in accordance with a master plan, to govern extensive residential and commercial development in an area on the Hudson River close to the business core of Lower Manhattan. The district regulates permitted uses and bulk within three specified areas and establishes special design controls with respect to front building walls, building heights, waterfront design and parking.',
};

const zoningAbbr = {
  R2A: 'r2a',
  R2X: 'r2x',
  'R3-1': 'r31',
  'R3-2': 'r32',
  R3A: 'r3a',
  R3X: 'r3x',
  'R4-1': 'r41',
  R4A: 'r4a',
  R4B: 'r4b',
  R5A: 'r5a',
  R5B: 'r5b',
  R5D: 'r5d',
  R6A: 'r6a',
  R6B: 'r6b',
  R7A: 'r7a',
  R7B: 'r7b',
  R7D: 'r7d',
  R7X: 'r7x',
  R8A: 'r8a',
  R8B: 'r8b',
  R8X: 'r8x',
  R9A: 'r9a',
  R9D: 'r9d', // R9D does not have a route
  R9X: 'r9x',
  R10A: 'r10a',
  R10X: 'r10x', // R10X does not have a route
  BPC: 'bpc',
};

export default DS.Model.extend({
  geometry: DS.attr(),

  @computed('id')
  primaryzone(id) {
    // convert R6A to r6
    const primary = id.match(/\w\d*/)[0].toLowerCase();
    return primary;
  },

  @computed('id')
  zoneabbr(id) {
    const abbr = id.match(/\w\d*/)[0].toLowerCase();

    if (id in zoningAbbr) {
      return zoningAbbr[id];
    }

    return abbr;
  },

  @computed('zoneabbr')
  description(zoneabbr) {
    return zoningDescriptions[zoneabbr];
  },

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
