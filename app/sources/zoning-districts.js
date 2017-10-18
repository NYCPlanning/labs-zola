export default {
  id: 'zoning-districts',
  type: 'cartovector',
  'source-layers': [
    {
      id: 'zoning-districts',
      sql: "SELECT * FROM (SELECT *, split_part(zonedist, '-', 1) as primaryzone FROM support_zoning_zd) a",
    },
  ],
};
