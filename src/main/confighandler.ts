const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");
const os = require("os");

import { Mutex } from "async-mutex";
import { App } from "electron/main";

import documentsFolder from "./documents-folder";

interface ConfigOptions {
  dataFolder: string
}

interface KeyValue {
  [key: string]: string;
}

export class Config {
  app: App;
  fileIOMutex: Mutex;
  userDataPath: string;
  configFilepath: string;
  options: KeyValue;

  constructor(app: App, name: string) {
    this.app = app;
    this.fileIOMutex = new Mutex();
    let appDataPath = this.app.getPath("appData");
    this.userDataPath = path.resolve(appDataPath, name);
    this.configFilepath = path.resolve(this.userDataPath, "config", "config.json");
    this.options = {};
    this.readConfig().then();
  }

  private async makeConfigDirpath() {
    let configDirpath = path.dirname(this.configFilepath);
    await fsPromises.mkdir(configDirpath, {recursive: true});
  }

  private createDefaultOptions() {
    
    return {
      autoTTRecorderVersion: "v1.3.4",
      guiVersion: "v0.2.2"
    };
  }

  private async readConfig() {
    await this.makeConfigDirpath();
    console.log(documentsFolder());
    if (!fs.existsSync(this.configFilepath)) {
      this.options = this.createDefaultOptions();
      this.writeConfig().then();
    }
  }

  async writeConfig() {
    await this.makeConfigDirpath();
    await this.fileIOMutex.runExclusive(async () => {
      await fsPromises.writeFile(this.configFilepath, JSON.stringify(this.options, null, 4) + "\n");
    })
  }
}
