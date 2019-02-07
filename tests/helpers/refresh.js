import {
  visit,
  setupContext,
  teardownContext,
  getContext,
  currentURL,
} from '@ember/test-helpers';

export default async function refresh(mocking = () => undefined) {
  const url = currentURL();
  const ctx = getContext();

  await teardownContext(ctx);
  await setupContext(ctx);

  await mocking();

  await visit(url);
}
