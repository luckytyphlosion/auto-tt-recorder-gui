
import { EncodeSizeUnit } from "./components/form_components/EncodeSizeInput";

import { SZSSource } from "./components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "./components/form_components/Top10LocationInput";

import { Top10LocationCountry, COUNTRY_LOCATIONS, COUNTRY_LOCATION_NAMES_BY_FLAG_ID, COUNTRY_FLAG_IDS } from "./components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional, REGIONAL_LOCATIONS, TOP_10_LOCATION_REGIONAL_TO_FULL_NAME } from "./components/form_components/Top10LocationRegionalInput";

import { INPUT_DISPLAYS } from "./components/form_components/InputDisplayInput";
import { SPEEDOMETER_STYLES } from "./components/form_components/SpeedometerInput";
import { SPEEDOMETER_METRICS } from "./components/form_components/SpeedometerMetricInput";
import { SPEEDOMETER_DECIMAL_PLACES } from "./components/form_components/SpeedometerDecimalPlacesInput";

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

import { SET_200CC_VALUES } from "./components/form_components/Set200ccInput";

import { AutoTTRecConfig, StringOrError, BooleanFILLME } from "../shared/shared-types";

import { ReadonlyArraySet } from "../shared/array-set";

import { isInSet } from "../shared/util-shared";

import { AutoTTRecConfigFormFieldsPartial, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormNumberArgName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormSharedStringArgName, AutoTTRecConfigFormSharedChoiceArgName, AutoTTRecConfigFormSharedNumberArgName, AutoTTRecConfigFormSharedBooleanArgName, AutoTTRecConfigFormChoiceArgs, BothGhostSource } from "./auto-tt-rec-form-field-types";

import { AutoTTRecArgName } from "./auto-tt-rec-args-types";

import { AutoTTRecConfigErrorsAndWarnings } from "./auto-tt-rec-errors-and-warnings";

export class AutoTTRecConfigImporter {
  private formData: AutoTTRecConfigFormFieldsPartial;
  private hasImported: boolean;
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;
  private configArgWasNullOrDisallowedFILLMESet: Set<AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgName | AutoTTRecConfigFormNumberArgName | AutoTTRecConfigFormBooleanArgName | "form-complexity">;
  private autoTTRecConfigFilename: string;

  constructor(autoTTRecConfig: AutoTTRecConfig, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings, autoTTRecConfigFilename: string) {
    this.formData = {};
    this.hasImported = false;
    this.autoTTRecConfig = autoTTRecConfig;
    this.errorsAndWarnings = errorsAndWarnings;
    this.configArgWasNullOrDisallowedFILLMESet = new Set();
    this.autoTTRecConfigFilename = autoTTRecConfigFilename;
  }

  public addDefault<K extends AutoTTRecConfigFormFieldName>(key: K) {
    this.formData[key] = DEFAULT_FORM_VALUES[key];
  }

  public isArgValueNull_addDefaultIfNull<K extends AutoTTRecConfigFormFieldName>(key: K, value: string | number | boolean | null): value is null {
    if (value === null) {
      this.addDefault(key);
      this.configArgWasNullOrDisallowedFILLMESet.add(key);
      return true;
    } else {
      return false;
    }
  }

  public readArgSanityCheck<K extends AutoTTRecArgName>(key: K): string | number | boolean | null | undefined {
    let configValue = this.autoTTRecConfig[key];
    if (configValue === undefined) {
      this.errorsAndWarnings.addKeyUndefinedWarning(key, "autoTTRecConfig");
    }
    return configValue;
  }

  private validateString_errorIfNot_handleUndefined<K extends AutoTTRecArgName>(key: K): string | null {
    let value = this.readArgSanityCheck(key);
    if (value === undefined) {
      return "";
    } else if (value === null) {
      return null;
    } else if (value === "<FILLME>") {
      return "";
    } else if (typeof value === "string") {
      return value;
    } else {
      this.errorsAndWarnings.addErrorWrongType(key, "string", value);
      return "";
    }
  }

  private validateNumber_errorIfNot_handleUndefinedString<K extends AutoTTRecArgName>(key: K): number | null {
    let value = this.readArgSanityCheck(key);
    if (value === undefined) {
      return NaN;
    } else if (value === null) {
      return null;
    } else if (value === "<FILLME>") {
      return NaN;
    } else if (typeof value === "number") {
      return value;
    } else {
      let valueAsNum: number;
      if (typeof value === "string") {
        valueAsNum = Number(value);
      } else {
        valueAsNum = NaN;
      }
      if (Number.isNaN(valueAsNum)) {
        this.errorsAndWarnings.addErrorWrongType(key, "number", value);
      }
      return valueAsNum;
    }
  }

  private validateBoolean_errorIfNot_handleUndefined<K extends AutoTTRecArgName>(key: K): BooleanFILLME | null {
    let value = this.readArgSanityCheck(key);
    if (value === undefined) {
      return "<FILLME>";
    } else if (value === null) {
      return null;
    } else if (value === "<FILLME>") {
      return "<FILLME>";
    } else if (typeof value === "boolean") {
      return value;
    } else {
      this.errorsAndWarnings.addErrorWrongType(key, "boolean", value);
      return "<FILLME>";
    }
  }

  private validateSharedStringOrChoiceArg_errorIfNot_handleUndefinedNull<K extends AutoTTRecConfigFormSharedStringArgName | AutoTTRecConfigFormSharedChoiceArgName>(key: K) {
    let value = this.validateString_errorIfNot_handleUndefined(key);
    if (value === null) {
      this.configArgWasNullOrDisallowedFILLMESet.add(key);
      return DEFAULT_FORM_VALUES[key];
    } else {
      return value;
    }
  }
  private validateSharedNumArg_errorIfNot_handleUndefinedString<K extends AutoTTRecConfigFormSharedNumberArgName>(key: K) {
    let value = this.validateNumber_errorIfNot_handleUndefinedString(key);
    if (value === null) {
      this.configArgWasNullOrDisallowedFILLMESet.add(key);
      return DEFAULT_FORM_VALUES[key];
    } else {
      return value;
    }
  }

  private getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull<K extends AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgName>(key: K): AutoTTRecConfigFormFields[K] | null {
    if (this.configArgWasNullOrDisallowedFILLMESet.has(key)) {
      return null;
    } else {
      return this.getFormDataStringOrChoice_verifyNotUndefined(key);
    }
  }

