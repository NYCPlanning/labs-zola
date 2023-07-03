// create sitemap_X.txt with 50,000 bbls each

const fs = require('fs');
const request = require('request');

let count = 0;

function createSitemap(rows) {
  // set up export file
  const sitemap = fs.createWriteStream(`../public/sitemap/sitemap_${count}.txt`);

  rows.forEach((row) => {
    console.log(row); // eslint-disable-line
    const bbl = row.bbl.toString();

    const boro = bbl.substring(0, 1);
    const block = parseInt(bbl.substring(1, 6), 10).toString();
    const lot = parseInt(bbl.substring(6, 10), 10).toString();

    sitemap.write(`https://zola.planning.nyc.gov/lot/${boro}/${block}/${lot}\n`);
  });

  count += 1;
  if (rows.length === 50000) getData(count); // eslint-disable-line
}

function getData() {
  const offset = 50000 * count;
  const sql = `SELECT bbl FROM dcp_mappluto LIMIT 50000 OFFSET ${offset}`;

  const apiCall = `https://planninglabs.carto.com/api/v2/sql?q=${sql}&format=json`;

  console.log(apiCall); // eslint-disable-line

  request(apiCall, (err, response, body) => {
    const data = JSON.parse(body);
    console.log(data); // eslint-disable-line
    console.log(`Got ${data.rows.length} rows of data, building sitemap`) // eslint-disable-line
    createSitemap(data.rows);
  });
}


getData(count);
