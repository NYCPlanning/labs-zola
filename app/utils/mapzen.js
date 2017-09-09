import Ember from 'ember';

const { assign } = Ember;

const mapzenSearchAPI = 'https://search.mapzen.com/v1/autocomplete?focus.point.lat=40.7259&focus.point.lon=-73.9805&limit=5&api_key=mapzen-q5s65uH&text=';

export default function mapzen(searchTerms) {
  const url = `${mapzenSearchAPI}${searchTerms}, New York, NY`;
  return fetch(url)
    .then(res => res.json())
    .then(addresses => addresses.features
      .filter(feature => feature.properties.locality === 'New York')
      .map(feature =>
        assign(feature.properties, { type: 'address', geometry: feature.geometry }),
      ),
    );
}