  private getFormDataNumberArg_verifyNotUndefinedOrFILLME_nullIfWasNull<K extends AutoTTRecConfigFormNumberArgName>(key: K) {
    if (this.configArgWasNullOrDisallowedFILLMESet.has(key)) {
      return null;
    } else {
      return this.getFormDataNumber_verifyNotUndefinedOrFILLME(key);
    }
  }

  private getFormDataStringOrChoice_verifyNotUndefined<K extends AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgName>(key: K): AutoTTRecConfigFormFields[K] {
    let value = this.formData[key];
    if (value === undefined) {
      this.errorsAndWarnings.addKeyUndefinedWarning(key, "formData");
      this.formData[key] = "<FILLME>";
      return "<FILLME>";
    } else {
      return value;
    }
  }

  private getFormDataNumber_verifyNotUndefinedOrFILLME<K extends AutoTTRecConfigFormNumberArgName>(key: K): number {
    let value = this.formData[key];
    if (value === undefined) {
      this.errorsAndWarnings.addKeyUndefinedWarning(key, "formData");
      value = NaN;
      this.formData[key] = NaN;
    } else if (value === "<FILLME>") {
      this.errorsAndWarnings.addWarning(key, `formData["${key}"] is <FILLME>! (this is an error within the program itself and not your fault, please contact the developer!)`);
      value = NaN;
      this.formData[key] = NaN;
    }
    return value;
  }

  private importSharedStringArg<K extends AutoTTRecConfigFormSharedStringArgName>(key: K) {
    this.formData[key] = this.validateSharedStringOrChoiceArg_errorIfNot_handleUndefinedNull(key);
  }

  private importSharedNumberArg<K extends AutoTTRecConfigFormSharedNumberArgName>(key: K) {
    this.formData[key] = this.validateSharedNumArg_errorIfNot_handleUndefinedString(key);
  }

  private importSharedBooleanArg<K extends AutoTTRecConfigFormSharedBooleanArgName>(key: K) {
    let configValue = this.readArgSanityCheck(key);
    if (configValue !== undefined) {
      if (!this.isArgValueNull_addDefaultIfNull(key, configValue)) {
        if (configValue === "<FILLME>") {
          this.formData[key] = "<FILLME>";
        } else if (typeof configValue === "boolean") {
          this.formData[key] = configValue;
        } else {
          this.errorsAndWarnings.addErrorWrongType(key, "boolean", configValue);
          this.formData[key] = "<FILLME>";
        }
      }
    }
  }

  private importSharedChoiceArg<K extends AutoTTRecConfigFormSharedChoiceArgName, V extends ReadonlyArraySet<AutoTTRecConfigFormChoiceArgs[K]>>(key: K, validValues: V) {
    let configValue = this.readArgSanityCheck(key);
    if (configValue !== undefined) {
      if (!this.isArgValueNull_addDefaultIfNull(key, configValue)) {
        if (configValue === "<FILLME>") {
          this.formData[key] = "<FILLME>";
        } else if (typeof configValue === "string") {
          if (isInSet(validValues.set, configValue)) {
            this.formData[key] = configValue;
          } else {
            this.errorsAndWarnings.addInvalidChoiceError(key, validValues, configValue);
            this.formData[key] = "<FILLME>";
          }
        }
      }
    }
  }

  private setStringOrChoiceArg_handleNullOrDisallowedFILLME<K extends AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormFields[K]>(key: K, value: V | null) {
    let valueNullable: V | null;
    if (value === "<FILLME>") {
      valueNullable = null;
    } else {
      valueNullable = value;
    }
    if (!this.isArgValueNull_addDefaultIfNull(key, value)) {
      this.formData[key] = value;
    }
  }
/*
  private setPathnameArgEnable_resolvePathname_returnOriginalFilenameAndPathnameArgs(pathnameArgName: "extra-gecko-codes-filename", enableArgName: "extra-gecko-codes-enable"): [string, string];
  private setPathnameArgEnable_resolvePathname_returnOriginalFilenameAndPathnameArgs(pathnameArgName: "top-10-gecko-code-filename"): [string, string];
  private setPathnameArgEnable_resolvePathname_returnOriginalFilenameAndPathnameArgs(pathnameArgName: "top-10-gecko-code-filename"): [string, string];
*/

  private async setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename(
    {pathnameArgName, enableArgName}: ({
      pathnameArgName: "extra-gecko-codes-filename",
      enableArgName: "extra-gecko-codes-enable"
    } | {
      pathnameArgName: "top-10-gecko-code-filename",
      enableArgName: undefined
    } | {
      pathnameArgName: "extra-hq-textures-folder",
      enableArgName: "extra-hq-textures-folder-enable"
    }) & {
      pathnameArgName: ("extra-gecko-codes-filename" | "top-10-gecko-code-filename" | "extra-hq-textures-folder") & AutoTTRecConfigFormSharedStringArgName,
      enableArgName: (("extra-gecko-codes-enable" | "extra-hq-textures-folder-enable") & AutoTTRecConfigFormBooleanArgName) | undefined
    }
  ): Promise<[string, string]> {
    let enableArgValue: BooleanFILLME;
    let pathnameArgValue = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull(pathnameArgName);
    let pathnameAbsoluteArgValue: string;

    if (enableArgName !== undefined) {
      console.log("setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename enableArgName:", enableArgName, ", pathnameArgValue: ", pathnameArgValue);
      if (pathnameArgValue === "") {
        enableArgValue = "<FILLME>";
      } else if (pathnameArgValue !== null) {
        enableArgValue = true;
      } else {
        enableArgValue = false;
      }
  
      this.formData[enableArgName] = enableArgValue;
    } else {
      enableArgValue = true;
    }

    console.log("enableArgValue: ", enableArgValue, ", pathnameArgName:", pathnameArgName);
  
    if (enableArgValue === true && typeof pathnameArgValue === "string" && pathnameArgValue !== "") {
      console.log("setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename pathnameArgValue: ", pathnameArgValue);
      pathnameAbsoluteArgValue = await window.api.getAbsolutePathRelativeToFilename(pathnameArgValue, this.autoTTRecConfigFilename);
    } else {
      pathnameAbsoluteArgValue = "";
      pathnameArgValue = "";
    }

    return [pathnameArgValue, pathnameAbsoluteArgValue];
  }

