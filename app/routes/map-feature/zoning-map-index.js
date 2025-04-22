import Route from '@ember/routing/route';

export default class ZoningMapIndexRoute extends Route {
  model(params) {
    const { id } = params;
    if (id === '30d-Subplan') {
      return {
        id,
        title: 'SUB PLAN OF 30D',
        zoningMapURL:
          'https://nyc3.digitaloceanspaces.com/zoningmap/map30d_subplan.pdf',
        historicalMapURL:
          'https://nyc3.digitaloceanspaces.com/zoningmap/maps30d.pdf',
      };
    }
    if (id.length === 2) {
      return {
        id,
        title: id,
        zoningMapURL: `https://nyc3.digitaloceanspaces.com/zoningmap/map0${id}.pdf`,
        historicalMapURL: `https://nyc3.digitaloceanspaces.com/zoningmap/maps0${id}.pdf`,
      };
    }
    return {
      id,
      title: id,
      zoningMapURL: `https://nyc3.digitaloceanspaces.com/zoningmap/map${id}.pdf`,
      historicalMapURL: `https://nyc3.digitaloceanspaces.com/zoningmap/maps${id}.pdf`,
    };
  }
}
