
import { EncodeSizeUnit } from "./components/form_components/EncodeSizeInput";

import { SZSSource } from "./components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "./components/form_components/Top10LocationInput";

import { Top10LocationCountry, COUNTRY_LOCATIONS, COUNTRY_LOCATION_NAMES_BY_FLAG_ID, COUNTRY_FLAG_IDS } from "./components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional, REGIONAL_LOCATIONS, TOP_10_LOCATION_REGIONAL_TO_FULL_NAME } from "./components/form_components/Top10LocationRegionalInput";

import { INPUT_DISPLAYS } from "./components/form_components/InputDisplayInput";
import { SPEEDOMETER_STYLES } from "./components/form_components/SpeedometerInput";
import { SPEEDOMETER_METRICS } from "./components/form_components/SpeedometerMetricInput";
import { SPEEDOMETER_DECIMAL_PLACES, SPEEDOMETER_DECIMAL_PLACES_NUMERIC } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { ENCODE_TYPES } from "./components/layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat, OUTPUT_VIDEO_FILE_FORMATS } from "./components/form_components/OutputVideoFileFormatInput";
import { VIDEO_CODECS } from "./components/form_components/VideoCodecInput";

import { DOLPHIN_RESOLUTIONS } from "./components/form_components/DolphinResolutionInput";
import { AUDIO_CODECS } from "./components/form_components/AudioCodecAndBitrateInput";
import { getDefaultAudioBitrate } from "./components/form_components/AudioBitrateInput";

import { H26X_PRESETS } from "./components/form_components/H26xPresetInput";
import { OutputWidthPreset, OUTPUT_WIDTH_PRESETS } from "./components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category, NO_TOP_10_CATEGORIES, TIMELINES } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { ASPECT_RATIO_16_BY_9_VALUES } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "./components/form_components/Top10TitleInput";

import { AudioBitrateUnit, AUDIO_BITRATE_UNITS } from "./components/form_components/AudioBitrateInput";

import { SET_200CC_VALUES } from "./components/form_components/Set200ccInput";

import { AutoTTRecConfig, StringOrError, BooleanFILLME } from "../shared/shared-types";

import { ReadonlyArraySet } from "../shared/array-set";

import { isInSet } from "../shared/util-shared";

import { AutoTTRecConfigFormStringArgs, AutoTTRecConfigFormFieldsPartial, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormNumberArgName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormSharedStringArgName, AutoTTRecConfigFormSharedChoiceArgName, AutoTTRecConfigFormSharedNumberArgName, AutoTTRecConfigFormSharedBooleanArgName, AutoTTRecConfigFormChoiceArgs, BothGhostSource, AutoTTRecConfigFormPathnameArgName, AutoTTRecConfigFormSharedPathnameArgName } from "./auto-tt-rec-form-field-types";

import { AutoTTRecExportArgName, AutoTTRecExportArgs } from "./auto-tt-rec-args-types";

import { AutoTTRecConfigErrorsAndWarnings } from "./auto-tt-rec-errors-and-warnings";

function validateNoUnsavedFiles(formData: AutoTTRecConfigFormFields, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings) {
  let hasUnsavedFiles: boolean = false;

  if (formData["extra-gecko-codes-unsaved"]) {
    errorsAndWarnings.addError("extra-gecko-codes-unsaved", "Please save your extra gecko codes file first.");
    hasUnsavedFiles = true;
  } if (formData["top-10-gecko-code-unsaved"]) {
    errorsAndWarnings.addError("top-10-gecko-code-unsaved", "Please save your top 10 gecko code file first.");
    hasUnsavedFiles = true;
  }

  return hasUnsavedFiles;
}

export class AutoTTRecConfigExporter {
  private formData: AutoTTRecConfigFormFields;
  private hasExported: boolean;
  private autoTTRecExportArgs: AutoTTRecExportArgs;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;

  constructor(formData: AutoTTRecConfigFormFields, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings) {
    this.formData = formData;
    this.hasExported = false;
    this.autoTTRecExportArgs = {};
    this.errorsAndWarnings = errorsAndWarnings;
  }