  private async importTextFileArgsAll(
    textFileArgs: (
      ({
        pathnameArgName: "extra-gecko-codes-filename",
        enableArgName: "extra-gecko-codes-enable",
        contentsArgName: "extra-gecko-codes-contents"
      } | {
        pathnameArgName: "top-10-gecko-code-filename",
        enableArgName: undefined
        contentsArgName: "top-10-gecko-code-contents"
      }) & {
        pathnameArgName: ("extra-gecko-codes-filename" | "top-10-gecko-code-filename") & AutoTTRecConfigFormSharedStringArgName,
        enableArgName: (("extra-gecko-codes-enable") & AutoTTRecConfigFormBooleanArgName) | undefined
      }
    )
  ) {
    let [textFilename, absoluteTextFilename] = await this.setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename(textFileArgs);
    //console.log("importTextFileArgsAll textFilename:", textFilename, ", absoluteTextFilename:", absoluteTextFilename);
    let {pathnameArgName, contentsArgName} = textFileArgs;
    let contentsArgValue: string = "";
    if (absoluteTextFilename !== "") {
      console.log(`absoluteTextFilename ${pathnameArgName}: `, absoluteTextFilename);
      let textFilenameContentsOrError: StringOrError;
      textFilenameContentsOrError = await window.api.ipcReadFileEnforceUTF8(absoluteTextFilename, "Not a valid text file!");
      try {
        if (textFilenameContentsOrError.hasError) {
          console.log("Error not undefined in importTextFileArgsAll: error:");
          //console.log(textFilenameContentsOrError.errorCode);
          //let e = textFilenameContentsOrError.error;
          let errorMessageReason: string;
          if (textFilenameContentsOrError.errorCode === "ENOENT") {
            errorMessageReason = "File does not exist!";
          } else {
            //console.log("e.code:", e.code, "e.message:", e.message);
            errorMessageReason = textFilenameContentsOrError.errorMessage;
          }
  
          let errorMessage: string = `Error occurred when reading ${pathnameArgName} "${textFilename}": ${errorMessageReason}`;
          //console.log("importTextFileArgsAll errorMessage:", errorMessage);
          this.errorsAndWarnings.addError(pathnameArgName, errorMessage);
          //console.log("after import errorsAndWarnings:", this.errorsAndWarnings.debug_get_errorsAndWarnings());
          absoluteTextFilename = "";
        }
      } catch (e) {
        console.log("Something went wrong in importTextFileArgsAll:", e);
      }
      contentsArgValue = textFilenameContentsOrError.result;
    }
    this.formData[pathnameArgName] = absoluteTextFilename;
    this.formData[contentsArgName] = contentsArgValue;
  }


/*
  class AutoTTRecArgsClass {
    
    ?: AudioCodec = "libopus";
    "chadsoft-comparison-ghost-page"?: string = "";
    "chadsoft-ghost-page"?: string = "";
    "chadsoft-read-cache"?: boolean = true;
    "chadsoft-write-cache"?: boolean = true;
    "comparison-ghost-filename"?: string = "";
    "crf-value"?: number = 15;
    "dolphin-resolution"?: DolphinResolution = "1440p";
    "encode-only"?: boolean = false;
    "encode-size"?: number = 52428800;
    "encode-type"?: EncodeType = "crf";
    "ending-delay"?: number = 600;
    "extra-gecko-codes-filename"?: string = "";
    "extra-hq-textures-folder"?: string = "";
    "fade-in-at-start"?: boolean = false;
    "h26x-preset"?: H26xPreset = "slow";
    "hq-textures"?: boolean = true;
    "input-display"?: InputDisplay = "auto";
    "input-display-dont-create"?: boolean = false;
    "iso-filename"?: string = "";
    "keep-window"?: boolean = true;
    "main-ghost-filename"?: string = "";
    "mk-channel-ghost-description"?: string = "";
    "no-background-blur"?: boolean = true;
    "no-bloom"?: boolean = false;
    "no-music"?: boolean = false;
    "on-200cc"?: boolean = false;
    "output-width"?: number = 2560; (SPECIAL DEFAULT?)
    "pixel-format"?: string = "yuv420p";
    "speedometer"?: SpeedometerStyle = "fancy";
    ??? "speedometer-decimal-places"?: SpeedometerDecimalPlacesNumeric = 1;
    "speedometer-metric"?: SpeedometerMetric = "engine";
    "szs-filename"?: string = "";
    "top-10-chadsoft"?: string = "";
    "top-10-gecko-code-filename"?: string = "";
    "top-10-highlight"?: number = 1;
    "use-ffv1"?: boolean = false;
    "video-codec"?: VideoCodec = "libx264";
    "youtube-settings"?: boolean = true;
}*/

