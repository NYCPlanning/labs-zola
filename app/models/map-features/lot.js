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

const nypdPrecinctLookup = [
  {
    "id": 1,
    "precinct": "1st Precinct",
    "phone": "212-334-0611",
    "address": "16 Ericsson Place",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/1st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-001pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-001pct.xlsx"
  },
  {
    "id": 5,
    "precinct": "5th Precinct",
    "phone": "212-334-0711",
    "address": "19 Elizabeth Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/5th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-005pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-005pct.xlsx"
  },
  {
    "id": 6,
    "precinct": "6th Precinct",
    "phone": "212-741-4811",
    "address": "233 West 10 Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/6th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-006pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-006pct.xlsx"
  },
  {
    "id": 7,
    "precinct": "7th Precinct",
    "phone": "212-477-7311",
    "address": "19 1/2 Pitt Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/7th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-007pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-007pct.xlsx"
  },
  {
    "id": 9,
    "precinct": "9th Precinct",
    "phone": "212-477-7811",
    "address": "321 East 5 Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/9th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-009pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-009pct.xlsx"
  },
  {
    "id": 10,
    "precinct": "10th Precinct",
    "phone": "212-741-8211",
    "address": "230 West 20th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/10th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-010pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-010pct.xlsx"
  },
  {
    "id": 13,
    "precinct": "13th Precinct",
    "phone": "212-477-7411",
    "address": "230 East 21st Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/13th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-013pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-013pct.xlsx"
  },
  {
    "id": 14,
    "precinct": "Midtown South Precinct",
    "phone": "212-239-9811",
    "address": "357 West 35th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/midtown-south-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-014pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-014pct.xlsx"
  },
  {
    "id": 17,
    "precinct": "17th Precinct",
    "phone": "212-826-3211",
    "address": "167 East 51st Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/17th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-017pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-017pct.xlsx"
  },
  {
    "id": 18,
    "precinct": "Midtown North Precinct",
    "phone": "212-767-8400",
    "address": "306 West 54th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/midtown-north-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-018pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-018pct.xlsx"
  },
  {
    "id": 19,
    "precinct": "19th Precinct",
    "phone": "212-452-0600",
    "address": "153 East 67th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/19th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-019pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-019pct.xlsx"
  },
  {
    "id": 20,
    "precinct": "20th Precinct",
    "phone": "212-580-6411",
    "address": "120 West 82nd Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/20th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-020pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-020pct.xlsx"
  },
  {
    "id": 22,
    "precinct": "Central Park Precinct",
    "phone": "212-570-4820",
    "address": "86th St & Transverse Road",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/central-park-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-022pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-022pct.xlsx"
  },
  {
    "id": 23,
    "precinct": "23rd Precinct",
    "phone": "212-860-6411",
    "address": "164 East 102nd Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/23rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-023pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-023pct.xlsx"
  },
  {
    "id": 24,
    "precinct": "24th Precinct",
    "phone": "212-678-1811",
    "address": "151 West 100th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/24th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-024pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-024pct.xlsx"
  },
  {
    "id": 25,
    "precinct": "25th Precinct",
    "phone": "212-860-6511",
    "address": "120 East 119th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/25th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-025pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-025pct.xlsx"
  },
  {
    "id": 26,
    "precinct": "26th Precinct",
    "phone": "212-678-1311",
    "address": "520 West 126th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/26th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-026pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-026pct.xlsx"
  },
  {
    "id": 28,
    "precinct": "28th Precinct",
    "phone": "212-678-1611",
    "address": "2271-89 8th Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/28th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-028pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-028pct.xlsx"
  },
  {
    "id": 30,
    "precinct": "30th Precinct",
    "phone": "212-690-8811",
    "address": "451 West 151st Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/30th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-030pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-030pct.xlsx"
  },
  {
    "id": 32,
    "precinct": "32nd Precinct",
    "phone": "212-690-6311",
    "address": "250 West 135th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/32nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-032pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-032pct.xlsx"
  },
  {
    "id": 33,
    "precinct": "33rd Precinct",
    "phone": "212-927-3200",
    "address": "2207 Amsterdam Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/33rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-033pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-033pct.xlsx"
  },
  {
    "id": 34,
    "precinct": "34th Precinct",
    "phone": "212-927-9711",
    "address": "4295 Broadway",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/34th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-034pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-034pct.xlsx"
  },
  {
    "id": 40,
    "precinct": "40th Precinct",
    "phone": "718-402-2270",
    "address": "257 Alexander Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/40th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-040pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-040pct.xlsx"
  },
  {
    "id": 41,
    "precinct": "41st Precinct",
    "phone": "718-542-4771",
    "address": "1035 Longwood Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/41st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-041pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-041pct.xlsx"
  },
  {
    "id": 42,
    "precinct": "42nd Precinct",
    "phone": "718-402-3887",
    "address": "830 Washington Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/42nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-042pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-042pct.xlsx"
  },
  {
    "id": 43,
    "precinct": "43rd Precinct",
    "phone": "718-542-0888",
    "address": "900 Fteley Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/43rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-043pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-043pct.xlsx"
  },
  {
    "id": 44,
    "precinct": "44th Precinct",
    "phone": "718-590-5511",
    "address": "2 East 169th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/44th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-044pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-044pct.xlsx"
  },
  {
    "id": 45,
    "precinct": "45th Precinct",
    "phone": "718-822-5411",
    "address": "2877 Barkley Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/45th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-045pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-045pct.xlsx"
  },
  {
    "id": 46,
    "precinct": "46th Precinct",
    "phone": "718-220-5211",
    "address": "2120 Ryer Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/46th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-046pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-046pct.xlsx"
  },
  {
    "id": 47,
    "precinct": "47th Precinct",
    "phone": "718-920-1211",
    "address": "4111 Laconia Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/47th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-047pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-047pct.xlsx"
  },
  {
    "id": 48,
    "precinct": "48th Precinct",
    "phone": "718-299-3900",
    "address": "450 Cross Bronx Expressway",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/48th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-048pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-048pct.xlsx"
  },
  {
    "id": 49,
    "precinct": "49th Precinct",
    "phone": "718-918-2000",
    "address": "2121 Eastchester Road",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/49th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-049pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-049pct.xlsx"
  },
  {
    "id": 50,
    "precinct": "50th Precinct",
    "phone": "718-543-5700",
    "address": "3450 Kingsbridge Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/50th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-050pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-050pct.xlsx"
  },
  {
    "id": 52,
    "precinct": "52nd Precinct",
    "phone": "718-220-5811",
    "address": "3016 Webster Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/52nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-052pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-052pct.xlsx"
  },
  {
    "id": 60,
    "precinct": "60th Precinct",
    "phone": "718-946-3311",
    "address": "2951 West 8th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/60th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-060pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-060pct.xlsx"
  },
  {
    "id": 61,
    "precinct": "61st Precinct",
    "phone": "718-627-6611",
    "address": "2575 Coney Island Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/61st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-061pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-061pct.xlsx"
  },
  {
    "id": 62,
    "precinct": "62nd Precinct",
    "phone": "718-236-2611",
    "address": "1925 Bath Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/62nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-062pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-062pct.xlsx"
  },
  {
    "id": 63,
    "precinct": "63rd Precinct",
    "phone": "718-258-4411",
    "address": "1844 Brooklyn Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/63rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-063pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-063pct.xlsx"
  },
  {
    "id": 66,
    "precinct": "66th Precinct",
    "phone": "718-851-5611",
    "address": "5822 16th Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/66th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-066pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-066pct.xlsx"
  },
  {
    "id": 67,
    "precinct": "67th Precinct",
    "phone": "718-287-3211",
    "address": "2820 Snyder Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/67th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-067pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-067pct.xlsx"
  },
  {
    "id": 68,
    "precinct": "68th Precinct",
    "phone": "718-439-4211",
    "address": "333 65th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/68th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-068pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-068pct.xlsx"
  },
  {
    "id": 69,
    "precinct": "69th Precinct",
    "phone": "718-257-6211",
    "address": "9720 Foster Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/69th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-069pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-069pct.xlsx"
  },
  {
    "id": 70,
    "precinct": "70th Precinct",
    "phone": "718-851-5511",
    "address": "154 Lawrence Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/70th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-070pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-070pct.xlsx"
  },
  {
    "id": 71,
    "precinct": "71st Precinct",
    "phone": "718-735-0511",
    "address": "421 Empire Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/71st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-071pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-071pct.xlsx"
  },
  {
    "id": 72,
    "precinct": "72nd Precinct",
    "phone": "718-965-6311",
    "address": "830 4th Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/72nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-072pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-072pct.xlsx"
  },
  {
    "id": 73,
    "precinct": "73rd Precinct",
    "phone": "718-495-5411",
    "address": "1470 East New York Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/73rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-073pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-073pct.xlsx"
  },
  {
    "id": 75,
    "precinct": "75th Precinct",
    "phone": "718-827-3511",
    "address": "1000 Sutter Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/75th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-075pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-075pct.xlsx"
  },
  {
    "id": 76,
    "precinct": "76th Precinct",
    "phone": "718-834-3211",
    "address": "191 Union Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/76th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-076pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-076pct.xlsx"
  },
  {
    "id": 77,
    "precinct": "77th Precinct",
    "phone": "718-735-0611",
    "address": "127 Utica Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/77th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-077pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-077pct.xlsx"
  },
  {
    "id": 78,
    "precinct": "78th Precinct",
    "phone": "718-636-6411",
    "address": "65 6th Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/78th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-078pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-078pct.xlsx"
  },
  {
    "id": 79,
    "precinct": "79th Precinct",
    "phone": "718-636-6611",
    "address": "263 Tompkins Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/79th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-079pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-079pct.xlsx"
  },
  {
    "id": 81,
    "precinct": "81st Precinct",
    "phone": "718-574-0411",
    "address": "30 Ralph Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/81st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-081pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-081pct.xlsx"
  },
  {
    "id": 83,
    "precinct": "83rd Precinct",
    "phone": "718-574-1605",
    "address": "480 Knickerbocker Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/83rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-083pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-083pct.xlsx"
  },
  {
    "id": 84,
    "precinct": "84th Precinct",
    "phone": "718-875-6811",
    "address": "301 Gold Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/84th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-084pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-084pct.xlsx"
  },
  {
    "id": 88,
    "precinct": "88th Precinct",
    "phone": "718-636-6511",
    "address": "298 Classon Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/88th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-088pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-088pct.xlsx"
  },
  {
    "id": 90,
    "precinct": "90th Precinct",
    "phone": "718-963-5311",
    "address": "211 Union Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/90th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-090pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-090pct.xlsx"
  },
  {
    "id": 94,
    "precinct": "94th Precinct",
    "phone": "718-383-3879",
    "address": "100 Meserole Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/94th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-094pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-094pct.xlsx"
  },
  {
    "id": 100,
    "precinct": "100th Precinct ",
    "phone": "718-318-4200",
    "address": "92-24 Rockaway Beach Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/100th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-100pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-100pct.xlsx"
  },
  {
    "id": 101,
    "precinct": "101st Precinct",
    "phone": "718-868-3400",
    "address": "16-12 Mott Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/101st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-101pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-101pct.xlsx"
  },
  {
    "id": 102,
    "precinct": "102nd Precinct",
    "phone": "718-805-3200",
    "address": "87-34 118th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/102nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-102pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-102pct.xlsx"
  },
  {
    "id": 103,
    "precinct": "103rd Precinct",
    "phone": "718-657-8181",
    "address": "168-02 P.O Edward Byrne Ave.",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/103rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-103pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-103pct.xlsx"
  },
  {
    "id": 104,
    "precinct": "104th Precinct",
    "phone": "718-386-3004",
    "address": "64-2 Catalpa Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/104th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-104pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-104pct.xlsx"
  },
  {
    "id": 105,
    "precinct": "105th Precinct",
    "phone": "718-776-9090",
    "address": "92-08 222nd Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/105th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-105pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-105pct.xlsx"
  },
  {
    "id": 106,
    "precinct": "106th Precinct",
    "phone": "718-845-2211",
    "address": "103-53 101st Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/106th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-106pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-106pct.xlsx"
  },
  {
    "id": 107,
    "precinct": "107th Precinct",
    "phone": "718-969-5100",
    "address": "71-01 Parsons Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/107th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-107pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-107pct.xlsx"
  },
  {
    "id": 108,
    "precinct": "108th Precinct",
    "phone": "718-784-5411",
    "address": "5-47 50th Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/108th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-108pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-108pct.xlsx"
  },
  {
    "id": 109,
    "precinct": "109th Precinct",
    "phone": "718-321-2250",
    "address": "37-05 Union Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/109th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-109pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-109pct.xlsx"
  },
  {
    "id": 110,
    "precinct": "110th Precinct",
    "phone": "718-476-9311",
    "address": "94-41 43rd Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/110th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-110pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-110pct.xlsx"
  },
  {
    "id": 111,
    "precinct": "111th Precinct",
    "phone": "718-279-5200",
    "address": "45-06 215th Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/111th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-111pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-111pct.xlsx"
  },
  {
    "id": 112,
    "precinct": "112th Precinct",
    "phone": "718-520-9311",
    "address": "68-40 Austin Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/112th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-112pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-112pct.xlsx"
  },
  {
    "id": 113,
    "precinct": "113th Precinct",
    "phone": "718-712-7733",
    "address": "167-02 Baisley Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/113th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-113pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-113pct.xlsx"
  },
  {
    "id": 114,
    "precinct": "114th Precinct",
    "phone": "718-626-9311",
    "address": "34-16 Astoria Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/114th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-114pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-114pct.xlsx"
  },
  {
    "id": 115,
    "precinct": "115th Precinct",
    "phone": "718-533-2002",
    "address": "92-15 Northern Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/115th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-115pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-115pct.xlsx"
  },
  {
    "id": 120,
    "precinct": "120th Precinct",
    "phone": "718-876-8500",
    "address": "78 Richmond Terrace",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/120th-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-120pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-120pct.xlsx"
  },
  {
    "id": 121,
    "precinct": "121st Precinct",
    "phone": "718-697-8700",
    "address": "970 Richmond Avenue",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/121st-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-121pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-121pct.xlsx"
  },
  {
    "id": 122,
    "precinct": "122nd Precinct",
    "phone": "718-667-2211",
    "address": "2320 Hylan Boulevard",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/122nd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-122pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-122pct.xlsx"
  },
  {
    "id": 123,
    "precinct": "123rd Precinct",
    "phone": "718-948-9311",
    "address": "116 Main Street",
    "url": "https://www.nyc.gov/site/nypd/bureaus/patrol/precincts/123rd-precinct.page",
    "crime_stats_pdf": "https://www.nyc.gov/assets/nypd/downloads/pdf/crime_statistics/cs-en-us-123pct.pdf",
    "crime_stats_excel": "https://www.nyc.gov/assets/nypd/downloads/excel/crime_statistics/cs-en-us-123pct.xlsx"
  }
];


