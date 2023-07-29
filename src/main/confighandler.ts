import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

import { Mutex } from "async-mutex";
import { App } from "electron/main";

import { SavedDialogPathnames, DialogId } from "../shared/shared-types";

import * as versions from "../shared/versions";

//import documentsFolder from "./documents-folder";

export let globalConfig: Config;

interface ConfigOptions {
  autoTTRecorderVersion: string,
  guiVersion: string,
  dolphinVersion: string,
  savedDialogPathnames: SavedDialogPathnames,
}

export class Config {
  app: App;
  fileIOMutex: Mutex;
  _options: ConfigOptions;
  configFilepath: string;

  // paths
  userDataPath: string;
  dolphinPath: string;
  storagePath: string;
  chadsoftCachePath: string;
  tempPath: string;

  constructor(app: App, name: string) {
    this.app = app;
    this.fileIOMutex = new Mutex();
    let appDataPath = this.app.getPath("appData");
    this.userDataPath = path.resolve(appDataPath, name, "auto-tt-recorder-gui-working");
    console.log("this.userDataPath:", this.userDataPath);
    this.configFilepath = path.resolve(this.userDataPath, "config.json");
    this._options = this.readConfig();
    this.dolphinPath = path.resolve(this.userDataPath, "dolphin");
    console.log("this.workingDolphinPath:", this.dolphinPath);
    this.storagePath = path.resolve(this.userDataPath, "storage");
    this.chadsoftCachePath = path.resolve(this.userDataPath, "chadsoft_cache_folder");
    this.tempPath = path.resolve(this.userDataPath, "temp");
  }

  private async makeConfigDirpath() {
    let configDirpath = path.dirname(this.configFilepath);
    await fsPromises.mkdir(configDirpath, {recursive: true});
  }

  private createDefaultOptions() {
    return {
      autoTTRecorderVersion: versions.AUTO_TT_RECORDER_VERSION,
      guiVersion: versions.AUTO_TT_RECORDER_GUI_VERSION,
      dolphinVersion: versions.DOLPHIN_VERSION,
      savedDialogPathnames: {
        "iso-wbfs": "",
        "music": "",
        "rkgs": "",
        "extra-gecko-codes": "",
        "extra-hq-textures": "",
        "output-video": "",
        "szs": "",
        "top-10-gecko-code": "",
        "template": ""
      }
    };
  }

  private fillOptionsWithDefaults(partialOptions: Partial<ConfigOptions>) {
    const defaultOptions = this.createDefaultOptions();
    return {
      ...defaultOptions,
      ...partialOptions
    };
  }

  private readConfig() {
    let optionsAsStr: string;
    let partialOptions: Partial<ConfigOptions>;

    this.makeConfigDirpath().then();
  
    // read in config file
    // and also account for no config file at all
    try {
      optionsAsStr = fs.readFileSync(this.configFilepath).toString();
    } catch (e) {
      if ((e as any).code === "ENOENT") {
        optionsAsStr = "{}";
      } else {
        throw e;
      }
    }

    // convert to object
    try {
      if (optionsAsStr !== "{}") {
        partialOptions = JSON.parse(optionsAsStr);
      } else {
        partialOptions = {};
      }  
    } catch {
      partialOptions = {};
    }

    this._options = this.fillOptionsWithDefaults(partialOptions);
    this.writeConfig().then();
    return this._options;
  }

  async writeConfig() {
    await this.makeConfigDirpath();
    await this.fileIOMutex.runExclusive(async () => {
      await fsPromises.writeFile(this.configFilepath, JSON.stringify(this.options, null, 4) + "\n");
    })
  }

  async updateVersions() {
    this._options.autoTTRecorderVersion = versions.AUTO_TT_RECORDER_VERSION;
    this._options.guiVersion = versions.AUTO_TT_RECORDER_GUI_VERSION;
    this._options.dolphinVersion = versions.DOLPHIN_VERSION;
    await this.writeConfig();
  }

  get options() {
    return this._options;
  }

  async setNewDialogPathnameAndSave(dialogId: DialogId, newDialogPathname: string) {
    this._options.savedDialogPathnames[dialogId] = newDialogPathname;
    await this.writeConfig();
  }
}

export function loadGlobalConfig(app: App, name: string) {
  globalConfig = new Config(app, name);
}

export function getGlobalConfig() {
  return globalConfig;
}