  private importStraightCopyArgs() {
    this.importSharedChoiceArg("aspect-ratio-16-by-9", ASPECT_RATIO_16_BY_9_VALUES);
    this.importSharedChoiceArg("audio-codec", AUDIO_CODECS);
    this.importSharedStringArg("chadsoft-ghost-page");
    this.importSharedStringArg("chadsoft-comparison-ghost-page");
    this.importSharedBooleanArg("chadsoft-read-cache");
    this.importSharedBooleanArg("chadsoft-write-cache");
    this.importSharedStringArg("comparison-ghost-filename");
    this.importSharedNumberArg("crf-value");
    this.importSharedChoiceArg("dolphin-resolution", DOLPHIN_RESOLUTIONS);
    this.importSharedBooleanArg("encode-only");
    this.importSharedNumberArg("encode-size");
    this.importSharedChoiceArg("encode-type", ENCODE_TYPES);
    this.importSharedNumberArg("ending-delay");

    this.importSharedStringArg("extra-gecko-codes-filename");
    this.importSharedStringArg("extra-hq-textures-folder");
    this.importSharedStringArg("iso-filename");
    this.importSharedStringArg("main-ghost-filename");
    this.importSharedStringArg("mk-channel-ghost-description");
    this.importSharedStringArg("pixel-format");
    this.importSharedStringArg("szs-filename");
    this.importSharedStringArg("top-10-chadsoft");
    this.importSharedStringArg("top-10-gecko-code-filename");
    
    this.importSharedBooleanArg("fade-in-at-start");
    this.importSharedBooleanArg("hq-textures");
    this.importSharedBooleanArg("input-display-dont-create");
    this.importSharedBooleanArg("keep-window");
    this.importSharedBooleanArg("no-background-blur");
    this.importSharedBooleanArg("no-bloom");
    this.importSharedBooleanArg("no-music");
    this.importSharedBooleanArg("use-ffv1");
    this.importSharedBooleanArg("youtube-settings");
    
    this.importSharedChoiceArg("h26x-preset", H26X_PRESETS);
    this.importSharedChoiceArg("input-display", INPUT_DISPLAYS);
    this.importSharedChoiceArg("speedometer-style", SPEEDOMETER_STYLES);
    this.importSharedChoiceArg("speedometer-decimal-places-str", SPEEDOMETER_DECIMAL_PLACES);
    this.importSharedChoiceArg("speedometer-metric", SPEEDOMETER_METRICS);
    this.importSharedChoiceArg("video-codec", VIDEO_CODECS);
    this.importSharedChoiceArg("set-200cc", SET_200CC_VALUES);
    
    this.importSharedNumberArg("output-width-custom");
    this.importSharedNumberArg("top-10-highlight");    

    this.importSharedStringArg("chadsoft-cache-expiry");

  }

  // if "audio-bitrate" is <FILLME>, NaN
  // else if "audio-bitrate" is null
  //   if "audio-codec" is "libopus"
  //     if "encode-type" is "crf", default 128k
  //     else if "encode-type" is "size", default 64k
  //   else if "audio-codec" is "aac"
  //     if "encode-type" is "crf", default 384k
  //     else if "encode-type" is "size", default 128k
  // then special convert

  // if "audio-bitrate" has k
  //   hasK = true
  //   convert from "audio-bitrate" accounting for k
  // else
  //   hasK = false
  //   "audio-bitrate" is "audio-bitrate"

  private importFormComplexity() {
    let formComplexityArgValue = this.validateString_errorIfNot_handleUndefined("form-complexity");
    let formComplexity: FormComplexity;

    if (formComplexityArgValue === null) {
      this.errorsAndWarnings.addWarning("form-complexity", `form-complexity is unspecified or null, defaulting to advanced. (Specify 0 for simple, 1 for advanced, and 2 for all)`);
      formComplexity = FormComplexity.ADVANCED;
    } else if (formComplexityArgValue === "") {
      this.errorsAndWarnings.addError("form-complexity", "form-complexity MUST be specified (0 for simple, 1 for advanced, and 2 for all). Defaulting to advanced.");
      formComplexity = FormComplexity.ADVANCED;
    } else if (formComplexityArgValue === FormComplexity.SIMPLE || formComplexityArgValue === FormComplexity.ADVANCED || formComplexityArgValue === FormComplexity.ALL) {
      formComplexity = formComplexityArgValue;
    } else {
      this.errorsAndWarnings.addError("form-complexity", `form-complexity is not one of 0, 1, or 2 (simple, advanced, and all respectively) (got: ${formComplexityArgValue}). Defaulting to advanced.`);
      formComplexity = FormComplexity.ADVANCED;
    }
    this.formData["form-complexity"] = formComplexity;
  }

  private importAudioBitrateAll() {
    let audioBitrate = this.autoTTRecConfig["audio-bitrate"];
    let newAudioBitrate: number = NaN;

    let hasKbps: boolean = true;

    if (audioBitrate === "<FILLME>") {
      newAudioBitrate = NaN;
    } else if (audioBitrate === null) {
      let encodeType = this.getFormDataStringOrChoice_verifyNotUndefined("encode-type");
      let audioCodec = this.getFormDataStringOrChoice_verifyNotUndefined("audio-codec");
      newAudioBitrate = getDefaultAudioBitrate(encodeType, audioCodec);
      hasKbps = false;
    } else {
      let numericAudioBitrate: undefined | number;
      if (typeof audioBitrate === "string") {
        let kbpsMultiplier = 1;
        if (audioBitrate.charAt(audioBitrate.length - 1) === "k") {
          audioBitrate = audioBitrate.substring(0, audioBitrate.length - 1);
        } else {
          hasKbps = false;
        }
        numericAudioBitrate = Number(audioBitrate) * kbpsMultiplier;
      } else if (typeof audioBitrate === "number") {
        numericAudioBitrate = audioBitrate;
        hasKbps = false;
      } else {
        this.errorsAndWarnings.addErrorWrongType("audio-bitrate", "string or number", audioBitrate);
        numericAudioBitrate = undefined;
        hasKbps = true;
      }

      if (numericAudioBitrate !== undefined) {
        if (Number.isNaN(numericAudioBitrate)) {
          this.errorsAndWarnings.addError("audio-bitrate", `Invalid audio bitrate ${audioBitrate}!`);
          newAudioBitrate = NaN;
          hasKbps = true;
        }
      }
    }

    this.formData["audio-bitrate"] = newAudioBitrate;
    this.setAudioBitrateDisplayedAndUnit(newAudioBitrate, hasKbps);
  }

  // DO NOT CALL
  private setAudioBitrateDisplayedAndUnit(audioBitrate: number, hasKbps: boolean) {
    if (!Number.isNaN(audioBitrate) && hasKbps) {
      audioBitrate = Math.floor(Math.floor(audioBitrate) / 1000)
    }

    this.formData["audio-bitrate-displayed"] = audioBitrate;

    if (Number.isNaN(audioBitrate) || hasKbps) {
      this.formData["audio-bitrate-unit"] = "kbps";
    } else {
      this.formData["audio-bitrate-unit"] = "bps";
    }
  }

  private importBackgroundMusicSourceAndMusicFilename() {
    let musicFilename = this.validateSharedStringOrChoiceArg_errorIfNot_handleUndefinedNull("music-filename");
    if (musicFilename === "") {
      this.formData["background-music-source"] = "<FILLME>";
    } else if (musicFilename === "bgm") {
      this.formData["background-music-source"] = "game-bgm";
      musicFilename = "";
    } else if (musicFilename === "none") {
      this.formData["background-music-source"] = "none";
      musicFilename = "";
    } else {
      this.formData["background-music-source"] = "music-filename";
    }

    this.formData["music-filename"] = musicFilename;
  }

