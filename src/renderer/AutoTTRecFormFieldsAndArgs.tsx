import React from "react";

import { ISOWBFSFileInput } from "./components/form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./components/form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./components/form_components/TrackNameInput";
import { QualityInput } from "./components/form_components/QualityInput";
import { OutputVideoFilenameInput } from "./components/form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./components/AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./components/AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./components/form_components/MainGhostFilenameInput";

import { EncodeSizeUnit } from "./components/form_components/EncodeSizeInput";

import { MainGhostSource } from "./components/form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "./components/form_components/ComparisonGhostSourceInput";
import { SZSSource } from "./components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "./components/form_components/Top10LocationInput";

import { Top10LocationCountry } from "./components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional } from "./components/form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "./components/form_components/BackgroundMusicSourceInput";

import { InputDisplay } from "./components/form_components/InputDisplayInput";
import { SpeedometerStyle } from "./components/form_components/SpeedometerInput";
import { SpeedometerMetric } from "./components/form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { EncodeType } from "./components/layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat } from "./components/form_components/OutputVideoFileFormatInput";
import { VideoCodec } from "./components/form_components/VideoCodecInput";

import { DolphinResolution } from "./components/form_components/DolphinResolutionInput";
import { AudioCodec } from "./components/form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit } from "./components/form_components/AudioBitrateInput";

import { H26xPreset } from "./components/form_components/H26xPresetInput";
import { OutputWidthPreset, recommendedOutputWidths } from "./components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9 } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

export type Timeline = "noencode" | "ghostonly" | "ghostselect" | "mkchannel" | "top10";
export type ExtendedTimeline = "noencode" | "ghostonly" | "ghostselect" | "mkchannel" | "top10chadsoft" | "top10gecko";

export interface AutoTTRecConfigFormFieldTypes {
  "aspect-ratio-16-by-9": AspectRatio16By9,
  "audio-bitrate": number,
  "audio-bitrate-displayed": number,
  "audio-bitrate-unit": AudioBitrateUnit,
  "audio-codec": AudioCodec,
  "background-music-source": BackgroundMusicSource,
  "chadsoft-comparison-ghost-page": string,
  "chadsoft-ghost-page": string,
  "comparison-ghost-filename": string,
  "comparison-ghost-source": ComparisonGhostSource,
  "crf-value": number,
  "dolphin-resolution": DolphinResolution,
  "encode-only": boolean,
  "encode-size": number,
  "encode-size-displayed": number,
  "encode-size-unit": EncodeSizeUnit,
  "encode-type": EncodeType,
  "ending-delay": number,
  "extra-gecko-codes-enable": boolean,
  "extra-gecko-codes-contents": string,
  "extra-gecko-codes-filename": string,
  "extra-gecko-codes-unsaved": boolean,
  "extra-hq-textures-folder-enable": boolean,
  "extra-hq-textures-folder": string,
  "fade-in-at-start": boolean,
  "form-complexity": FormComplexity,
  "game-volume-slider": number,
  "game-volume-numberinput": number,
  "h26x-preset": H26xPreset,
  "hq-textures": boolean,
  "input-display": InputDisplay,
  "input-display-dont-create": boolean,
  "iso-filename": string,
  "keep-window": boolean,
  "main-ghost-filename": string,
  "main-ghost-source": MainGhostSource,
  "mk-channel-ghost-description": string,
  "music-filename": string,
  "music-volume-numberinput": number,
  "music-volume-slider": number,
  "no-background-blur": boolean,
  "no-bloom": boolean,
  "no-music": boolean,
  "no-top-10-category": NoTop10Category,
  "output-video-filename": string,
  "output-width-custom": number,
  "output-width-preset": OutputWidthPreset,
  "output-video-file-format": OutputVideoFileFormat,
  "pixel-format": string,
  "set-200cc": string,
  "speedometer-decimal-places-str": SpeedometerDecimalPlaces,
  "speedometer-style": SpeedometerStyle,
  "speedometer-metric": SpeedometerMetric,
  "music-presentation": MusicPresentation,
  "szs-filename": string,
  "szs-source": SZSSource,
  "timeline-category": TimelineCategory,
  "top-10-chadsoft": string,
  "top-10-gecko-code-location-region": Top10GeckoCodeLocationRegion,
  "top-10-gecko-code-contents": string,
  "top-10-gecko-code-filename": string,
  "top-10-gecko-code-unsaved": boolean,
  "top-10-highlight-enable": boolean,
  "top-10-highlight": number,
  "top-10-location-country-location": Top10LocationCountry,
  "top-10-location-region": Top10LocationRegion,
  "top-10-location-regional-location": Top10LocationRegional,
  "top-10-title": string,
  "track-name": string,
  "track-name-type": TrackNameType,
  "use-ffv1": boolean,
  "video-codec": VideoCodec,
  "youtube-settings": boolean,
}

