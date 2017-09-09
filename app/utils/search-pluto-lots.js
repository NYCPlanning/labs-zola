import carto from '../utils/carto';

export default function searchPlutoLots(text = '') {
  const SQL = `
    SELECT (address || ', ' || 
      CASE 
        WHEN borough = 'MN' THEN 'Manhattan' 
        WHEN borough = 'BX' THEN 'Bronx' 
        WHEN borough = 'BK' THEN 'Brooklyn' 
        WHEN borough = 'QN' THEN 'Queens' 
        WHEN borough = 'SI' THEN 'Staten Island'
      END) as address, bbl FROM support_mappluto 
     WHERE address LIKE '%25${text.toUpperCase()}%25' LIMIT 10`;

  return carto.SQL(SQL);
}