  /*
      if "top-10-chadsoft" is <FILLME>, "top10chadsoft"
    else if "top-10-gecko-code-filename" is <FILLME>, "top10gecko"
    else if "top-10-chadsoft", "top10chadsoft"
    else if "top-10-gecko-code-filename", "top10gecko"
    else "top10chadsoft", throw error
  else if "timeline" is null, "notop10" (different from record_ghost behaviour)
  else if "timeline" in {"noencode", "ghostonly", "ghostselect", "mkchannel"}, "notop10"
  else "notop10", throw error

  */

  private setTimelineCategoryAndNoTop10() {
    let timeline = this.validateString_errorIfNot_handleUndefined("timeline");
    let timelineCategory: TimelineCategory | null;
    let noTop10Category: NoTop10Category | null;

    if (timeline === "top10") {
      let top10Chadsoft = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("top-10-chadsoft");
      let top10GeckoCodeFilename = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("top-10-gecko-code-filename");
      if (top10Chadsoft === "") {
        timelineCategory = "top10chadsoft";
      } else if (top10GeckoCodeFilename === "") {
        timelineCategory = "top10gecko";
      } else if (top10Chadsoft !== null) {
        timelineCategory = "top10chadsoft";
      } else if (top10GeckoCodeFilename !== null) {
        timelineCategory = "top10gecko";
      } else {
        timelineCategory = "<FILLME>";
        this.errorsAndWarnings.addError("timeline", "timeline was specified as top10 but neither top-10-chadsoft nor top-10-gecko-code-filename were specified! Defaulting to top10chadsoft.");
      }
      noTop10Category = "mkchannel";
    } else {
      timelineCategory = "notop10";
      if (timeline !== null) {
        if (isInSet(NO_TOP_10_CATEGORIES.set, timeline)) {
          noTop10Category = timeline;
        } else {
          noTop10Category = "<FILLME>";          
          if (timeline === "") {
            this.errorsAndWarnings.addError("timeline", "Timeline cannot be empty or <FILLME>! Defaulting to mkchannel.");
          } else {
            this.errorsAndWarnings.addInvalidChoiceError("timeline", TIMELINES, timeline, " Defaulting to mkchannel.");
          }
        }
      } else {
        this.errorsAndWarnings.addWarning("timeline", "timeline was unspecified/null, defaulting to mkchannel.");
        noTop10Category = null;
      }
    }
    this.setStringOrChoiceArg_handleNullOrDisallowedFILLME("timeline-category", timelineCategory);
    this.setStringOrChoiceArg_handleNullOrDisallowedFILLME("no-top-10-category", noTop10Category);
  }

  private setTop10HighlightEnable() {
    let top10Highlight = this.getFormDataNumber_verifyNotUndefinedOrFILLME("top-10-highlight");
    let top10HighlightEnable: boolean | "<FILLME>";

    if (Number.isNaN(top10Highlight)) {
      top10HighlightEnable = "<FILLME>";
    } else if (top10Highlight === -1) {
      top10HighlightEnable = false;
    } else {
      top10HighlightEnable = true;
    }

    this.formData["top-10-highlight-enable"] = top10HighlightEnable;
  }

  private importGhostSource(isMainGhost: boolean) {
    let [ghostPageArgName, ghostFilenameArgName, ghostSourceArgName]: ["chadsoft-ghost-page", "main-ghost-filename", "main-ghost-source"] | ["chadsoft-comparison-ghost-page", "comparison-ghost-filename", "comparison-ghost-source"] = isMainGhost ? ["chadsoft-ghost-page", "main-ghost-filename", "main-ghost-source"] : ["chadsoft-comparison-ghost-page", "comparison-ghost-filename", "comparison-ghost-source"];

    let ghostPageValue = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull(ghostPageArgName);
    let ghostFilenameValue = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull(ghostFilenameArgName);
    let ghostSourceValue: BothGhostSource | null;

    if (ghostPageValue === "" && ghostFilenameValue === "") {
      ghostSourceValue = "<FILLME>";
    } else if (ghostPageValue === "") {
      ghostSourceValue = "chadsoft";
    } else if (ghostFilenameValue === "") {
      ghostSourceValue = "rkg";
    } else if (ghostPageValue !== null) {
      ghostSourceValue = "chadsoft";
    } else if (ghostFilenameValue !== null) {
      ghostSourceValue = "rkg";
    } else {
      ghostSourceValue = null;
    }

    if (ghostSourceValue !== null) {
      this.formData[ghostSourceArgName] = ghostSourceValue;
    } else {
      if (ghostSourceArgName === "main-ghost-source") {
        let timelineCategory = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("timeline-category");
        if (timelineCategory === "top10chadsoft" && this.formData["top-10-highlight-enable"]) {
          ghostSourceValue = "chadsoft";
        } else {
          ghostSourceValue = "<FILLME>";
          this.errorsAndWarnings.addError("main-ghost-source", "Neither chadsoft-ghost-page nor main-ghost-filename were specified and timeline isn't top10 with top-10-highlight enabled (not -1).");
        }
        this.formData[ghostSourceArgName] = ghostSourceValue
      } else {
        this.formData[ghostSourceArgName] = "none";
      }
    }
  }

  private setEncodeSizeDisplayedAndUnit() {
    let isMiB: boolean = false;
    let encodeSize = this.getFormDataNumber_verifyNotUndefinedOrFILLME("encode-size");
    let encodeSizeDisplayed: number;

    if (Number.isNaN(encodeSize)) {
      encodeSizeDisplayed = NaN;
      isMiB = true;
    } else if (encodeSize % 1048576 === 0) {
      encodeSizeDisplayed = Math.floor(encodeSize / 1048576);
      isMiB = true;
    } else {
      encodeSizeDisplayed = encodeSize;
    }
    this.formData["encode-size-displayed"] = encodeSizeDisplayed;

    let encodeSizeUnit: EncodeSizeUnit;

    if (isMiB) {
      encodeSizeUnit = "mib";
    } else {
      encodeSizeUnit = "bytes";
    }

    this.formData["encode-size-unit"] = encodeSizeUnit;
  }

