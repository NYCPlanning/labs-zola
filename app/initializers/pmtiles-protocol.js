import maplibregl from 'maplibre-gl';
import pmtiles from 'pmtiles';

export function initialize() {
  const protocol = new pmtiles.Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
}

export default {
  initialize,
};
