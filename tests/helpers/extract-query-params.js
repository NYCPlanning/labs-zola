export default function(URLStringFromCurrentURL) {
  const URLParsed = new URL(`http://localhost${URLStringFromCurrentURL}`);
  const SearchParams = new URLSearchParams(URLParsed.search);

  const queryParams = {};

  SearchParams.forEach((value, key) => {
    try {
      queryParams[key] = JSON.parse(value);
    } catch (e) {
      console.warn(`${key} did not parse for test - skipping.`); // eslint-disable-line
      queryParams[key] = value;
    }
  });

  return queryParams;
}
