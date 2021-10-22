import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import carto from 'labs-zola/utils/carto';
import config from 'labs-zola/config/environment';

const { specialDistrictCrosswalk } = config;

const { attr } = DS;

const specialPurposeDistrictsSQL = function(table, spdist1, spdist2, spdist3) {
  return `SELECT DISTINCT sdname, sdlbl FROM ${table}
          WHERE sdlbl IN ('${spdist1}', '${spdist2}', '${spdist3}')`;
};

const getPrimaryZone = (zonedist = '') => {
  if (!zonedist) return '';
  let primary = zonedist.match(/\w\d*/)[0].toLowerCase();
  // special handling for c1 and c2
  if ((primary === 'c1') || (primary === 'c2')) primary = 'c1-c2';
  return primary;
};

// https://github.com/NYCPlanning/db-pluto/blob/main/pluto_build/data/lookup_bldgclass.csv
const bldgclassLookup = {
  A0: 'One Family Dwellings - Cape Cod',
  A1: 'One Family Dwellings - Two Stories Detached',
  A2: 'One Family Dwellings - One Story',
  A3: 'One Family Dwellings - Large Suburban Residence',
  A4: 'One Family Dwellings - City Residence',
  A5: 'One Family Dwellings - Attached or Semi-Detached',
  A6: 'One Family Dwellings - Summer Cottages',
  A7: 'One Family Dwellings - Mansion Type or Town House',
  A8: 'One Family Dwellings - Bungalow Colony/Land Coop Owned',
  A9: 'One Family Dwellings - Miscellaneous',
  
  B1: 'Two Family Dwellings - Brick',
  B2: 'Two Family Dwellings - Frame',
  B3: 'Two Family Dwellings - Converted From One Family',
  B9: 'Two Family Dwellings - Miscellaneous',
  
  C0: 'Walk Up Apartments - Three Families',
  C1: 'Walk Up Apartments - Over Six Families Without Stores',
  C2: 'Walk Up Apartments - Five to Six Families',
  C3: 'Walk Up Apartments - Four Families',
  C4: 'Walk Up Apartments - Old Law Tenements',
  C5: 'Walk Up Apartments - Converted Dwelling or ROoming House',
  C6: 'Walk Up Apartments - Cooperative',
  C7: 'Walk Up Apartments - Over Six Families With Stores',
  C8: 'Walk Up Apartments - Co-Op Conversion From Loft/Warehouse',
  C9: 'Walk Up Apartments - Garden Apartments',
  CM: 'Walk Up Apartments - Mobile Homes/Trailer Parks',
  
  D0: 'Elevator Apartments - Co-Op Conversion from Loft/Warehouse',
  D1: 'Elevator Apartments - Semi-fireproof (Without Stores)',
  D2: 'Elevator Apartments - Artists in Residence',
  D3: 'Elevator Apartments - Fireproof (Without Stores)',
  D4: 'Elevator Apartments - Cooperatives (Other Than Condominiums)',
  D5: 'Elevator Apartments - Converted',
  D6: 'Elevator Apartments - Fireproof (With Stores)',
  D7: 'Elevator Apartments - Semi-fireproof (With Stores)',
  D8: 'Elevator Apartments - Luxury Type',
  D9: 'Elevator Apartments - Miscellaneous',
  
  E1: 'Warehouses - Fireproof',
  E2: 'Warehouses - Contractors Warehouse',
  E3: 'Warehouses - Semi-fireproof',
  E4: 'Warehouses - Frame, Metal',
  E7: 'Warehouses - Warehouse, Self Storage',
  E9: 'Warehouses - Miscellaneous',
  
  F1: 'Factory and Industrial Buildings - Heavy Manufacturing (Fireproof)',
  F2: 'Factory and Industrial Buildings - Special Construction (Fireproof)',
  F4: 'Factory and Industrial Buildings - Semi-fireproof',
  F5: 'Factory and Industrial Buildings - Light Manufacturing',
  F8: 'Factory and Industrial Buildings - Tank Farms',
  F9: 'Factory and Industrial Buildings - Miscellaneous',
  
  G0: 'Garages and Gasoline Stations - Residential Tax Class 1 Garage',
  G1: 'Garages and Gasoline Stations - All Parking Garages',
  G2: 'Garages and Gasoline Stations - Auto Body/Collision or Auto Repair',
  G3: 'Garages and Gasoline Stations - Gas Station with Retail Store',
  G4: 'Garages and Gasoline Stations - Gas Station with Service/Auto Repair',
  G5: 'Garages and Gasoline Stations - Gas Station only with/without Small Kiosk',
  G6: 'Garages and Gasoline Stations - Licensed Parking Lot',
  G7: 'Garages and Gasoline Stations - Unlicensed Parking Lot',
  G8: 'Garages and Gasoline Stations - Car Sales/Rental with Showroom',
  G9: 'Garages and Gasoline Stations - Miscellaneous Garage or Gas Station',
  GU: 'Garages and Gasoline Stations - Car Sales/Rental without Showroom',
  GW: 'Garages and Gasoline Stations - Car Wash or Lubritorium Facility',
  
  H1: 'Hotels - Luxury Type',
  H2: 'Hotels - Full Service Hotel',
  H3: 'Hotels - Limited Service',
  H4: 'Hotels - Motels',
  H5: 'Hotels - Private Club, Luxury Type',
  H6: 'Hotels - Apartment Hotels',
  H7: 'Hotels - Apartment Hotels/Co-Op Owned',
  H8: 'Hotels - Dormitories',
  H9: 'Hotels - Miscellaneous',
  HB: 'Hotels - Boutique 10-100 Rooms',
  HH: 'Hotels - Hostel/Bed Rental in Dorm Like Setting',
  HR: 'Hotels - SRO',
  HS: 'Hotels - Extended Stay/Suite Amenities Similar to Apt.',
  
  I1: 'Hospitals and Health - Hospitals, Sanitariums, Mental Institutions',
  I2: 'Hospitals and Health - Infirmary',
  I3: 'Hospitals and Health - Dispensary',
  I4: 'Hospitals and Health - Staff Facilities',
  I5: 'Hospitals and Health - Health Center/Child Center/Clinic',
  I6: 'Hospitals and Health - Nursing Home',
  I7: 'Hospitals and Health - Adut Care Facility',
  I9: 'Hospitals and Health - Miscellaenous',
  
  J1: 'Theatres - Art Type (under 400 capacity',
  J2: 'Theatres - Art Type (over 400 capacity',
  J3: 'Theatres - Motion Picture Theatre With Balcony',
  J4: 'Theatres - Legitimate Theatres (Sole Use of Building)',
  J5: 'Theatres - Theatre in Mixed Use Building',
  J6: 'Theatres - TV Studios',
  J7: 'Theatres - Off-Broadway Theatre',
  J8: 'Theatres - Multiplex Picture Theatre',
  J9: 'Theatres - Miscellaneous',
  
  K1: 'Store Buildings - One Story Retail',
  K2: 'Store Buildings - Multi-Story Retail',
  K3: 'Store Buildings - Multi-Story Department Store',
  K4: 'Store Buildings - Predominant Retail with Other Uses',
  K5: 'Store Buildings - Stand Alone Food Establishment',
  K6: 'Store Buildings - Shopping Centers With or Without Parking',
  K7: 'Store Buildings - Banking Facilities With or Without Parking',
  K8: 'Store Buildings - Big Box Retail Not Affixed & Standing on own Lot with Parking',
  K9: 'Store Buildings - Miscellaneous',
  
  L1: 'Loft Buildings - Over Eight Stories (Mid-Manhattan Type',
  L2: 'Loft Buildings - Fireproof and Storage Type (Without Stores)',
  L3: 'Loft Buildings - Semi-fireproof',
  L8: 'Loft Buildings - With Retail Stores Other Than Type 1',
  L9: 'Loft Buildings - Miscellaneous',
  
  M1: 'Churches, Synagogues, Etc - Churhc, Synagogue, Chapel',
  M2: 'Churches, Synagogues, Etc - Mission Houses (Non-Residential)',
  M3: 'Churches, Synagogues, Etc - Parsonage, Rectory',
  M4: 'Churches, Synagogues, Etc - Convents',
  M9: 'Churches, Synagogues, Etc - Miscellaneous',
  
  N1: 'Asylums and Homes - Asylums',
  N2: 'Asylums and Homes - Homes for Indigent Children, Aged, and Homeless',
  N3: 'Asylums and Homes - Orphanages',
  N4: 'Asylums and Homes - Detention House for Wayward Girls',
  N9: 'Asylums and Homes - Miscellaneous',
  
  O1: 'Office Buildings - Office Only - 1 Story',
  O2: 'Office Buildings - Office Only - 2 to 6 Stories',
  O3: 'Office Buildings - Office Only - 7 to 19 Stories',
  O4: 'Office Buildings - Office Only or Office with Comm - 20 Stories or More',
  O5: 'Office Buildings - Office with Comm - 1 to 6 Stories',
  O6: 'Office Buildings - Office with Comm - 7 to 19 Stories',
  O7: 'Office Buildings - Professional Buildings/Stand Alone Funeral Homes',
  O8: 'Office Buildings - Office with Apartments Only (No Comm)',
  O9: 'Miscellaneous and Oly Style Bank Bldgs',
  
  P1: 'Places of Public Assembly (Indoor) and Cultural - Concert Halls',
  P2: 'Places of Public Assembly (Indoor) and Cultural - Lodge Rooms',
  P3: 'Places of Public Assembly (Indoor) and Cultural - YWCA, YMCA, YWHA, YMHA, PAL',
  P4: 'Places of Public Assembly (Indoor) and Cultural - Beach Club',
  P5: 'Places of Public Assembly (Indoor) and Cultural - Community Center',
  P6: 'Places of Public Assembly (Indoor) and Cultural - Amusement Place, Bathhouse, Boat House',
  P7: 'Places of Public Assembly (Indoor) and Cultural - Museum',
  P8: 'Places of Public Assembly (Indoor) and Cultural - Library',
  P9: 'Places of Public Assembly (Indoor) and Cultural - Miscellaenous',
  
  Q0: 'Outdoor Recreation Facilities - Open Space',
  Q1: 'Outdoor Recreation Facilities - Parks/Recreation Facilities',
  Q2: 'Outdoor Recreation Facilities - Playground',
  Q3: 'Outdoor Recreation Facilities - Outdoor Pool',
  Q4: 'Outdoor Recreation Facilities - Beach',
  Q5: 'Outdoor Recreation Facilities - Golf Course',
  Q6: 'Outdoor Recreation Facilities - Stadium/Race Track/Baseball Field',
  Q7: 'Outdoor Recreation Facilities - Tennis Court',
  Q8: 'Outdoor Recreation Facilities - Marina, Yacht Club',
  Q9: 'Outdoor Recreation Facilities - Miscellaneous',
  
  R0: 'Condominiums - Condo Billing Lot',
  R1: 'Condominiums - Residential Unit in 2 to 10 Unit Building',
  R2: 'Condominiums - Residential Unit in Walk-Up Building',
  R3: 'Condominiums - Residential Unit in 1 to 3 Story Building',
  R4: 'Condominiums - Residential Unit in Elevator Buidling',
  R5: 'Condominiums - Miscellaenous Commercial',
  R6: 'Condominiums - Residential Unit of 1 to 3 Unit Building-Orig Class 1',
  R7: 'Condominiums - Commercial Unit of 1 to 3 Unit Building-Orig Class 1',
  R8: 'Condominiums - Commercial Unit of 2 to 10 Unit Building',
  R9: 'Condominiums - Co-Op within a Condominium',
  RA: 'Condominiums - Cultural, Medical, Educational, etc',
  RB: 'Condominiums - Office Space',
  RC: 'Condominiums - Commercial Building (Mixed Commercial Condo Building Class Code)',
  RD: 'Condominiums - Residential Building (Mixed Residential Condo Building Class Code)',
  RG: 'Condominiums - Indoor Parking',
  RH: 'Condominiums - Hotel/Boatel',
  RI: 'Condominiums - Mixed Warehouse/Factory/Industrial & Commercial',
  RK: 'Condominiums - Retail Space',
  RM: 'Condominiums - Mixed Residential & Commercial Building',
  RP: 'Condominiums - Outdoor Parking',
  RR: 'Condominiums - Condominium Rentals',
  RS: 'Condominiums - Non-Business Storage Space',
  RT: 'Condominiums - Terraces/Gardens/Cabanas',
  RW: 'Condominiums - Warehouse/Factory/Industrial',
  RX: 'Condominiums - Mixed Residential, Commercial & Industrial',
  RZ: 'Condominiums - Mixed Residential & Warehouse',
  
  S0: 'Residence - Multiple Use - Primarily One Family with Two Stores or Offices',
  S1: 'Residence - Multiple Use - Primarily One Family with One Store or Office',
  S2: 'Residence - Multiple Use - Primarily Two Family with One Store or Office',
  S3: 'Residence - Multiple Use - Primarily Three Family with One Store or Office',
  S4: 'Residence - Multiple Use - Primarily Four Family with One Store or Office',
  S5: 'Residence - Multiple Use - Primarily Five to Six Family with One Store or Office',
  S9: 'Residence - Multiple Use - Single or Multiple Dwelling with Stores or Offices',
  
  T1: 'Transportation Facilities - Airport, Air Field, Terminal',
  T2: 'Transportation Facilities - Pier, Dock, Bulkhead',
  T9: 'Miscellaneous',
  
  U0: 'Utility Bureau Properties - Utility Company Land and Building',
  U1: 'Utility Bureau Properties - Bridge, Tunnel, Highway',
  U2: 'Utility Bureau Properties - Gas or Electric Utility',
  U3: 'Utility Bureau Properties - Ceiling Railroad',
  U4: 'Utility Bureau Properties - Telephone Utility',
  U5: 'Utility Bureau Properties - Communications Facilities Other Than Telephone',
  U6: 'Utility Bureau Properties - Railroad - Private Ownership',
  U7: 'Utility Bureau Properties - Transportation - Public Ownership',
  U8: 'Utility Bureau Properties - Revocable Consent',
  U9: 'Utility Bureau Properties - Miscellaneous',
  
  V0: 'Vacant Land - Zoned Residential; Not Manhattan',
  V1: 'Vacant Land - Zoned Commercial or Manhattan Residential',
  V2: 'Vacant Land - Zoned Commercial Adjacent to Class 1 Dwelling; Not Manhattan',
  V3: 'Vacant Land - Zoned Primarily Residential; Not Manhattan',
  V4: 'Vacant Land - Police or Fire Department',
  V5: 'Vacant Land - School Site or Yard',
  V6: 'Vacant Land - Library, Hospital or Museum',
  V7: 'Vacant Land - Port Authority of NY and NJ',
  V8: 'Vacant Land - New York State & U.S. Government',
  V9: 'Vacant Land - Miscellaneous',
  
  W1: 'Educational Structures - Public Elementary, Junior or Senior High',
  W2: 'Educational Structures - Parochial School, Yeshiva',
  W3: 'Educational Structures - School or Academy',
  W4: 'Educational Structures - Training School',
  W5: 'Educational Structures - City University',
  W6: 'Educational Structures - Other College and University',
  W7: 'Educational Structures - Theological Seminary',
  W8: 'Educational Structures - Other Private School',
  W9: 'Educational Structures - Miscellaneous',
  
  Y1: 'Selected Government Installations - Fire Department',
  Y2: 'Selected Government Installations - Police Department',
  Y3: 'Selected Government Installations - Prison, Jail, House of Detention',
  Y4: 'Selected Government Installations - Military and Naval Installation',
  Y5: 'Selected Government Installations - Department of Real Estate',
  Y6: 'Selected Government Installations - Department of Sanitation',
  Y7: 'Selected Government Installations - Department of Ports and Terminals',
  Y8: 'Selected Government Installations - Department of Public Works',
  Y9: 'Selected Government Installations - Department of Environmental Protection',
  
  Z0: 'Miscellaneous - Tennis Court, Pool, Shed, etc.',
  Z1: 'Miscellaneous - Court House',
  Z2: 'Miscellaneous - Public Parking Area',
  Z3: 'Miscellaneous - Post Office',
  Z4: 'Miscellaneous - Foreign Government',
  Z5: 'Miscellaneous - Land Under Water',
  Z6: 'Miscellaneous - United Nations',
  Z7: 'Miscellaneous - Easement',
  Z8: 'Miscellaneous - Cemetery',
  Z9: 'Miscellaneous - Other',
};