  private async importAllExtraGeckoCodeArgs() {
    await this.importTextFileArgsAll({
      pathnameArgName: "extra-gecko-codes-filename",
      enableArgName: "extra-gecko-codes-enable",
      contentsArgName: "extra-gecko-codes-contents"
    });
    this.formData["extra-gecko-codes-unsaved"] = false;
  }

  private async importAllTop10GeckoCodeArgs() {
    await this.importTextFileArgsAll({
      pathnameArgName: "top-10-gecko-code-filename",
      enableArgName: undefined,
      contentsArgName: "top-10-gecko-code-contents"
    });
    this.formData["top-10-gecko-code-unsaved"] = false;
  }

  private async resolveHQTexturesFolderAndSetHQTexturesFolderEnable() {
    let [extraHQTexturesFolder, extraHQTexturesAbsoluteFolder] = await this.setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename({
      pathnameArgName: "extra-hq-textures-folder",
      enableArgName: "extra-hq-textures-folder-enable"
    });
  
    if (extraHQTexturesAbsoluteFolder !== "") {
      this.formData["extra-hq-textures-folder"] = extraHQTexturesAbsoluteFolder;
    }
  }

  private importVolume(
    volumeArgName: "game-volume" | "music-volume",
    volumeNumberInputArgName: "game-volume-numberinput" | "music-volume-numberinput",
    volumeSliderArgName: "game-volume-slider" | "music-volume-slider"
  ) {
    let volumeArgValue = this.validateNumber_errorIfNot_handleUndefinedString(volumeArgName);
    let volumeNumberInputArgValue: number;

    if (volumeArgValue === NaN) {
      volumeNumberInputArgValue = NaN;
    } else if (volumeArgValue === null) {
      volumeNumberInputArgValue = DEFAULT_FORM_VALUES[volumeNumberInputArgName];
    } else {
      volumeNumberInputArgValue = volumeArgValue * 100;
    }

    this.formData[volumeNumberInputArgName] = volumeNumberInputArgValue;
    let volumeSliderArgValue: number;

    if (Number.isNaN(volumeNumberInputArgValue)) {
      volumeSliderArgValue = NaN;
    } else {
      volumeSliderArgValue = Math.min(volumeNumberInputArgValue, 125);
    }

    this.formData[volumeSliderArgName] = volumeSliderArgValue;
  }

  // if "no-music-mkchannel" and not "start-music-at-beginning", "no-music-mkchannel"
  // else if "no-music-mkchannel" and "start-music-at-beginning"
  //   if "no-top-10-category" is mkchannel, "no-music-mkchannel"
  //   else "start-music-at-beginning"
  // else if "start-music-at-beginning", "start-music-at-beginning"
  // else "normal"

  private setMusicPresentation() {
    let noMusicMKChannel = this.validateBoolean_errorIfNot_handleUndefined("no-music-mkchannel");
    let startMusicAtBeginning = this.validateBoolean_errorIfNot_handleUndefined("start-music-at-beginning");
    let musicPresentation: MusicPresentation;
    
    if (noMusicMKChannel === "<FILLME>" || startMusicAtBeginning === "<FILLME>") {
      musicPresentation = "<FILLME>";
    } else {
      if (noMusicMKChannel && !startMusicAtBeginning) {
        musicPresentation = "no-music-mkchannel";
      } else if (noMusicMKChannel && startMusicAtBeginning) {
        let noTop10Category = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("no-top-10-category");
        if (noTop10Category === "mkchannel") {
          musicPresentation = "no-music-mkchannel";
        } else {
          musicPresentation = "start-music-at-beginning";
        }
      } else if (startMusicAtBeginning) {
        musicPresentation = "start-music-at-beginning";
      } else {
        musicPresentation = "normal";
      }
    }

    this.formData["music-presentation"] = musicPresentation;
  }

//   if "output-video-filename" is "mp4", "mp4"
//   else if "output-video-filename" is "webm", "webm"
//   else if "output-video-filename" is "mkv", "mkv"
//   else if "output-video-filename" suffix is ".mkv", "mkv"
//   else if "output-video-filename" suffix is ".mp4", "mp4"
//   else if "output-video-filename" suffix is ".webm", "webm"
//   else <FILLME>

// special case for handling "encode-type", "video-codec", and "output-video-file-format"


  private importOutputVideoFilename_setOutputVideoFileFormat_validateAllowedVideoCodec() {
    let outputVideoFilename = this.validateString_errorIfNot_handleUndefined("output-video-filename");
    let outputVideoFileFormat: OutputVideoFileFormat;

    if (outputVideoFilename === "" || outputVideoFilename === null) {
      outputVideoFileFormat = "<FILLME>";
      outputVideoFilename = "";
    } else if (isInSet(OUTPUT_VIDEO_FILE_FORMATS.set, outputVideoFilename)) {
      outputVideoFileFormat = outputVideoFilename;
    } else if (outputVideoFilename.endsWith(".mkv")) {
      outputVideoFileFormat = "mkv";
    } else if (outputVideoFilename.endsWith(".mp4")) {
      outputVideoFileFormat = "mp4"
    } else if (outputVideoFilename.endsWith(".webm")) {
      outputVideoFileFormat = "webm";
    } else {
      this.errorsAndWarnings.addError("output-video-filename", `output-video-filename ${outputVideoFilename} is not an mkv, mp4, or webm, and is not mkv, mp4, or webm itself!`);
      outputVideoFileFormat = "<FILLME>";
      outputVideoFilename = "";
    }

    let encodeType = this.getFormDataStringOrChoice_verifyNotUndefined("encode-type");
    let videoCodec = this.getFormDataStringOrChoice_verifyNotUndefined("video-codec");

    if (encodeType === "crf") {
      if (videoCodec === "libvpx-vp9") {
        videoCodec = "<FILLME>";
        this.errorsAndWarnings.addError("video-codec", "video-codec cannot be libvpx-vp9 if encode-type is crf!");
      } if (outputVideoFileFormat === "webm") {
        outputVideoFileFormat = "<FILLME>";
        this.errorsAndWarnings.addError("output-video-filename", "output-video-filename cannot be a webm if encode-type is crf!");
      }
    } else if (encodeType === "size") {
      if (videoCodec === "libx265") {
        videoCodec = "<FILLME>";
        this.errorsAndWarnings.addError("video-codec", "video-codec cannot be libx265 if encode-type is size!");
      } if (outputVideoFileFormat === "webm" && videoCodec !== "libvpx-vp9") {
        this.errorsAndWarnings.addError("video-codec", `video-codec must be libvpx-vp9 if output-video-filename is a webm! (got: ${videoCodec}`);
        videoCodec = "libvpx-vp9";
      }
    }

    this.formData["output-video-filename"] = outputVideoFilename;
    this.formData["output-video-file-format"] = outputVideoFileFormat;
    this.formData["video-codec"] = videoCodec;
  }