const DEBUG_PREFILLED_DEFAULTS = true;

export const DEFAULT_FORM_VALUES: AutoTTRecConfigFormFieldTypes = {
  "aspect-ratio-16-by-9": "auto",
  "audio-bitrate": 128000,
  "audio-bitrate-displayed": 128,
  "audio-bitrate-unit": "kbps",
  "audio-codec": "libopus",
  "background-music-source": DEBUG_PREFILLED_DEFAULTS ? "game-bgm" : "music-filename",
  "chadsoft-comparison-ghost-page": "",
  "chadsoft-ghost-page": DEBUG_PREFILLED_DEFAULTS ? "https://www.chadsoft.co.uk/time-trials/rkgd/D3/25/D29456963F8A9C5D7D9A8949118A19873EA6.html" : "",
  "comparison-ghost-filename": "",
  "comparison-ghost-source": "none",
  "crf-value": 15,
  "dolphin-resolution": DEBUG_PREFILLED_DEFAULTS ? "480p" : "1440p",
  "encode-only": false,
  "encode-size": 52428800,
  "encode-size-displayed": 50,
  "encode-size-unit": "mib",
  "encode-type": "crf",
  "ending-delay": 600,
  "extra-gecko-codes-enable": false,
  "extra-gecko-codes-contents": "",
  "extra-gecko-codes-filename": "",
  "extra-gecko-codes-unsaved": false,
  "extra-hq-textures-folder-enable": false,
  "extra-hq-textures-folder": "",
  "fade-in-at-start": false,
  "form-complexity": FormComplexity.SIMPLE,
  "game-volume-slider": 100,
  "game-volume-numberinput": 100,
  "h26x-preset": DEBUG_PREFILLED_DEFAULTS ? "ultrafast" : "slow",
  "hq-textures": true,
  "input-display": "auto",
  "input-display-dont-create": false,
  "iso-filename": DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\RMCE01.iso" : "",
  "keep-window": true,
  "main-ghost-filename": "",
  "main-ghost-source": "chadsoft",
  "mk-channel-ghost-description": "Ghost Data",
  "music-presentation": "normal",
  "music-filename": "",
  "music-volume-numberinput": 100,
  "music-volume-slider": 100,
  "no-background-blur": true,
  "no-bloom": false,
  "no-music": false,
  "no-top-10-category": "mkchannel",
  "output-video-filename": DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\guitest1.mp4" : "",
  "output-video-file-format": "mp4",
  "output-width-custom": NaN,
  "output-width-preset": DEBUG_PREFILLED_DEFAULTS ? "none" : "2560",
  "pixel-format": "yuv420p",
  "set-200cc": "no-200cc",
  "speedometer-decimal-places-str": "1",
  "speedometer-style": "fancy",
  "speedometer-metric": "engine",
  "szs-filename": "",
  "szs-source": "automatic",
  "timeline-category": "notop10",
  "top-10-chadsoft": "",
  "top-10-gecko-code-location-region": "worldwide",
  "top-10-gecko-code-contents": "",
  "top-10-gecko-code-filename": "",
  "top-10-gecko-code-unsaved": false,      
  "top-10-highlight-enable": true,
  "top-10-highlight": 1,
  "top-10-location-country-location": "Abkhazia",
  "top-10-location-region": "worldwide",
  "top-10-location-regional-location": "Europe",
  "top-10-title": "",
  "track-name": DEBUG_PREFILLED_DEFAULTS ? "Mario Circuit" : "",
  "track-name-type": "auto",
  "use-ffv1": false,
  "video-codec": "libx264",
  "youtube-settings": true,
};