const boroughLookup = {
  BX: 'Bronx',
  BK: 'Brooklyn',
  MN: 'Manhattan',
  QN: 'Queens',
  SI: 'Staten Island',
};

const boroLookup = {
  1: 'Manhattan',
  2: 'Bronx',
  3: 'Brooklyn',
  4: 'Queens',
  5: 'Staten Island',
};

const ownertypeLookup = {
  C: 'City',
  M: 'Mixed City & Private',
  O: 'Public Authority, State, or Federal',
  P: 'Private',
  X: 'Mixed',
};

const landuseLookup = {
  '01': 'One & Two Family Buildings',
  '02': 'Multi-Family Walk-Up Buildings',
  '03': 'Multi-Family Elevator Buildings',
  '04': 'Mixed Residential & Commercial Buildings',
  '05': 'Commercial & Office Buildings',
  '06': 'Industrial & Manufacturing',
  '07': 'Transportation & Utility',
  '08': 'Public Facilities & Institutions',
  '09': 'Open Space & Outdoor Recreation',
  10: 'Parking Facilities',
  11: 'Vacant Land',
};

// this model fragment structures the "properties"
// node of a geojson feature
export default class LotFragment extends MF.Fragment {
  @attr('string') address;

  @attr('number') bbl;

  @attr('number') bldgarea;

