/* eslint-env node */
'use strict';

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome',
  ],
  launch_in_dev: [
    'Firefox',
  ],
  browser_args: {
    Firefox: [
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',
    ].filter(Boolean),
  },
};
