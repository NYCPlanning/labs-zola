import carto from 'labs-zola/utils/carto';
import config from 'labs-zola/config/environment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import bblDemux from 'labs-zola/utils/bbl-demux';
import LayerRecordComponent from './-base';

const { specialDistrictCrosswalk } = config;

const specialPurposeDistrictsSQL = function (table, spdist1, spdist2, spdist3) {
  return `SELECT DISTINCT sdname, sdlbl FROM ${table}
          WHERE sdlbl IN ('${spdist1}', '${spdist2}', '${spdist3}')`;
};

const getPrimaryZone = (zonedist = '') => {
  if (!zonedist) return '';
  let primary = zonedist.match(/\w\d*/)[0].toLowerCase();
  // special handling for c1 and c2
  if (primary === 'c1' || primary === 'c2') primary = 'c1-c2';
  // special handling for c3 and c3a
  if (primary === 'c3' || primary === 'c3a') primary = 'c3-c3a';
  return primary;
};

const bldgclassLookup = {
  A0: 'One Family Dwellings - Cape Cod',
  A1: 'One Family Dwellings - Two Stories Detached (Small or Moderate Size, With or Without Attic)',
  A2: 'One Family Dwellings - One Story (Permanent Living Quarters)',
  A3: 'One Family Dwellings - Large Suburban Residence',
  A4: 'One Family Dwellings - City Residence',
  A5: 'One Family Dwellings - Attached or Semi-Detached',
  A6: 'One Family Dwellings - Summer Cottages',
  A7: 'One Family Dwellings - Mansion Type or Town House',
  A8: 'One Family Dwellings - Bungalow Colony/Land Coop Owned',
  A9: 'One Family Dwellings - Miscellaneous',

  B1: 'Two Family Dwellings - Brick',
  B2: 'Frame',
  B3: 'Converted From One Family',
  B9: 'Miscellaneous',

  C0: 'Walk-up Apartments - Three Families',
  C1: 'Walk-up Apartments - Over Six Families Without Stores',
  C2: 'Walk-up Apartments - Five to Six Families',
  C3: 'Walk-up Apartments - Four Families',
  C4: 'Walk-up Apartments - Old Law Tenements',
  C5: 'Walk-up Apartments - Converted Dwelling or Rooming House',
  C6: 'Walk-up Apartments - Cooperative',
  C7: 'Walk-up Apartments - Over Six Families With Stores',
  C8: 'Walk-up Apartments - Co-Op Conversion From Loft/Warehouse',
  C9: 'Walk-up Apartments - Garden Apartments',
  CM: 'Mobile Homes/Trailer Parks',

  D0: 'Elevator Apartments - Co-op Conversion from Loft/Warehouse',
  D1: 'Elevator Apartments - Semi-fireproof (Without Stores)',
  D2: 'Elevator Apartments - Artists in Residence',
  D3: 'Elevator Apartments - Fireproof (Without Stores)',
  D4: 'Elevator Apartments - Cooperatives (Other Than Condominiums)',
  D5: 'Elevator Apartments - Converted',
  D6: 'Elevator Apartments - Fireproof With Stores',
  D7: 'Elevator Apartments - Semi-Fireproof With Stores',
  D8: 'Elevator Apartments - Luxury Type',
  D9: 'Elevator Apartments - Miscellaneous',

  E1: 'Warehouses - Fireproof',
  E2: 'Warehouses - Contractor’s Warehouse',
  E3: 'Warehouses - Semi-Fireproof',
  E4: 'Warehouses - Frame, Metal',
  E7: 'Warehouses - Warehouse, Self Storage',
  E9: 'Warehouses - Miscellaneous',

  F1: 'Factory and Industrial Buildings - Heavy Manufacturing - Fireproof',
  F2: 'Factory and Industrial Buildings - Special Construction - Fireproof',
  F4: 'Factory and Industrial Buildings - Semi-Fireproof',
  F5: 'Factory and Industrial Buildings - Light Manufacturing',
  F8: 'Factory and Industrial Buildings - Tank Farms',
  F9: 'Factory and Industrial Buildings - Miscellaneous',

  G: 'GARAGES AND GASOLINE STATIONS',
  G0: 'Residential Tax Class 1 Garage',
  G1: 'All Parking Garages',
  G2: 'Auto Body/Collision or Auto Repair',
  G3: 'Gas Station with Retail Store',
  G4: 'Gas Station with Service/Auto Repair',
  G5: 'Gas Station only with/without Small Kiosk',
  G6: 'Licensed Parking Lot',
  G7: 'Unlicensed Parking Lot',
  G8: 'Car Sales/Rental with Showroom',
  G9: 'Miscellaneous Garage or Gas Station',
  GU: 'Car Sales/Rental without Showroom',
  GW: 'Car Wash or Lubritorium Facility',

  H1: 'Hotels - Luxury Type',
  H2: 'Hotels - Full Service Hotel',
  H3: 'Hotels - Limited Service – Many Affiliated with National Chain',
  H4: 'Hotels - Motels',
  H5: 'Hotels - Private Club, Luxury Type',
  H6: 'Hotels - Apartment Hotels',
  H7: 'Hotels - Apartment Hotels-Co-op Owned',
  H8: 'Hotels - Dormitories',
  H9: 'Hotels - Miscellaneous',
  HB: 'Hotels - Boutique 10-100 Rooms, with Luxury Facilities, Themed, Stylish, with Full Service Accommodations',
  HH: 'Hotels - Hostel-Bed Rental in Dorm Like Setting with Shared Rooms & Bathrooms',
  HR: 'Hotels - SRO- 1 or 2 People Housed in Individual Rooms in Multiple Dwelling Affordable Housing',
  HS: 'Hotels - Extended Stay/Suite Amenities Similar to Apt., Typically Charge Weekly Rates & Less Expensive than Full Service Hotel',

  I1: 'Hospitals and Health - Hospitals, Sanitariums, Mental Institutions',
  I2: 'Hospitals and Health - Infirmary',
  I3: 'Hospitals and Health - Dispensary',
  I4: 'Hospitals and Health - Staff Facilities',
  I5: 'Hospitals and Health - Health Center, Child Center, Clinic',
  I6: 'Hospitals and Health - Nursing Home',
  I7: 'Hospitals and Health - Adult Care Facility',
  I9: 'Hospitals and Health - Miscellaneous',

  J1: 'Theatres - Art Type (Seating Capacity under 400 Seats)',
  J2: 'Theatres - Art Type (Seating Capacity Over 400 Seats)',
  J3: 'Theatres - Motion Picture Theatre with Balcony',
  J4: 'Theatres - Legitimate Theatres (Theatre Sole Use of Building)',
  J5: 'Theatres - Theatre in Mixed Use Building',
  J6: 'Theatres - T.V. Studios',
  J7: 'Theatres - Off-Broadway Type',
  J8: 'Theatres - Multiplex Picture Theatre',
  J9: 'Theatres - Miscellaneous',

  K1: 'Store Buildings (Taxpayers Included) - One Story Retail Building',
  K2: 'Store Buildings (Taxpayers Included) - Multi-Story Retail Building',
  K3: 'Store Buildings (Taxpayers Included) - Multi-Story Department Store',
  K4: 'Store Buildings (Taxpayers Included) - Predominant Retail with Other Uses',
  K5: 'Store Buildings (Taxpayers Included) - Stand Alone Food Establishment',
  K6: 'Store Buildings (Taxpayers Included) - Shopping Centers With or Without Parking',
  K7: 'Store Buildings (Taxpayers Included) - Banking Facilities with or Without Parking',
  K8: 'Store Buildings (Taxpayers Included) - Big Box Retail Not Affixed & Standing On Own Lot with Parking',
  K9: 'Store Buildings (Taxpayers Included) - Miscellaneous',

  L1: 'Loft Buildinghs - Over Eight Stores (Mid-Manhattan Type)',
  L2: 'Loft Buildinghs - Fireproof and Storage Type (Without Stores)',
  L3: 'Loft Buildinghs - Semi-Fireproof',
  L8: 'Loft Buildinghs - With Retail Stores Other Than Type 1',
  L9: 'Loft Buildinghs - Miscellaneous',

  M1: 'Churches, Synagogues, etc. - Church, Synagogue, Chapel',
  M2: 'Churches, Synagogues, etc. - Mission House (Non-Residential)',
  M3: 'Churches, Synagogues, etc. - Parsonage, Rectory',
  M4: 'Churches, Synagogues, etc. - Convents',
  M9: 'Churches, Synagogues, etc. - Miscellaneous',

  N1: 'Asylums and Homes - Asylums',
  N2: 'Asylums and Homes - Homes for Indigent Children, Aged, Homeless',
  N3: 'Asylums and Homes - Orphanages',
  N4: 'Asylums and Homes - Detention House For Wayward Girls',
  N9: 'Asylums and Homes - Miscellaneous',

  O1: 'Office Buildings - Office Only – 1 Story',
  O2: 'Office Buildings - Office Only – 2-6 Stories',
  O3: 'Office Buildings - Office Only – 7-19 Stories',
  O4: 'Office Buildings - Office Only or Office with Comm – 20 Stories or More',
  O5: 'Office Buildings - Office with Comm – 1 to 6 Stories',
  O6: 'Office Buildings - Office with Comm – 7 to 19 Stories',
  O7: 'Office Buildings - Professional Buildings/Stand Alone Funeral Homes',
  O8: 'Office Buildings - Office with Apartments Only (No Comm)',
  O9: 'Office Buildings - Miscellaneous and Old Style Bank Bldgs',

  P1: 'Places of Public Assembly (indoor) and Cultural - Concert Halls',
  P2: 'Places of Public Assembly (indoor) and Cultural - Lodge Rooms',
  P3: 'Places of Public Assembly (indoor) and Cultural - YWCA, YMCA, YWHA, YMHA, PAL',
  P4: 'Places of Public Assembly (indoor) and Cultural - Beach Club',
  P5: 'Places of Public Assembly (indoor) and Cultural - Community Center',
  P6: 'Places of Public Assembly (indoor) and Cultural - Amusement Place, Bathhouse, Boat House',
  P7: 'Places of Public Assembly (indoor) and Cultural - Museum',
  P8: 'Places of Public Assembly (indoor) and Cultural - Library',
  P9: 'Places of Public Assembly (indoor) and Cultural - Miscellaneous',

  Q0: 'Outdoor Recreation Facilities - Open Space',
  Q1: 'Outdoor Recreation Facilities - Parks/Recreation Facilities',
  Q2: 'Outdoor Recreation Facilities - Playground',
  Q3: 'Outdoor Recreation Facilities - Outdoor Pool',
  Q4: 'Outdoor Recreation Facilities - Beach',
  Q5: 'Outdoor Recreation Facilities - Golf Course',
  Q6: 'Outdoor Recreation Facilities - Stadium, Race Track, Baseball Field',
  Q7: 'Outdoor Recreation Facilities - Tennis Court',
  Q8: 'Outdoor Recreation Facilities - Marina, Yacht Club',
  Q9: 'Outdoor Recreation Facilities - Miscellaneous',

  R0: 'Condominiums - Condo Billing Lot',
  R1: 'Condominiums - Residential Unit in 2-10 Unit Bldg',
  R2: 'Condominiums - Residential Unit in Walk-Up Bldg',
  R3: 'Condominiums - Residential Unit in 1-3 Story Bldg',
  R4: 'Condominiums - Residential Unit in Elevator Bldg',
  R5: 'Condominiums - Miscellaneous Commercial',
  R6: 'Condominiums - Residential Unit of 1-3 Unit Bldg-Orig Class 1',
  R7: 'Condominiums - Commercial Unit of 1-3 Units Bldg- Orig Class 1',
  R8: 'Condominiums - Commercial Unit of 2-10 Unit Bldg',
  R9: 'Condominiums - Co-op within a Condominium',
  RA: 'Condominiums - Cultural, Medical, Educational, etc.',
  RB: 'Condominiums - Office Space',
  RC: 'Condominiums - Commercial Building (Mixed Commercial Condo Building Classification Codes)',
  RD: 'Condominiums - Residential Building (Mixed Residential Condo Building Classification Codes)',
  RG: 'Condominiums - Indoor Parking',
  RH: 'Condominiums - Hotel/Boatel',
  RI: 'Condominiums - Mixed Warehouse/Factory/Industrial & Commercial',
  RK: 'Condominiums - Retail Space',
  RM: 'Condominiums - Mixed Residential & Commercial Building (Mixed Residential & Commercial)',
  RP: 'Condominiums - Outdoor Parking',
  RR: 'Condominiums - Condominium Rentals',
  RS: 'Condominiums - Non-Business Storage Space',
  RT: 'Condominiums - Terraces/Gardens/Cabanas',
  RW: 'Condominiums - Warehouse/Factory/Industrial',
  RX: 'Condominiums - Mixed Residential, Commercial & Industrial',
  RZ: 'Condominiums - Mixed Residential & Warehouse',

  S0: 'Residence (Multiple Use) - Primarily One Family with Two Stores or Offices',
  S1: 'Residence (Multiple Use) - Primarily One Family with One Store or Office',
  S2: 'Residence (Multiple Use) - Primarily Two Family with One Store or Office',
  S3: 'Residence (Multiple Use) - Primarily Three Family with One Store or Office',
  S4: 'Residence (Multiple Use) - Primarily Four Family with One Store or Office',
  S5: 'Residence (Multiple Use) - Primarily Five to Six Family with One Store or Office',
  S9: 'Residence (Multiple Use) - Single or Multiple Dwelling with Stores or Offices',

  T1: 'Transportation Facilities (Assessed in ORE) - Airport, Air Field, Terminal',
  T2: 'Transportation Facilities (Assessed in ORE) - Pier, Dock, Bulkhead',
  T9: 'Transportation Facilities (Assessed in ORE) - Miscellaneous',

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

  Y1: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Fire Department',
  Y2: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Police Department',
  Y3: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Prison, Jail, House of Detention',
  Y4: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Military and Naval Installation',
  Y5: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Real Estate',
  Y6: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Sanitation',
  Y7: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Ports and Terminals',
  Y8: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Public Works',
  Y9: 'Selected Government Installations (Excluding Office Buildings, Training Schools, Academic, Garages, Warehouses, Piers, Air Fields, Vacant Land, Vacant Sites, and Land Under Water and Easements) - Department of Environmental Protection',

  Z0: 'Miscellaneous - Tennis Court, Pool, Shed, etc.',
  Z1: 'Miscellaneous - Court House',
  Z2: 'Miscellaneous - Public Parking Area',
  Z3: 'Miscellaneous - Post Office',
  Z4: 'Miscellaneous - Foreign Government',
  Z5: 'Miscellaneous - United Nations',
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

export default class TaxLotRecordComponent extends LayerRecordComponent {
  @service router;

  @service mainMap;

  @action
  linkToLotComparison() {
    this.router.transitionTo(
      'map-feature.lot-comparison',
      this.model.borocode,
      this.model.block,
      this.model.lot,
      0,
      0,
      0
    );
  }

  @action
  removeLotFromComparison(otherModelId) {
    this.set('mainMap.comparisonSelected', null);
    const { boro, block, lot } = bblDemux(otherModelId);
    this.router.transitionTo(
      'map-feature.lot-comparison',
      boro,
      block,
      lot,
      0,
      0,
      0
    );
  }

  get bldgclassname() {
    return bldgclassLookup[this.model.bldgclass];
  }

  get boroname() {
    return boroughLookup[this.model.borough];
  }

  get cdName() {
    const borocd = this.model.cd;
    const cdborocode = `${borocd}`.substring(0, 1);
    const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
    return `${boroLookup[cdborocode]} Community District ${cd}`;
  }

  get boroSlashCd() {
    const borocd = this.model.cd;
    const cdborocode = `${borocd}`.substring(0, 1);
    const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
    return `${boroLookup[cdborocode].replace(' ', '-').toLowerCase()}/${cd}`;
  }

  get cdURLSegment() {
    const borocd = this.model.cd;
    const borocode = this.model.borocode; // eslint-disable-line prefer-destructuring
    const cleanBorough = boroLookup[borocode].toLowerCase().replace(/\s/g, '-');
    const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
    return `${cleanBorough}/${cd}`;
  }

  get googleMapsURL() {
    const encodedAddress = encodeURIComponent(
      `${this.model.address}, ${this.model.zipcode}`
    );
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }

  get landusename() {
    return landuseLookup[this.model.landuse];
  }

  get ownertypename() {
    return ownertypeLookup[this.model.ownertype];
  }

  get housenum() {
    const match = this.model.address.match(/([0-9-]*)\s[0-9A-Za-z\s]*/);
    return match ? match[1] : '';
  }

  get street() {
    const match = this.model.address.match(/[0-9-]*\s([0-9A-Za-z\s]*)/);
    return match ? match[1] : '';
  }

  get paddedZonemap() {
    const { zonemap } = this.model;
    return `0${zonemap}`.slice(-3);
  }

  get primaryzone1() {
    const zonedist = this.model.zonedist1;
    return getPrimaryZone(zonedist);
  }

  get primaryzone2() {
    const zonedist = this.model.zonedist2;
    return getPrimaryZone(zonedist);
  }

  get primaryzone3() {
    const zonedist = this.model.zonedist3;
    return getPrimaryZone(zonedist);
  }

  get primaryzone4() {
    const zonedist = this.model.zonedist4;
    return getPrimaryZone(zonedist);
  }

  get parentSpecialPurposeDistricts() {
    const DISTRICT_TOOLS_URL =
      'https://www1.nyc.gov/site/planning/zoning/districts-tools';
    const { spdist1, spdist2, spdist3 } = this.model;

    return carto
      .SQL(
        specialPurposeDistrictsSQL(
          'dcp_special_purpose_districts',
          spdist1,
          spdist2,
          spdist3
        )
      )
      .then((response) =>
        response.map((item) => {
          const [, [anchorName, boroName]] = specialDistrictCrosswalk.find(
            ([dist]) => dist === item.sdname
          );
          const specialDistrictLink = `${DISTRICT_TOOLS_URL}/special-purpose-districts-${boroName}.page#${anchorName}`;

          return {
            label: item.sdlbl.toUpperCase(),
            name: item.sdname,
            anchorName,
            boroName,
            specialDistrictLink,
          };
        })
      );
  }

  get biswebLink() {
    const BISWEB_HOST =
      'http://a810-bisweb.nyc.gov/bisweb/PropertyBrowseByBBLServlet';
    const { borocode, block, lot } = this.model;

    return `${BISWEB_HOST}?allborough=${borocode}&allblock=${block}&alllot=${lot}&go5=+GO+&requestid=0`;
  }

  get fullCommunityDistrictURL() {
    return `https://communityprofiles.planning.nyc.gov/${this.cdURLSegment}`;
  }

  get zoneDistLinks() {
    const primaryZones = {
      primaryzone1: this.primaryzone1,
      primaryzone2: this.primaryzone2,
      primaryzone3: this.primaryzone3,
      primaryzone4: this.primaryzone4,
    };

    Object.keys(primaryZones).forEach((key) => {
      const value = primaryZones[key];
      primaryZones[
        key
      ] = `https://www1.nyc.gov/site/planning/zoning/districts-tools/${value}.page`;
    });

    return {
      ...primaryZones,
    };
  }

  get digitalTaxMapLink() {
    return `https://propertyinformationportal.nyc.gov/parcels/${
      this.model.condono ? 'condo' : 'parcel'
    }/${this.model.bbl}`;
  }

  get zoningMapLink() {
    return `https://zoningmap.nyc3.digitaloceanspaces.com/map${this.paddedZonemap}.pdf`;
  }

  get historicalZoningMapLink() {
    return `https://zoningmap.nyc3.digitaloceanspaces.com/maps${this.paddedZonemap}.pdf`;
  }

  get ACRISLink() {
    const { borocode, block, lot } = this.model;
    return `http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${borocode}&block=${block}&lot=${lot}`;
  }

  get housingInfoLink() {
    const { borocode } = this.model;
    return `https://hpdonline.hpdnyc.org/Hpdonline/Provide_address.aspx?p1=${borocode}&p2=${this.housenum}&p3=${this.street}&SearchButton=Search`;
  }

  get councilLink() {
    return `https://council.nyc.gov/district-${this.model.council}/`;
  }
}
