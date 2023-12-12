import { waitFor } from '@ember/test-helpers';

export default async function () {
  await waitFor('.labs-map-loaded', { timeout: 30000 });
}