  private getStringArg_reduceFILLME<K extends AutoTTRecConfigFormStringArgName>(key: K): string {
    let value = this.formData[key];
    if (typeof value === "number") {
      this.errorsAndWarnings.addWarning(key, `formData[${key}] was somehow number! (this is an error within the program itself and not your fault, please contact the developer!)`);
      value = value.toString();
      this.formData[key] = value;
    } else if (value === "<FILLME>") {
      this.formData[key] = "";
      value = "";
    }

    return value;
  }

  private getStringArg_reduceFILLMEToNull<K extends AutoTTRecConfigFormStringArgName>(key: K): string | null {
    let value = this.getStringArg_reduceFILLME(key);
    if (value === "") {
      return null;
    } else {
      return value;
    }
  }

  private getNumberArg_reduceNaNToFILLME<K extends AutoTTRecConfigFormNumberArgName>(key: K): number | "<FILLME>" {
    let value: number | "<FILLME>" = this.formData[key];
    if (Number.isNaN(value)) {
      value = "<FILLME>";
    }
    return value;
  }

  private exportSharedStringArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormStringArgName>(key: K) {
    let value = this.formData[key];
    if (value === "") {
      value = "<FILLME>";
    }

    this.autoTTRecExportArgs[key] = value;
  }

  private exportSharedNumberArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormNumberArgName>(key: K) {
    this.autoTTRecExportArgs[key] = this.getNumberArg_reduceNaNToFILLME(key);
  }

  private exportSharedBooleanArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormBooleanArgName>(key: K) {
    this.autoTTRecExportArgs[key] = this.formData[key];
  }

  private exportSharedChoiceArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormChoiceArgName>(key: K) {
    this.autoTTRecExportArgs[key] = this.formData[key];
  }

  private exportArg<K extends AutoTTRecExportArgName, V extends AutoTTRecExportArgs[K]>(key: K, value: V) {
    this.autoTTRecExportArgs[key] = value;
  }

  private getFormDataValue<K extends AutoTTRecConfigFormFieldName>(key: K) {
    return this.formData[key];
  }

  private exportStraightCopyArgs() {
    this.exportSharedChoiceArg("aspect-ratio-16-by-9");
    this.exportSharedChoiceArg("audio-codec");
    this.exportSharedBooleanArg("chadsoft-read-cache");
    this.exportSharedBooleanArg("chadsoft-write-cache");
    this.exportSharedStringArg("chadsoft-cache-expiry");
    this.exportSharedNumberArg("crf-value");
    this.exportSharedChoiceArg("dolphin-resolution");
    this.exportSharedBooleanArg("encode-only");
    this.exportSharedNumberArg("encode-size");
    this.exportSharedChoiceArg("encode-type");
    this.exportSharedNumberArg("ending-delay");
    this.exportSharedStringArg("ending-message");
    this.exportSharedBooleanArg("fade-in-at-start");
    this.exportSharedChoiceArg("h26x-preset");
    this.exportSharedBooleanArg("hq-textures");
    this.exportSharedChoiceArg("input-display");
    this.exportSharedBooleanArg("input-display-dont-create");
    this.exportSharedStringArg("iso-filename");
    this.exportSharedBooleanArg("keep-window");
    this.exportSharedStringArg("mk-channel-ghost-description");
    this.exportSharedBooleanArg("no-background-blur");
    this.exportSharedBooleanArg("no-bloom");
    this.exportSharedBooleanArg("no-music");
    this.exportSharedStringArg("pixel-format");
    this.exportSharedChoiceArg("speedometer-metric");
    this.exportSharedStringArg("top-10-chadsoft");
    this.exportSharedStringArg("top-10-gecko-code-filename");
    this.exportSharedBooleanArg("use-ffv1");
    this.exportSharedChoiceArg("video-codec");
    this.exportSharedBooleanArg("youtube-settings");
  }

