import DS from 'ember-data';
import { computed } from 'ember-decorators/object'; // eslint-disable-line
import bbox from 'npm:@turf/bbox';

const zoningDescriptions = {
  r1: 'R1 districts are leafy, low-density neighborhoods of large, single-family detached homes on spacious lots. Resembling many suburbs, these districts are mapped in a few areas of the city, such as Todt Hill (R1-1) in Staten Island, Jamaica Estates (R1-2) in Queens, and Fieldston (R1-2) in the Bronx. R1-2A is mapped in Forest Hills in Queens.',

  r2: 'Residential development in R2 districts is limited exclusively to single-family detached houses. Floral Park in Queens, parts of City Island and Riverdale in the Bronx, and Westerleigh on Staten Island’s north shore are typical R2 districts.',

  r3: 'Description coming soon',

  r4: 'R4 districts allow all types of ­housing at a slightly higher density than permit­ted in R3-2 districts. The floor area ratio (FAR) of 0.75, plus an attic allowance of up to 20% for inclusion of space under the pitched roof common to these districts, ­usually produces buildings with three stories instead of the two-story homes characteristic of R3 districts. Much of the residential development in North Corona in Queens and Arden Heights in Staten Island is typical of R4 districts.',

  r5: 'R5 districts allow a variety of housing at a higher density than permitted in R3-2 and R4 districts. The floor area ratio (FAR)of 1.25 typically produces three-and four-story attached houses and small apartment houses. With a height limit of 40 feet, R5 districts provide a transition between lower- and higher-density neighborhoodsand are widely mapped in Brooklyn, Queens and the Bronx. Portions of Windsor Terrace and Ocean Parkway in Brooklyn are R5 districts.',

  r6: 'R6 zoning districts are widely mapped in built-up, medium-density areas in Brooklyn, Queens and the Bronx. The character of R6 districts can range from neighborhoods with a diverse mix of building types and heights to large-scale “tower in the park” developments such as Ravenswood in Queens and Homecrest in Brooklyn. Developers can choose between two sets of bulk regulations. Standard height factor regulations, introduced in 1961, produce small multi-family buildings on small zoning lots and, on larger lots, tall buildings that are set back from the street. Optional Quality Housing regulations produce high lot coverage buildings within height limits that often reflect the scale of older, pre-1961 apartment buildings in the neighborhood.',

  r7: 'R7 districts are medium-density apartment house districts mapped in much of the Bronx as well as the Upper West Side in Manhattan and Brighton Beach in Brooklyn. The height factor regulations for R7 districts encourage lower apartment buildings on smaller zoning lots and, on larger lots, taller buildings with less lot coverage. As an alternative, developers may choose the optional Quality Housing regulations to build lower buildings with greater lot coverage.',

  r8: 'Apartment buildings in R8 districts can range from mid-rise, eight- to ten-story buildings to much taller buildings set back from the street on large zoning lots. This high density residential district is mapped along the Grand Concourse in the Bronx and on the edge of Brooklyn Heights. R8 districts are also widely mapped in Manhattan neighborhoods, such as Washington Heights. New buildings in R8 districts may be developed under either height factor regulations or the optional Quality Housing regulations that often reflect the older, pre-1961 neighborhood streetscape.',

  r9: 'In R9 districts, which are mapped along several major thoroughfares in Manhattan, such as West 96th Street, new buildings can be developed under height factor regulations or the optional Quality Housing regulations as in R6 through R8 districts. The optional Quality Housing regulations in R9 districts are the same as the R9A regulations. Designed in part for institutional purposes (mainly hospitals), most R9 height factor buildings are developed pursuant to the tower rules, which are applicable only in the city’s higher-density areas, and commercial districts with an R9 residential district equivalent (C1‑8, C2-7 and C6-3).',

  r10: 'R10 districts are mapped along portions of Fifth and Park Avenues in Manhattan; however, most buildings that conform to the R10 building envelope are found in commercial districts with a residential district equivalent of R10, the highest residential density in the city. Much of Midtown, Lower Manhattan and major avenues in Manhattan, as well as parts of Downtown Brooklyn and Long Island City, are mapped at R10 density. The floor area ratio (FAR) is 10.0. Developers may choose between Quality Housing regulations or tower regulations; height factor regulations are not applicable.',

  c1: 'C1-6 through C1-9 and C2-6 through C2-8 districts are commercial districts that are predominantly residential in character. They are mapped along major thoroughfares in medium- and higher-density areas of the city, such as Second and Lexington Avenues on the Upper East Side or Columbus and Amsterdam Avenues on the Upper West Side. As in commercial overlays districts, typical retail uses include grocery stores, dry cleaners, drug stores, restaurants and local clothing stores that cater to the daily needs of the immediate neighborhood. There are only minor differences between C1 and C2 districts, with a slightly wider range of uses permitted in C2 districts, such as funeral homes and local repair services. In mixed buildings, commercial uses are limited to one or two floors and must always be located below the residential use.',

  c2: 'C1-6 through C1-9 and C2-6 through C2-8 districts are commercial districts that are predominantly residential in character. They are mapped along major thoroughfares in medium- and higher-density areas of the city, such as Second and Lexington Avenues on the Upper East Side or Columbus and Amsterdam Avenues on the Upper West Side. As in commercial overlays districts, typical retail uses include grocery stores, dry cleaners, drug stores, restaurants and local clothing stores that cater to the daily needs of the immediate neighborhood. There are only minor differences between C1 and C2 districts, with a slightly wider range of uses permitted in C2 districts, such as funeral homes and local repair services. In mixed buildings, commercial uses are limited to one or two floors and must always be located below the residential use.',

  c3: 'C3 and C3A districts permit waterfront recreational activities, primarily boating and fishing, in areas along the waterfront that are usually adjacent to residential districts. In addition to facilities for docking, renting, servicing and storing fishing and pleasure boats, permitted activities include aquatic sports equipment sales and rentals, bicycle shops, ice cream stores and public and private beaches. These waterfront uses are listed in Use Group 14. C3 and C3A districts also permit residences and community facilities (Use Groups 1–4). C3A districts are mapped in Staten Island and the Throgs Neck area of the Bronx. C3 districts are found on City Island and along Mill Basin in Brooklyn.',

  c4: 'C4 districts are mapped in regional commercial centers, such as Flushing in Queens and the Hub in the Bronx, that are located outside of the central business districts. In these areas, specialty and department stores, theaters and other commercial and office uses serve a larger region and generate more traffic than neighborhood shopping areas. Use Groups 5, 6, 8, 9, 10 and 12, which include most retail establishments, are permitted in C4 districts. Uses that would interrupt the desired continuous retail frontage, such as home maintenance and repair service stores listed in Use Group 7, are not allowed.',

  c5: 'C5 is a central commercial district with continuous retail frontage intended for offices and retail establishments that serve the entire metropolitan region. Famous shopping streets, such as Fifth Avenue, Madison Avenue and East 57th Street are C5 districts. Parts of Lower Manhattan, Downtown Brooklyn and Long Island City are also within C5 districts.',

  c6: 'C6 districts permit a wide range of high-bulk commercial uses requiring a central ­location. Most C6 districts are in Manhattan, Downtown Brooklyn and Downtown Jamaica; a C6-3D district is mapped in the Civic Center area of the Bronx. Corporate headquarters, large hotels, department stores and entertainment facilities in high-rise mixed buildings are permitted in C6 districts.',

  c7: 'C7 districts are specifically designated for large open amusement parks. In addition to the types of activities commonly found in amusement parks, such as ferris wheel rides and games of chance (Use Group 15), C7 districts also permit boating facilities and other large open and enclosed entertainment facilities like skating rinks, sports stadiums and miniature golf courses (Use Groups 12–14). Residential and community facility uses are not permitted.',

  c8: 'C8 districts, bridging commercial and manufacturing uses, provide for automotive and other heavy commercial services that often require large amounts of land. Parts of Bay Ridge in Brooklyn and Castleton Corners on Staten Island are mapped C8. Typical uses are automobile showrooms and repair shops, warehouses, gas stations and car washes—although all commercial uses (except large, open amusements) as well as certain community facilities are permitted in C8 districts. Housing is not permitted and performance standards are imposed for certain semi-industrial uses (Use Group 11A and 16).',

  m1: 'M1 districts range from the Garment District in Manhattan and Port Morris in the Bronx with multistory lofts, to parts of Red Hook or College Point with one- or two-story warehouses characterized by loading bays. M1 districts are often buffers between M2 or M3 districts and adjacent residential or commercial districts. M1 districts typically include light industrial uses, such as woodworking shops, repair shops, and wholesale service and storage facilities. Nearly all industrial uses are allowed in M1 districts if they meet the stringent M1 performance standards. Offices, hotels and most retail uses are also permitted. Certain community facilities, such as hospitals, are allowed in M1 districts only by special permit, but houses of worship are allowed as-of-right.',

  m2: 'M2 districts occupy the middle ground between light and heavy industrial areas. The four M2 districts, with different floor area ratios (FAR) and parking requirements, are mapped mainly in the city’s older industrial areas along the waterfront. M2-1 districts, for example, are mapped along much of Brooklyn’s Red Hook and Sunset Park waterfronts. Manhattan’s Hudson River piers, including the Passenger Ship Terminal and many municipal facilities, are within M2-3 districts.',

  m3: 'M3 districts are designated for areas with heavy industries that generate noise, traffic or pollutants. Typical uses include power plants, solid waste transfer facilities and recycling plants, and fuel supply depots. Even in M3 districts, uses with potential nuisance effects are required to conform to minimum performance standards.',
};

export default DS.Model.extend({
  geometry: DS.attr(),

  @computed('id')
  primaryzone(id) {
    const primary = id.match(/\w\d*/)[0].toLowerCase();
    return primary;
  },

  @computed('primaryzone')
  description(primaryzone) {
    return zoningDescriptions[primaryzone];
  },

  @computed('geometry')
  bounds(geometry) {
    return bbox(geometry);
  },
});
