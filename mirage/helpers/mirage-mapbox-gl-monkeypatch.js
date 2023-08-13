export default () => {
  const origSend = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function send() {
    origSend.apply(this, arguments); // eslint-disable-line

    const fakeXhr = this; // eslint-disable-line consistent-this
    const realXhr = this._passthroughRequest;
    if (realXhr) {
      realXhr.onload = function (event) {
        if (fakeXhr.responseType !== 'arraybuffer') {
          fakeXhr.response = realXhr.response;
        }

        // dispatch event instead of calling the original to prevent a double call bug
        fakeXhr.dispatchEvent(event);
      };
    }
  };
};
