
import { SPEEDOMETER_DECIMAL_PLACES_NUMERIC } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { Timeline } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";

import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

import { isInSet } from "../shared/util-shared";

import { AutoTTRecConfigFormFieldName, AutoTTRecConfigFormFieldsNoFILLME } from "./auto-tt-rec-form-field-types";

import { AutoTTRecRealArgs, AutoTTRecRealArgName } from "./auto-tt-rec-args-types";

import { AutoTTRecFormDataFormComplexityProcessor } from "./auto-tt-rec-form-complexity-processor";

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecRealArgs;
  private formData: AutoTTRecConfigFormFieldsNoFILLME;

  constructor(formData: AutoTTRecConfigFormFieldsNoFILLME) {
    this._autoTTRecArgs = {};
    this.formData = formData;
  }

  // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends AutoTTRecConfigFormFieldName & AutoTTRecRealArgName>(key: K) {
    let x = this.formData[key];
    this._autoTTRecArgs[key] = x;
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends AutoTTRecRealArgName>(key: K, value: AutoTTRecRealArgs[K]) {
    this._autoTTRecArgs[key] = value;
  }

  public get autoTTRecArgs() {
    return this._autoTTRecArgs;
  }
}

function addMainGhostSourceToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldsNoFILLME, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["main-ghost-source"] === "chadsoft") {
    argsBuilder.add("chadsoft-ghost-page");
  } else if (formData["main-ghost-source"] === "rkg") {
    argsBuilder.add("main-ghost-filename");
    if (formData["set-200cc"] === "on-200cc") {
      argsBuilder.addManual("on-200cc", true);
    }
  }
}

function addMusicPresentationToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldsNoFILLME, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["music-presentation"] === "start-music-at-beginning") {
    argsBuilder.addManual("start-music-at-beginning", true);
  } else if (formData["music-presentation"] === "no-music-mkchannel") {
    argsBuilder.addManual("no-music-mkchannel", true);
  }
}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldsNoFILLME) {
  if (formData["form-complexity"] !== FormComplexity.ALL) {
    let formDataManager = new AutoTTRecFormDataFormComplexityProcessor(formData);
    formData = formDataManager.formData  
  }
  let argsBuilder = new AutoTTRecArgsBuilder(formData);
  argsBuilder.add("iso-filename");

  const isNoTop10Timeline = formData["timeline-category"] === "notop10";
  const isOnMKChannel = !isNoTop10Timeline || formData["no-top-10-category"] === "mkchannel";
  const isNoEncode = isNoTop10Timeline && formData["no-top-10-category"] === "noencode";

  let timeline: Timeline;
  if (!isNoTop10Timeline) {
    timeline = "top10";
  } else {
    timeline = formData["no-top-10-category"];
  }

  if (formData["extra-gecko-codes-enable"]) {
    argsBuilder.add("extra-gecko-codes-filename");
  }

  argsBuilder.addManual("timeline", timeline);

  if (isNoTop10Timeline) {
    addMainGhostSourceToAutoTTRecArgs(formData, argsBuilder);
  } else {
    if (formData["timeline-category"] === "top10chadsoft") {
      argsBuilder.add("top-10-chadsoft");
      if (formData["top-10-title-type"] === "auto") {
        argsBuilder.addManual("top-10-title", "auto");
      } else if (formData["top-10-title-type"] === "manual") {
        argsBuilder.add("top-10-title");
      }

      if (formData["top-10-highlight-enable"]) {
        argsBuilder.add("top-10-highlight");
      } else {
        argsBuilder.addManual("top-10-highlight", -1);
        addMainGhostSourceToAutoTTRecArgs(formData, argsBuilder);
      }
    } else if (formData["timeline-category"] === "top10gecko") {
      addMainGhostSourceToAutoTTRecArgs(formData, argsBuilder);
      argsBuilder.add("top-10-gecko-code-filename");
    }
  }

  if (formData["comparison-ghost-source"] === "chadsoft") {
    argsBuilder.add("chadsoft-comparison-ghost-page");
  } else if (formData["comparison-ghost-source"] === "rkg") {
    argsBuilder.add("comparison-ghost-filename");
  } else if (formData["comparison-ghost-source"] === "none") {
    // pass
  }

  if (formData["szs-source"] === "fromfile") {
    argsBuilder.add("szs-filename");
  }

  // mkchannel gets ghost description, while ghostselect, ghostonly, and noencode don't
  // !(isNoTop10Timeline && !isNoTop10CategoryMkchannel)
  // !isNoTop10Timeline || isNoTop10CategoryMkchannel
  if (isOnMKChannel) {
    argsBuilder.add("mk-channel-ghost-description");
  }

  if (timeline !== "ghostonly" && timeline !== "noencode") {
    if (formData["track-name-type"] === "auto") {
      argsBuilder.addManual("track-name", "auto");
    } else if (formData["track-name-type"] === "manual") {
      argsBuilder.add("track-name");
    }
  }

  // mkchannel gets top 10 location, while ghostselect, ghostonly, and noencode don't
  if (formData["timeline-category"] === "top10gecko") {
    if (formData["top-10-gecko-code-location-region"] === "worldwide") {
      argsBuilder.addManual("top-10-location", "ww");
    } else {
      argsBuilder.addManual("top-10-location", "Europe");
    }
  } else if (isOnMKChannel) {
    if (formData["top-10-location-region"] === "worldwide") {
      argsBuilder.addManual("top-10-location", "ww");
    } else if (formData["top-10-location-region"] === "regional") {
      argsBuilder.addManual("top-10-location", formData["top-10-location-regional-location"]);
    } else if (formData["top-10-location-region"] === "country") {
      argsBuilder.addManual("top-10-location", formData["top-10-location-country-location"]);
    }
  }

  if (!isNoEncode) {
    if (formData["background-music-source"] === "music-filename") {
      argsBuilder.add("music-filename");
      argsBuilder.addManual("game-volume", formData["game-volume-numberinput"] / 100);
      argsBuilder.addManual("music-volume", formData["music-volume-numberinput"] / 100);
      if (timeline === "ghostselect") {
        addMusicPresentationToAutoTTRecArgs(formData, argsBuilder);
      }
    } else if (formData["background-music-source"] === "game-bgm") {
      argsBuilder.addManual("music-filename", "bgm");
    } else if (formData["background-music-source"] === "none") {
      argsBuilder.addManual("music-filename", "none");
    }
    if (isOnMKChannel) {
      addMusicPresentationToAutoTTRecArgs(formData, argsBuilder);
    }
    argsBuilder.add("input-display");
    argsBuilder.add("aspect-ratio-16-by-9");
  } else {
    argsBuilder.add("no-music");
  }

  argsBuilder.addManual("speedometer", formData["speedometer-style"]);
  argsBuilder.add("ending-delay");
  if (isOnMKChannel || timeline === "ghostselect") {
    argsBuilder.add("fade-in-at-start");
  }

  if (formData["speedometer-style"] !== "none") {
    argsBuilder.add("speedometer-metric");
    if (formData["speedometer-style"] === "fancy" || formData["speedometer-style"] === "regular") {
      let numDecimalPlaces = Number.parseInt(formData["speedometer-decimal-places-str"]);
      if (isInSet(SPEEDOMETER_DECIMAL_PLACES_NUMERIC.set, numDecimalPlaces)) {
        argsBuilder.addManual("speedometer-decimal-places", numDecimalPlaces);
      }
      
    }
  }

  argsBuilder.add("hq-textures");
  if (formData["hq-textures"] && formData["extra-hq-textures-folder-enable"]) {
    argsBuilder.add("extra-hq-textures-folder");
  }
  argsBuilder.add("no-background-blur");
  argsBuilder.add("no-bloom");

  if (!isNoEncode) {
    argsBuilder.add("encode-type");
    argsBuilder.add("video-codec");
  
    if (formData["encode-type"] === "crf") {
      argsBuilder.add("crf-value");
      argsBuilder.add("h26x-preset");
      argsBuilder.add("youtube-settings");
    } else if (formData["encode-type"] === "size") {
      argsBuilder.add("encode-size");
    }
  
    argsBuilder.add("audio-codec");
    argsBuilder.add("audio-bitrate");
    argsBuilder.add("pixel-format");
    argsBuilder.add("dolphin-resolution");
  
    let outputWidth: number | undefined;
  
    console.log("formData['output-width-preset'] 2:", formData["output-width-preset"]);
  
    if (formData["output-width-preset"] === "custom") {
      outputWidth = formData["output-width-custom"];
    } else if (formData["output-width-preset"] === "none") {
      outputWidth = undefined;
    } else {
      outputWidth = Number.parseInt(formData["output-width-preset"]);
    }
  
    argsBuilder.addManual("output-width", outputWidth);
  
    argsBuilder.add("use-ffv1");
    argsBuilder.add("encode-only");
    argsBuilder.add("input-display-dont-create");
  } else {
    argsBuilder.add("use-ffv1");
    argsBuilder.add("dolphin-resolution");
  }

  argsBuilder.add("keep-window");
  if (!formData["chadsoft-read-cache"]) {
    formData["chadsoft-cache-expiry"] = "24h";
  }
  argsBuilder.add("ending-message");
  argsBuilder.add("top-10-censors");
  argsBuilder.add("output-video-filename");
  

  return argsBuilder.autoTTRecArgs;
}