  private setOutputWidthPreset() {
    let outputWidthCustom = this.getFormDataNumberArg_verifyNotUndefinedOrFILLME_nullIfWasNull("output-width-custom");
    let outputWidthPreset: OutputWidthPreset;

    if (outputWidthCustom === null) {
      outputWidthPreset = "none";
    } else {
      let outputWidthCustomStr: string;
      if (Number.isNaN(outputWidthCustom)) {
        outputWidthCustomStr = "<FILLME>";
      } else {
        outputWidthCustomStr = outputWidthCustom.toString();
      }
      if (isInSet(OUTPUT_WIDTH_PRESETS.set, outputWidthCustomStr)) {
        outputWidthPreset = outputWidthCustomStr;
      } else {
        outputWidthPreset = "custom";
      }
    }
    this.formData["output-width-preset"] = outputWidthPreset;
  }

// if "timeline-category" is "notop10"
//   if "main-ghost-source" is "rkg", "fromfile"
//   else <FILLME>
// else if "timeline-category" is "top10chadsoft"
//   if "top-10-highlight" is -1, "fromfile"
//   else <FILLME>
// else if "timeline-category" is "top10gecko"
//   if "main-ghost-source" is "rkg", "fromfile"
//   else <FILLME>
// else <FILLME>, throw error

  private setSzsSource() {
    let szsFilename = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("szs-filename");
    let szsSource: SZSSource;
    if (szsFilename === null) {
      szsSource = "automatic";
    } else if (szsFilename === "") {
      let timelineCategory = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("timeline-category");
      let mainGhostSource = this.getFormDataStringOrChoiceArg_verifyNotUndefined_nullIfWasNull("main-ghost-source");
      if (timelineCategory === "notop10" || timelineCategory === "top10gecko") {
        if (mainGhostSource === "rkg") {
          szsSource = "fromfile";
        } else {
          szsSource = "<FILLME>";
        }
      } else if (timelineCategory === "top10chadsoft") {
        let top10Highlight = this.getFormDataNumberArg_verifyNotUndefinedOrFILLME_nullIfWasNull("top-10-highlight");
        if (top10Highlight === -1) {
          szsSource = "fromfile";
        } else {
          szsSource = "<FILLME>";
        }
      } else {
        this.errorsAndWarnings.addError("szs-filename", "Because szs-filename is <FILLME> and the program couldn't determine the timeline-category (No Top 10 vs Top 10 from Chadsoft vs Top 10 from Gecko Code), it is impossible to determine whether szs-filename: <FILLME> means to download automatically/vanilla track or to supply from SZS!");
        szsSource = "<FILLME>";
      }
    } else {
      szsSource = "fromfile";
    }

    this.formData["szs-source"] = szsSource;
  }

  public importTop10Location_setTop10GeckoCodeLocationRegion(): [string | null, boolean] {
    let top10Location = this.validateString_errorIfNot_handleUndefined("top-10-location");
    let top10GeckoCodeLocationRegion: Top10GeckoCodeLocationRegion;
    let isDefinitivelyWorldwide: boolean;

    if (top10Location === "") {
      top10GeckoCodeLocationRegion = "<FILLME>";
      isDefinitivelyWorldwide = false;
    } else if (top10Location === null) {
      top10GeckoCodeLocationRegion = DEFAULT_FORM_VALUES["top-10-gecko-code-location-region"];
      isDefinitivelyWorldwide = false;
    } else {
      let top10LocationLower = top10Location.toLowerCase();
      if (top10LocationLower === "ww" || top10LocationLower === "worldwide") {
        top10GeckoCodeLocationRegion = "worldwide";
        isDefinitivelyWorldwide = true;
      } else {
        top10GeckoCodeLocationRegion = "regional";
        isDefinitivelyWorldwide = false;
      }
    }

    this.formData["top-10-gecko-code-location-region"] = top10GeckoCodeLocationRegion;
    return [top10Location, isDefinitivelyWorldwide];
  }

  // special code for handling all top 10 non-gecko code

  // "top-10-location-regional-location" = default
  // "top-10-location-country-location" = default
  // "top-10-location-region" = <FILLME>

  // if "top-10-location" is <FILLME>
  //   "top-10-location-regional-location" is <FILLME>
  //   "top-10-location-country-location" is <FILLME>
  //   "top-10-location-region" is <FILLME>
  // else if "top-10-location" is null
  //   default
  // else if "top-10-location" in {ww, worldwide}
  //   "worldwide"
  // else
  //   "top-10-location-regional-location":
  //     if "top-10-location" is regional
  //       <FILLME>
  //       "top-10-location-region" is regional
  //     else if "top-10-location" in regionalLocations
  //       "top-10-location"
  //       "top-10-location-region" is regional
  //     else
  //       "top-10-location-country-location":
  //         if "top-10-location" is country
  //           <FILLME>
  //           "top-10-location-region" is country
  //         else if "top-10-location" in countryLocations
  //           "top-10-location"
  //           "top-10-location-region" is country

  //     if "top-10-location-region" is <FILLME>, <FILLME>, throw error