  @attr('string') bldgclass;

  @attr('number') lat;

  @attr('number') lon;

  @attr('number') block;

  @attr('string') borough;

  @attr('string') cd;

  @attr('number') condono;

  @attr('string') council;

  @attr('string') firecomp;

  @attr('string') histdist;

  @attr('string') landmark;

  @attr('string') landuse;

  @attr('number') lot;

  @attr('number') lotarea;

  @attr('number') lotdepth;

  @attr('number') lotfront;

  @attr('number') notes;

  @attr('number') numbldgs;

  @attr('number') numfloors;

  @attr('string') ownername;

  @attr('string') ownertype;

  @attr('string') overlay1;

  @attr('string') overlay2;

  @attr('string') policeprct;

  @attr('string') sanitboro;

  @attr('string') sanitdistr;

  @attr('string') sanitsub;

  @attr('string') schooldist;

  @attr('string') spdist1;

  @attr('string') spdist2;

  @attr('string') spdist3;

  @attr('number') unitsres;

  @attr('number') unitstotal;

  @attr('string') yearbuilt;

  @attr('number') yearalter1;

  @attr('number') yearalter2;

  @attr('number') zipcode;

  @attr('string') zonedist1;

  @attr('string') zonedist2;

  @attr('string') zonedist3;

  @attr('string') zonedist4;

