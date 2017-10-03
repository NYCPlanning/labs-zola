export default {
  id: 'zoning-districts',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-districts',
      sql: 'SELECT * FROM (SELECT *, LEFT(zonedist, 2) as primaryzone FROM support_zoning_zd) a',
    },
  ],
};
