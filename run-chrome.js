// from https://spin.atomicobject.com/2018/03/22/headless-chrome-vsts-hosted-agents/
const puppeteer = require('puppeteer');
const { execFileSync } = require('child_process');

const exePath = puppeteer.executablePath();
const args = process.argv.slice(2);
execFileSync(exePath, args);