  @attr('string') zonemap;

  @alias('borocode') boro;

  @computed('bldgclass')
  get bldgclassname() {
    return bldgclassLookup[this.bldgclass];
  }

  @computed('cd')
  get borocode() {
    const borocd = this.cd;
    return `${borocd}`.substring(0, 1);
  }

  @computed('borough')
  get boroname() {
    return boroughLookup[this.borough];
  }

  @computed('cd')
  get cdName() {
    const borocd = this.cd;
    const boro = `${borocd}`.substring(0, 1);
    const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
    return `${boroLookup[boro]} Community District ${cd}`;
  }

  @computed('cd')
  get cdURLSegment() {
    const borocd = this.cd;
    const boro = `${borocd}`.substring(0, 1);
    const cleanBorough = boroLookup[boro].toLowerCase().replace(/\s/g, '-');
    const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
    return `${cleanBorough}/${cd}`;
  }

  @computed('landuse')
  get landusename() {
    return landuseLookup[this.landuse];
  }

  @computed('ownertype')
  get ownertypename() {
    return ownertypeLookup[this.ownertype];
  }

  @computed('address')
  get housenum() {
    const match = this.address.match(/([0-9-]*)\s[0-9A-Za-z\s]*/);
    return match ? match[1] : '';
  }

  @computed('address')
  get street() {
    const match = this.address.match(/[0-9-]*\s([0-9A-Za-z\s]*)/);
    return match ? match[1] : '';
  }

