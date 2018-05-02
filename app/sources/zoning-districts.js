export default {
  id: 'zoning-districts',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-districts',
      sql: `SELECT * FROM (
              SELECT *, CASE 
                WHEN SUBSTRING(zonedist, 3, 1) = '-' THEN LEFT(zonedist, 2)
                WHEN SUBSTRING(zonedist, 3, 1) ~ E'[A-Z]' THEN LEFT(zonedist, 2)
                WHEN SUBSTRING(zonedist, 3, 1) ~ E'[0-9]' THEN LEFT(zonedist, 3)
                ELSE zonedist
              END as primaryzone FROM zoning_districts_v201804
            ) a`,
    },
  ],
};