  public importTop10Location() {
    let [top10Location, isDefinitivelyWorldwide] = this.importTop10Location_setTop10GeckoCodeLocationRegion();
    let top10LocationRegionalLocation: Top10LocationRegional = DEFAULT_FORM_VALUES["top-10-location-regional-location"];
    let top10LocationCountryLocation: Top10LocationCountry = DEFAULT_FORM_VALUES["top-10-location-country-location"];
    let top10LocationRegion: Top10LocationRegion = "<FILLME>";

    if (top10Location === "") {
      top10LocationRegionalLocation = "<FILLME>";
      top10LocationCountryLocation = "<FILLME>";
      top10LocationRegion = "<FILLME>";
    } else if (top10Location === null) {
      top10LocationRegion = DEFAULT_FORM_VALUES["top-10-location-region"];
    } else if (isDefinitivelyWorldwide) {
      top10LocationRegion = "worldwide";
    } else {
      if (top10Location === "regional") {
        top10LocationRegionalLocation = "<FILLME>";
        top10LocationRegion = "regional";
      } else if (isInSet(REGIONAL_LOCATIONS.set, top10Location)) {
        top10LocationRegionalLocation = top10Location;
        top10LocationRegion = "regional";
      } else {
        let potentialTop10LocationRegionalLocation: Top10LocationRegional | undefined;
        potentialTop10LocationRegionalLocation = TOP_10_LOCATION_REGIONAL_TO_FULL_NAME[top10LocationRegion.toLowerCase()];
        if (potentialTop10LocationRegionalLocation !== undefined) {
          top10LocationRegionalLocation = potentialTop10LocationRegionalLocation;
          top10LocationRegion = "regional";
        } else {
          if (top10Location === "country") {
            top10LocationCountryLocation = "<FILLME>";
            top10LocationRegion = "country";
          } else if (isInSet(COUNTRY_LOCATIONS.set, top10Location)) {
            top10LocationCountryLocation = top10Location;
            top10LocationRegion = "country";
          } else if (isInSet(COUNTRY_FLAG_IDS.set, top10Location)) {
            // top10Location should never be <FILLME> or "" at this point
            let potentialTop10CountryLocationDerivedFromFlagId = COUNTRY_LOCATION_NAMES_BY_FLAG_ID[top10Location];
            if (potentialTop10CountryLocationDerivedFromFlagId !== undefined) {
              top10LocationCountryLocation = potentialTop10CountryLocationDerivedFromFlagId;
              top10LocationRegion = "country";
            }
          }
        }
      }
      if (top10LocationRegion === "<FILLME>") {
        this.errorsAndWarnings.addError("top-10-location", `top-10-location was not "ww", "worldwide", "country", "regional", or a country or region allowed by auto-tt-recorder (got ${top10Location})`);
      }
    }

    this.formData["top-10-location-regional-location"] = top10LocationRegionalLocation;
    this.formData["top-10-location-country-location"] = top10LocationCountryLocation;
    this.formData["top-10-location-region"] = top10LocationRegion;
  }
  // {trackName} {cc} {vehicle} {category} {continent} Top 10
  private importTop10TitleAndSetTop10TitleType() {
    let top10Title = this.validateString_errorIfNot_handleUndefined("top-10-title");
    let top10TitleType: Top10TitleType;

    if (top10Title === null) {
      top10TitleType = DEFAULT_FORM_VALUES["top-10-title-type"];
      top10Title = DEFAULT_FORM_VALUES["top-10-title"];
    } else if (top10Title === "auto") {
      top10TitleType = "auto";
      top10Title = "{trackName} {cc} {vehicle} {category} {continent} Top 10";
    } else /* if (top10Title === "" or top10Title !== "") */ {
      top10TitleType = "manual";
    }

    this.formData["top-10-title"] = top10Title;
    this.formData["top-10-title-type"] = top10TitleType;
  }

  private importTrackNameAndSetTrackNameType() {
    let trackName = this.validateString_errorIfNot_handleUndefined("track-name");
    let trackNameType: TrackNameType;

    if (trackName === null) {
      trackName = DEFAULT_FORM_VALUES["track-name"];
      trackNameType = "rkg-slot";
    } else if (trackName === "auto") {
      trackName = DEFAULT_FORM_VALUES["track-name"];
      trackNameType = "auto";
    } else {
      trackNameType = "manual";
    }

    this.formData["track-name"] = trackName;
    this.formData["track-name-type"] = trackNameType;
  }

  private clearAudioBitrateAndCodecState() {
    let encodeType = this.getFormDataStringOrChoice_verifyNotUndefined("encode-type");
    let audioCodec = this.getFormDataStringOrChoice_verifyNotUndefined("audio-codec");

    this.formData["audio-bitrate-last-encode-type"] = encodeType;
    this.formData["audio-bitrate-last-audio-codec"] = audioCodec;
  }

  private validateFormDataNonPartial() {
    for (const argName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
      if (this.formData[argName] === undefined) {
        this.errorsAndWarnings.addKeyUndefinedWarning(argName, "formData");
        this.formData[argName] = DEFAULT_FORM_VALUES[argName] as any;
      } else if (this.formData[argName] === null) {
        this.errorsAndWarnings.addWarning(argName, `formData[${argName}] was somehow null! (this is an error within the program itself and not your fault, please contact the developer!)`);
        this.formData[argName] = DEFAULT_FORM_VALUES[argName] as any;
      }
    }
  }

  public async import(): Promise<AutoTTRecConfigFormFields> {
    if (!this.hasImported) {
      this.importStraightCopyArgs();
      this.importFormComplexity();
      this.importAudioBitrateAll();
      this.importBackgroundMusicSourceAndMusicFilename();
      this.setTimelineCategoryAndNoTop10();
      this.setTop10HighlightEnable();
      this.importGhostSource(true);
      this.importGhostSource(false);
      this.setEncodeSizeDisplayedAndUnit();
      //Promise.allSettled([
        await this.importAllExtraGeckoCodeArgs();
        await this.importAllTop10GeckoCodeArgs();
        await this.resolveHQTexturesFolderAndSetHQTexturesFolderEnable();
      //])
      this.importVolume("game-volume", "game-volume-numberinput", "game-volume-slider");
      this.importVolume("music-volume", "music-volume-numberinput","music-volume-slider");
      this.setMusicPresentation();
      this.importOutputVideoFilename_setOutputVideoFileFormat_validateAllowedVideoCodec();
      this.setOutputWidthPreset();
      this.setSzsSource();
      this.importTop10Location_setTop10GeckoCodeLocationRegion();
      this.importTop10Location();
      this.importTop10TitleAndSetTop10TitleType();
      this.importTrackNameAndSetTrackNameType();
      this.clearAudioBitrateAndCodecState();
      this.validateFormDataNonPartial();
      this.hasImported = true;
    }

    return this.formData as AutoTTRecConfigFormFields;
  }
}