  private exportGhostPageAndFilename(isMainGhost: boolean) {
    let [ghostPageArgName, ghostFilenameArgName, ghostSourceArgName]: ["chadsoft-ghost-page", "main-ghost-filename", "main-ghost-source"] | ["chadsoft-comparison-ghost-page", "comparison-ghost-filename", "comparison-ghost-source"] = isMainGhost ? ["chadsoft-ghost-page", "main-ghost-filename", "main-ghost-source"] : ["chadsoft-comparison-ghost-page", "comparison-ghost-filename", "comparison-ghost-source"];

    let ghostFilenameValue_nullIfFILLME = this.getStringArg_reduceFILLMEToNull(ghostFilenameArgName);
    let ghostSourceValue = this.getFormDataValue(ghostSourceArgName);

    if (ghostSourceValue === "chadsoft") {
      this.exportSharedStringArg(ghostPageArgName);
      this.exportArg(ghostFilenameArgName, ghostFilenameValue_nullIfFILLME);
    } else if (ghostSourceValue === "rkg") {
      this.exportArg(ghostPageArgName, null);
      this.exportSharedStringArg(ghostFilenameArgName);
    } else if (ghostSourceValue === "none") {
      this.exportArg(ghostPageArgName, null);
      this.exportArg(ghostFilenameArgName, null);
    } else if (ghostSourceValue === "<FILLME>") {
      this.exportArg(ghostPageArgName, "<FILLME>");
      this.exportArg(ghostFilenameArgName, "<FILLME>");
    }
  }

  private exportAudioBitrate() {
    let audioBitrateUnit = this.getFormDataValue("audio-bitrate-unit");
    let audioBitrateDisplayed = this.getFormDataValue("audio-bitrate-displayed");
    let exportedAudioBitrate: string;

    if (Number.isNaN(audioBitrateDisplayed)) {
      exportedAudioBitrate = "<FILLME>";
    } else {
      if (audioBitrateUnit === "kbps") {
        exportedAudioBitrate = `${audioBitrateDisplayed}k`;
      } else if (audioBitrateUnit === "bps") {
        exportedAudioBitrate = audioBitrateDisplayed.toString();
      } else if (audioBitrateUnit === "<FILLME>") {
        exportedAudioBitrate = "<FILLME>";
      } else {
        this.errorsAndWarnings.addExporterUnknownChoiceWarning("audio-bitrate-unit", AUDIO_BITRATE_UNITS, audioBitrateUnit);
        exportedAudioBitrate = "<FILLME>";
      }
    }

    this.exportArg("audio-bitrate", exportedAudioBitrate);
  }

  private exportFormComplexity() {
    this.exportArg("form-complexity", this.getFormDataValue("form-complexity"));
  }

  private exportEnabledPathname<K extends AutoTTRecConfigFormPathnameArgName>(
    {pathnameArgName, enableArgName}: ({
      pathnameArgName: "extra-gecko-codes-filename",
      enableArgName: "extra-gecko-codes-enable"
    } | {
      pathnameArgName: "extra-hq-textures-folder",
      enableArgName: "extra-hq-textures-folder-enable"
    }) & {
      pathnameArgName: K,
      enableArgName: (("extra-gecko-codes-enable" | "extra-hq-textures-folder-enable") & AutoTTRecConfigFormBooleanArgName)
    }
  ) {
    let enableArgValue = this.getFormDataValue(enableArgName);
    if (enableArgValue === true) {
      this.exportSharedStringArg(pathnameArgName);
    } else if (enableArgValue === false) {
      this.exportArg(pathnameArgName, null);
    } else {
      this.exportArg(pathnameArgName, "<FILLME>");
    }
  }

  private exportVolumeInputs() {
    this.exportArg("game-volume", this.getNumberArg_reduceNaNToFILLME("game-volume-numberinput"));
    this.exportArg("music-volume", this.getNumberArg_reduceNaNToFILLME("music-volume-numberinput"));
  }

