import maplibregl from 'maplibre-gl';
import pmtiles from 'pmtiles';

export function initialize() {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
  const p = new pmtiles.PMTiles('https://zola-data.s3.us-west-2.amazonaws.com/nyzd.pmtiles');
  protocol.add(p);
}

export default {
  initialize,
};
