
import { EncodeSizeUnit } from "./components/form_components/EncodeSizeInput";

import { MainGhostSource } from "./components/form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "./components/form_components/ComparisonGhostSourceInput";
import { SZSSource } from "./components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "./components/form_components/Top10LocationInput";

import { Top10LocationCountry, COUNTRY_LOCATIONS, COUNTRY_LOCATION_NAMES_BY_FLAG_ID, COUNTRY_FLAG_IDS } from "./components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional, REGIONAL_LOCATIONS, TOP_10_LOCATION_REGIONAL_TO_FULL_NAME } from "./components/form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "./components/form_components/BackgroundMusicSourceInput";

import { InputDisplay, INPUT_DISPLAYS } from "./components/form_components/InputDisplayInput";
import { SpeedometerStyle, SPEEDOMETER_STYLES, SPEEDOMETER_STYLES2 } from "./components/form_components/SpeedometerInput";
import { SpeedometerMetric, SPEEDOMETER_METRICS } from "./components/form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces, SpeedometerDecimalPlacesNumeric, SPEEDOMETER_DECIMAL_PLACES_NUMERIC, SPEEDOMETER_DECIMAL_PLACES } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { EncodeType, ENCODE_TYPES } from "./components/layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat, OUTPUT_VIDEO_FILE_FORMATS } from "./components/form_components/OutputVideoFileFormatInput";
import { VideoCodec, VIDEO_CODECS } from "./components/form_components/VideoCodecInput";

import { DolphinResolution, DOLPHIN_RESOLUTIONS } from "./components/form_components/DolphinResolutionInput";
import { AudioCodec, AUDIO_CODECS } from "./components/form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit, getDefaultAudioBitrate } from "./components/form_components/AudioBitrateInput";

import { H26xPreset, H26X_PRESETS } from "./components/form_components/H26xPresetInput";
import { OutputWidthPreset, OUTPUT_WIDTH_PRESETS, recommendedOutputWidths } from "./components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category, NO_TOP_10_CATEGORIES, Timeline, TIMELINES } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9, ASPECT_RATIO_16_BY_9_VALUES } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "./components/form_components/Top10TitleInput";

import { Set200cc, SET_200CC_VALUES } from "./components/form_components/Set200ccInput";

import { AutoTTRecConfig, StringOrError, BooleanFILLME, IfEquals } from "../shared/shared-types";

import { ValidValues, ReadonlyArraySet, makeReadonlyArraySet } from "../shared/array-set";

import { shallowCopy, isInSet, deleteFromSet } from "../shared/util-shared";

import { AutoTTRecConfigFormFieldsPartial, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields, MINIMAL_FORM_VALUES, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormNumberArgName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormSharedStringArgName, AutoTTRecConfigFormSharedChoiceArgName, AutoTTRecConfigFormSharedNumberArgName, AutoTTRecConfigFormSharedBooleanArgName, AutoTTRecConfigFormChoiceArgs, BothGhostSource, AutoTTRecConfigFormFieldsNoFILLME } from "./auto-tt-rec-form-field-types";

import { AutoTTRecArgNameExtended, AUTO_TT_REC_ARG_NAMES_EXTENDED, GhostAutoArgName, AutoTTRecUnsupportedArgName, UNSUPPORTED_ARG_NAMES, AutoTTRecArgName, AutoTTRecRealArgs, AutoTTRecRealArgName } from "./auto-tt-rec-args-types";

function isFILLMEOrEmptyOrNull(x: any): x is "<FILLME>" | "" | null {
  return x === null || x === "" || x === "<FILLME>";
}

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

// A type describing the possible "extended timeline" values
// As in all the possible forms displayed with the possible combinations
// of the input in the TimelineCategoryLayout and the input in the NoTop10CategoryLayout
// This type primarily helps avoiding needing to check if the "timeline-category" is "notop10"
// before checking the "no-top-10-category" for desired values
type ExtendedTimeline = Exclude<Timeline, "top10"> | Exclude<TimelineCategory, "notop10">

class AutoTTRecFormData {
  private _formData: AutoTTRecConfigFormFieldsNoFILLME;
  private _extendedTimeline: ExtendedTimeline;
  private _formComplexity: FormComplexity;
  private _isOnMKChannel: boolean;

  constructor(formData: AutoTTRecConfigFormFieldsNoFILLME) {
    this._formData = formData;
    this._extendedTimeline = this.determineExtendedTimeline();
    this._formComplexity = this.formData["form-complexity"];
    const isNoTop10Timeline = formData["timeline-category"] === "notop10";
    this._isOnMKChannel = !isNoTop10Timeline || formData["no-top-10-category"] === "mkchannel";
    this.fillFormComplexityDefaults();
  }

  private determineExtendedTimeline(): ExtendedTimeline {
    if (this.formData["timeline-category"] === "notop10") {
      return this.formData["no-top-10-category"];
    } else {
      return this.formData["timeline-category"];
    }
  }

  private fillFormComplexityDefaults() {
    if (this.isOnMKChannel && this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["mk-channel-ghost-description"] = "Ghost Data";
      if (this.formData["timeline-category"] === "top10chadsoft") {
        this.formData["top-10-location-region"] = "worldwide";
      } else if (this.formData["timeline-category"] === "top10gecko") {
        this.formData["top-10-gecko-code-location-region"] = "worldwide";
      }
    }

    if (this.formData["timeline-category"] === "top10chadsoft" && this.formComplexity === FormComplexity.SIMPLE) {
      this.formData["top-10-highlight-enable"] = true;
      this.formData["top-10-highlight"] = 1;
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
      let recommendedOutputWidth = recommendedOutputWidths[this.formData["dolphin-resolution"]];
      let recommendedOutputWidthNoFILLME: Exclude<OutputWidthPreset, "<FILLME>">;
      if (recommendedOutputWidth === "<FILLME>") {
        recommendedOutputWidthNoFILLME = "none";
      } else {
        recommendedOutputWidthNoFILLME = recommendedOutputWidth;
      }
      this.formData["output-width-preset"] = recommendedOutputWidthNoFILLME;

      console.log("this.formData['output-width-preset']:", this.formData["output-width-preset"]);
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

  public get formData() {
    return this._formData;
  }

  public get extendedTimeline() {
    return this._extendedTimeline;
  }

  public get formComplexity() {
    return this._formComplexity;
  }

  public get isOnMKChannel() {
    return this._isOnMKChannel;
  }
}

function addMainGhostSourceToAutoTTRecArgs(formData: AutoTTRecConfigFormFields, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["main-ghost-source"] === "chadsoft") {
    argsBuilder.add("chadsoft-ghost-page");
  } else if (formData["main-ghost-source"] === "rkg") {
    argsBuilder.add("main-ghost-filename");
    if (formData["set-200cc"] === "on-200cc") {
      argsBuilder.addManual("on-200cc", true);
    }
  }
}

function addMusicPresentationToAutoTTRecArgs(formData: AutoTTRecConfigFormFields, argsBuilder: AutoTTRecArgsBuilder) {
  if (formData["music-presentation"] === "start-music-at-beginning") {
    argsBuilder.addManual("start-music-at-beginning", true);
  } else if (formData["music-presentation"] === "no-music-mkchannel") {
    argsBuilder.addManual("no-music-mkchannel", true);
  }
}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldsNoFILLME) {
  if (formData["form-complexity"] !== FormComplexity.ALL) {
    let formDataManager = new AutoTTRecFormData(formData);
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
    } else {
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
  argsBuilder.add("output-video-filename");

  return argsBuilder.autoTTRecArgs;
}
