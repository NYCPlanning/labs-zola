/* eslint-env node */
'use strict';

module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'LocalChrome',
  ],
  launch_in_dev: [
    'Chrome',
  ],
  browser_args: {
    Chrome: [
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',
    ].filter(Boolean),
  },
  launchers: {
    LocalChrome: {
      exe: 'node',
      args: [
        'run-chrome.js',
        '--disable-gpu',
        '--headless',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ],
      protocol: 'browser',
    },
  },
};