// this model fragment structures the "properties"
// node of a geojson feature
export default class LotFragment extends MF.Fragment {
    @attr('string') address;

    @attr('number') bbl;

    @attr('number') bldgarea;

    @attr('string') bldgclass;

    @attr('string') borocode;

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

    @computed('borough')
    get boroname() {
      return boroughLookup[this.borough];
    }

    @computed('cd')
    get cdName() {
      const borocd = this.cd;
      const cdborocode = `${borocd}`.substring(0, 1);
      const cd = parseInt(`${borocd}`.substring(1, 3), 10).toString();
      return `${boroLookup[cdborocode]} Community District ${cd}`;
    }

    @computed('cd')
    get cdURLSegment() {
      const borocd = this.cd;
      const borocode = this.borocode; // eslint-disable-line prefer-destructuring
      const cleanBorough = boroLookup[borocode].toLowerCase().replace(/\s/g, '-');
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

      return carto.SQL(specialPurposeDistrictsSQL('dcp_special_purpose_districts', spdist1, spdist2, spdist3))
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
      return `https://s-media.nyc.gov/agencies/dcp/assets/files/pdf/zoning/zoning-maps/map${this.zonemap}.pdf`;
    }

    @computed('paddedZonemap')
    get historicalZoningMapLink() {
      return `https://s-media.nyc.gov/agencies/dcp/assets/files/pdf/zoning/zoning-maps/maps${this.paddedZonemap}.pdf`;
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

    @computed('policeprct')
    get precinctInfo() {
      return nypdPrecinctLookup.find((p) => p.id == this.policeprct);
    }
}