export interface AutoTTRecArgs {
  "iso-filename": string,
  "timeline"?: Timeline,
  "main-ghost-filename"?: string,
  "chadsoft-ghost-page"?: string,
  "on-200cc"?: boolean
  "chadsoft-comparison-ghost-page"?: string,
  "comparison-ghost-filename"?: string,
  "szs-filename"?: string,
  "mk-channel-ghost-description"?: string,
  "track-name"?: string,
  "top-10-location"?: "ww" | "worldwide" | Top10LocationCountry | Top10LocationRegional,
  "music-filename"?: string,
  "game-volume"?: number,
  "music-volume"?: number,
  "input-display"?: InputDisplay,
  "speedometer"?: SpeedometerStyle,
  "speedometer-metric"?: SpeedometerMetric,
  "speedometer-decimal-places"?: number,
  "hq-textures"?: boolean,
  "no-background-blur"?: boolean,
  "no-bloom"?: boolean,
  "no-music"?: boolean,
  "encode-type": EncodeType,
  "video-codec"?: VideoCodec,
  "crf-value"?: number,
  "h26x-preset"?: H26xPreset,
  "encode-size"?: number,
  "audio-codec"?: AudioCodec,
  "audio-bitrate"?: number,
  "pixel-format"?: string,
  "dolphin-resolution"?: DolphinResolution,
  "output-width"?: number | null,
  "youtube-settings"?: boolean,
  "use-ffv1"?: boolean,
  "encode-only"?: boolean,
  "input-display-dont-create"?: boolean,
  "keep-window"?: boolean,
  "output-video-filename": string,
  "top-10-chadsoft"?: string,
  "top-10-title"?: string,
  "top-10-highlight"?: number,
  "top-10-gecko-code-filename"?: string,
  "extra-gecko-codes-filename"?: string,
  "aspect-ratio-16-by-9"?: AspectRatio16By9,
  "extra-hq-textures-folder"?: string,
  "start-music-at-beginning"?: boolean,
  "no-music-mkchannel"?: boolean,
  "ending-delay"?: number,
  "fade-in-at-start"?: boolean,
}

const DEFAULT_AUTO_TT_REC_ARGS: AutoTTRecArgs = {
  "iso-filename": "",
  "speedometer": "fancy",
  "encode-type": "crf",
  "output-video-filename": ""
};

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFieldTypes;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
    this._autoTTRecArgs = {...DEFAULT_AUTO_TT_REC_ARGS};
    this.formData = formData;
  }

  // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends keyof AutoTTRecConfigFormFieldTypes & keyof AutoTTRecArgs>(key: K) {
    this._autoTTRecArgs[key] = this.formData[key];
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends keyof AutoTTRecArgs>(key: K, value: AutoTTRecArgs[K]) {
    this._autoTTRecArgs[key] = value;
  }

  // same value, different key name
  /*public addDifferentKey<
    T extends keyof AutoTTRecArgs,
    U extends keyof AutoTTRecConfigFormFieldTypes,
    V extends AutoTTRecArgs[T] & AutoTTRecConfigFormFieldTypes[U],    
    K1 extends keyof Record<T, V>,
    K2 extends keyof Record<U, V>
  >(autoTTRecKey: K1, formKey: K2) {
    this._autoTTRecArgs[autoTTRecKey] = this.formData[formKey];
  }*/

  public get autoTTRecArgs() {
    return this._autoTTRecArgs;
  }
}

function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}