  @computed('zonemap')
  get paddedZonemap() {
    const zonemap = this.get('zonemap');
    return (`0${zonemap}`).slice(-3);
  }

  @computed('zonedist1')
  get primaryzone1() {
    const zonedist = this.get('zonedist1');
    return getPrimaryZone(zonedist);
  }

  @computed('zonedist2')
  get primaryzone2() {
    const zonedist = this.get('zonedist2');
    return getPrimaryZone(zonedist);
  }

  @computed('zonedist3')
  get primaryzone3() {
    const zonedist = this.get('zonedist3');
    return getPrimaryZone(zonedist);
  }

  @computed('zonedist4')
  get primaryzone4() {
    const zonedist = this.get('zonedist4');
    return getPrimaryZone(zonedist);
  }

  @computed('spdist1', 'spdist2', 'spdist3')
  get parentSpecialPurposeDistricts() {
    const DISTRICT_TOOLS_URL = 'https://www1.nyc.gov/site/planning/zoning/districts-tools';
    const spdist1 = this.get('spdist1');
    const spdist2 = this.get('spdist2');
    const spdist3 = this.get('spdist3');

    return carto.SQL(specialPurposeDistrictsSQL('special_purpose_districts', spdist1, spdist2, spdist3))
      .then(response => response.map(
        (item) => {
          const [, [anchorName, boroName]] = specialDistrictCrosswalk
            .find(([dist]) => dist === item.sdname);
          const specialDistrictLink = `${DISTRICT_TOOLS_URL}/special-purpose-districts-${boroName}.page#${anchorName}`;

          return {
            label: item.sdlbl.toUpperCase(),
            name: item.sdname,
            anchorName,
            boroName,
            specialDistrictLink,
          };
        },
      ));
  }

