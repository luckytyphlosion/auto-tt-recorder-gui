// Copyright (c) 2019 LizAinslie
// Licensed under MIT

import os from 'os';
import { execSync } from 'child_process';
import { statSync } from 'fs';

const path = require("path");

type OSFunction = () => string;

const functions: {[key: string]: OSFunction} = {
  darwin: darwin,
  freebsd: unix,
  linux: unix,
  sunos: unix,
  win32: windows
};

export default () => {
    let platform = os.platform();
    if (platform in functions) {
      return functions[platform]();
    } else {
      throw new Error(`Unsupported platform ${platform}!`);
    }
}

function darwin() {
  return path.resolve(process.env.HOME, "Documents");
}

function unix() {
  let dir;
  try {
    dir = execSync('xdg-user-dir DOCUMENTS', { stdio: [0, 3, 3] });
  } catch (_) {}
  if (dir) {
    if (Buffer.isBuffer(dir)) {
      return dir.toString();
    } else {
      return dir;
    }
  }

  let stat;
  const homeDownloads = path.resolve(process.env.HOME, "Documents");
  try {
    stat = statSync(homeDownloads);
  } catch (_) {}
  if (stat) return homeDownloads;

  return '/tmp/';
}

function windows() {
  return path.resolve(process.env.USERPROFILE, "Documents");
}