class AutoTTRecFormData {
  private _formData: AutoTTRecConfigFormFieldTypes;
  private _extendedTimeline: ExtendedTimeline;
  private _formComplexity: FormComplexity;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
    this._formData = shallowCopy(formData);
    this._extendedTimeline = this.determineExtendedTimeline();
    this._formComplexity = this.formData["form-complexity"];
  }

  public fillFormComplexityDefaults() {
    if (this.formComplexity === FormComplexity.SIMPLE) {

    } else if (this.formComplexity === FormComplexity.ADVANCED) {

    }
  }

  private fillFormComplexityNoTop10Defaults() {
    if (this.extendedTimeline === "mkchannel" && this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["mk-channel-ghost-description"] = "Ghost Data";
      this.formData["top-10-location-region"] = "worldwide";
    }

    if (this.formData["background-music-source"] === "music-filename"
      && this.extendedTimeline !== "ghostonly" && this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["music-presentation"] = "normal";
    }

    if (this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["input-display"] = "auto";
      this.formData["extra-gecko-codes-enable"] = false;
      this.formData["speedometer-style"] = "fancy";
      this.formData["speedometer-metric"] = "engine";
      this.formData["speedometer-decimal-places-str"] = "1";
      this.formData["fade-in-at-start"] = false;
      this.formData["ending-delay"] = 600;
    }
    if (this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["encode-type"] = "crf";
      this.formData["video-codec"] = "libx264";
    } else if (this.formComplexity === FormComplexity.ADVANCED) {
      if (this.formData["encode-type"] === "crf") {
        this.formData["video-codec"] = "libx264";
      } else if (this.formData["encode-type"] === "size") {
        if (this.formData["output-video-file-format"] === "mp4") {
          this.formData["video-codec"] = "libx264";
        } else if (this.formData["output-video-file-format"] === "webm") {
          this.formData["video-codec"] = "libvpx-vp9";
        }
      }
    }

    if (this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["output-video-file-format"] = "mp4";
      this.formData["crf-value"] = 15;
    }
    this.formData["h26x-preset"] = (this.formData["encode-type"] !== "size" && this.formData["dolphin-resolution"] === "480p") ? "ultrafast" : "slow";

    this.formData["youtube-settings"] = true;
    this.formData["audio-codec"] = "libopus";
    if (this.formData["encode-type"] === "crf") {
      this.formData["audio-bitrate"] = 128000;
    } else if (this.formData["encode-type"] === "size") {
      this.formData["audio-bitrate"] = 64000;
    }

    this.formData["pixel-format"] = "yuv420p";

    if (this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["output-width-preset"] = recommendedOutputWidths[this.formData["dolphin-resolution"]];
    }

    this.formData["aspect-ratio-16-by-9"] = "auto";
    if (this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["hq-textures"] = this.formData["dolphin-resolution"] === "480p" ? false : true;
      this.formData["extra-hq-textures-folder-enable"] = false;
      this.formData["no-background-blur"] = true;
      this.formData["no-bloom"] = false;
    }

    this.formData["use-ffv1"] = false;
    this.formData["encode-only"] = false;
    this.formData["input-display-dont-create"] = false;
    this.formData["keep-window"] = true;
  }

  private fillFormComplexityAdvancedDefaults() {

  }
  private determineExtendedTimeline(): ExtendedTimeline {
    if (this.formData["timeline-category"] === "notop10") {
      return this.formData["no-top-10-category"];
    } else {
      return this.formData["timeline-category"];
    }
  }

  public get formData() {
    return this._formData;
  }

  public get extendedTimeline() {
    return this._extendedTimeline;
  }

  public get formComplexity() {
    return this._formComplexity;
  }
}

function addMainGhostSourceToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["main-ghost-source"] === "chadsoft") {
    argsBuilder.add("chadsoft-ghost-page");
  } else if (formData["main-ghost-source"] === "rkg") {
    argsBuilder.add("main-ghost-filename");
    if (formData["set-200cc"] === "on-200cc") {
      argsBuilder.addManual("on-200cc", true);
    }
  }
}

function addMusicPresentationToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["music-presentation"] === "start-music-at-beginning") {
    argsBuilder.addManual("start-music-at-beginning", true);
  } else if (formData["music-presentation"] === "no-music-mkchannel") {
    argsBuilder.addManual("no-music-mkchannel", true);
  }
}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes) {
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
      argsBuilder.add("top-10-title");
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
    } else {
      argsBuilder.add("track-name");
    }
  }

  // mkchannel gets top 10 location, while ghostselect, ghostonly, and noencode don't
  if (isOnMKChannel) {
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
      argsBuilder.addManual("speedometer-decimal-places", Number.parseInt(formData["speedometer-decimal-places-str"]));
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
  
    let outputWidth: number | null;
  
    if (formData["output-width-preset"] === "custom") {
      outputWidth = formData["output-width-custom"];
    } else if (formData["output-width-preset"] === "none") {
      outputWidth = null;
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
  argsBuilder.add("output-video-filename");

  return argsBuilder.autoTTRecArgs;
}