  @computed('borocode', 'block', 'lot')
  get biswebLink() {
    const BISWEB_HOST = 'http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet';

    return `${BISWEB_HOST}?allborough=${this.borocode}&allblock=${this.block}&alllot=${this.lot}&go5=+GO+&requestid=0`;
  }

  @computed('cdURLSegment')
  get fullCommunityDistrictURL() {
    return `https://communityprofiles.planning.nyc.gov/${this.cdURLSegment}`;
  }

  @computed('primaryzone1', 'primaryzone2', 'primaryzone3', 'primaryzone4')
  get zoneDistLinks() {
    const primaryZones = this.getProperties('primaryzone1', 'primaryzone2', 'primaryzone3', 'primaryzone4');

    Object.keys(primaryZones).forEach((key) => {
      const value = primaryZones[key];
      primaryZones[key] = `https://www1.nyc.gov/site/planning/zoning/districts-tools/${value}.page`;
    });

    return {
      ...primaryZones,
    };
  }

  @computed('bbl')
  get digitalTaxMapLink() {
    return `http://maps.nyc.gov/taxmap/map.htm?searchType=BblSearch&featureTypeName=EVERY_BBL&featureName=${this.bbl}`;
  }

  @computed('zonemap')
  get zoningMapLink() {
    return `http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/map${this.zonemap}.pdf`;
  }

  @computed('paddedZonemap')
  get historicalZoningMapLink() {
    return `http://www1.nyc.gov/assets/planning/download/pdf/zoning/zoning-maps/historical-zoning-maps/maps${this.paddedZonemap}.pdf`;
  }

  @computed('borocode', 'block', 'lot')
  get ACRISLink() {
    return `http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${this.borocode}&block=${this.block}&lot=${this.lot}`;
  }

  @computed('boro', 'housenum', 'street')
  get housingInfoLink() {
    return `https://hpdonline.hpdnyc.org/Hpdonline/Provide_address.aspx?p1=${this.boro}&p2=${this.housenum}&p3=${this.street}&SearchButton=Search`;
  }

  @computed('council')
  get councilLink() {
    return `https://council.nyc.gov/district-${this.council}/`;
  }
}