  private exportMusicFilename() {
    let backgroundMusicSource = this.getFormDataValue("background-music-source");
    if (backgroundMusicSource === "game-bgm") {
      this.exportArg("music-filename", "bgm");
    } else if (backgroundMusicSource === "none") {
      this.exportArg("music-filename", "none");
    } else {
      this.exportSharedStringArg("music-filename");
    }
  }

  private exportMusicPresentation() {
    let musicPresentation = this.getFormDataValue("music-presentation");
    let noMusicMKChannel: BooleanFILLME;
    let startMusicAtBeginning: BooleanFILLME;
    
    if (musicPresentation === "no-music-mkchannel") {
      noMusicMKChannel = true;
      startMusicAtBeginning = false;
    } else if (musicPresentation === "start-music-at-beginning") {
      noMusicMKChannel = false;
      startMusicAtBeginning = true;
    } else if (musicPresentation === "normal") {
      noMusicMKChannel = false;
      startMusicAtBeginning = false;
    } else {
      noMusicMKChannel = "<FILLME>";
      startMusicAtBeginning = "<FILLME>";
    }

    this.exportArg("no-music-mkchannel", noMusicMKChannel);
    this.exportArg("start-music-at-beginning", startMusicAtBeginning);
  } 

  private exportSet200cc() {
    let set200cc = this.getFormDataValue("set-200cc");
    let on200cc: BooleanFILLME;

    if (set200cc === "on-200cc") {
      on200cc = true;
    } else if (set200cc === "no-200cc") {
      on200cc = false;
    } else {
      on200cc = "<FILLME>";
    }

    this.exportArg("on-200cc", on200cc);
  }

  private exportOutputVideoFilename() {
    let outputVideoFilename = this.getStringArg_reduceFILLME("output-video-filename");
    if (outputVideoFilename !== "<FILLME>") {
      this.exportArg("output-video-filename", outputVideoFilename);
    } else {
      this.exportArg("output-video-filename", this.getFormDataValue("output-video-file-format"));
    }
  }

  private exportOutputWidth() {
    let outputWidthPreset = this.getFormDataValue("output-width-preset");
    let outputWidth: number | null | "<FILLME>";

    if (outputWidthPreset === "none") {
      outputWidth = null;
    } else if (outputWidthPreset === "custom" || outputWidthPreset === "<FILLME>") {
      outputWidth = this.getNumberArg_reduceNaNToFILLME("output-width-custom");
    } else {
      let outputWidthPresetAsNumber: number = Number(outputWidthPreset);
      if (Number.isNaN(outputWidthPresetAsNumber)) {
        outputWidth = "<FILLME>";
      } else {
        outputWidth = outputWidthPresetAsNumber
      }
    }

    this.exportArg("output-width", outputWidth);
  }

  private exportSpeedometerStyle() {
    this.exportArg("speedometer", this.getFormDataValue("speedometer-style"));
  }

  private exportSpeedometerDecimalPlacesStr() {
    let speedometerDecimalPlacesStr = this.getFormDataValue("speedometer-decimal-places-str");

    if (speedometerDecimalPlacesStr === "<FILLME>") {
      this.exportArg("speedometer-decimal-places", "<FILLME>");
    } else {
      let speedometerDecimalPlaces = Number(speedometerDecimalPlacesStr);
      if (isInSet(SPEEDOMETER_DECIMAL_PLACES_NUMERIC.set, speedometerDecimalPlaces)) {
        this.exportArg("speedometer-decimal-places", speedometerDecimalPlaces);
      } else {
        this.errorsAndWarnings.addWarning("speedometer-decimal-places-str", `formData["speedometer-decimal-places-str"] was somehow not "0", "1", "2", or <FILLME>! this is an error within the program itself and not your fault, please contact the developer!`);
        this.exportArg("speedometer-decimal-places", 1);
      }
    }
  }

  public async export(): Promise<AutoTTRecExportArgs> {
    if (!this.hasExported) {
      this.exportStraightCopyArgs();
      this.hasExported = true;
    }

    return this.autoTTRecExportArgs;
  }
}
