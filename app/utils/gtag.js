export default function gtag(...args) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
  return args;
}
