
import { EncodeSizeUnit } from "../renderer/components/form_components/EncodeSizeInput";

import { MainGhostSource } from "../renderer/components/form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "../renderer/components/form_components/ComparisonGhostSourceInput";
import { SZSSource } from "../renderer/components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "../renderer/components/form_components/Top10LocationInput";

import { Top10LocationCountry, countryLocations } from "../renderer/components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional, regionalLocations } from "../renderer/components/form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "../renderer/components/form_components/BackgroundMusicSourceInput";

import { InputDisplay, INPUT_DISPLAYS } from "../renderer/components/form_components/InputDisplayInput";
import { SpeedometerStyle, SPEEDOMETER_STYLES, SPEEDOMETER_STYLES2 } from "../renderer/components/form_components/SpeedometerInput";
import { SpeedometerMetric, SPEEDOMETER_METRICS } from "../renderer/components/form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces, SpeedometerDecimalPlacesNumeric, SPEEDOMETER_DECIMAL_PLACES_NUMERIC, SPEEDOMETER_DECIMAL_PLACES } from "../renderer/components/form_components/SpeedometerDecimalPlacesInput";

import { EncodeType, ENCODE_TYPES } from "../renderer/components/layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat, OUTPUT_VIDEO_FILE_FORMATS } from "../renderer/components/form_components/OutputVideoFileFormatInput";
import { VideoCodec, VIDEO_CODECS } from "../renderer/components/form_components/VideoCodecInput";

import { DolphinResolution, DOLPHIN_RESOLUTIONS } from "../renderer/components/form_components/DolphinResolutionInput";
import { AudioCodec, AUDIO_CODECS } from "../renderer/components/form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit, getDefaultAudioBitrate } from "../renderer/components/form_components/AudioBitrateInput";

import { H26xPreset, H26X_PRESETS } from "../renderer/components/form_components/H26xPresetInput";
import { OutputWidthPreset, recommendedOutputWidths } from "../renderer/components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "../renderer/components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "../renderer/components/layout_components/TimelineCategoryLayout";

import { NoTop10Category, NO_TOP_10_CATEGORIES } from "../renderer/components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9, ASPECT_RATIO_16_BY_9_VALUES } from "../renderer/components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "../renderer/components/form_components/TrackNameInput";

import { MusicPresentation } from "../renderer/components/form_components/MusicPresentationInput";
import { FormComplexity } from "../renderer/components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "../renderer/components/form_components/Top10TitleInput";

import { Set200cc, SET_200CC_VALUES } from "../renderer/components/form_components/Set200ccInput";

import { AutoTTRecConfig } from "../shared-types";

import { ValidValues, ReadonlyArraySet, makeReadonlyArraySet } from "../renderer/array-set";

import { readFileEnforceUTF8 } from "./gui2";

import path from "path";

const TIMELINES = makeReadonlyArraySet(["noencode", "ghostonly", "ghostselect", "mkchannel", "top10"] as const);
export type Timeline = ValidValues<typeof TIMELINES>;

export type ExtendedTimeline = "noencode" | "ghostonly" | "ghostselect" | "mkchannel" | "top10chadsoft" | "top10gecko";

const DEBUG_PREFILLED_DEFAULTS = false;

// == types without <FILLME> ==
// arbitrary (string) types can just be set to ""
// number types can just be set to NaN
// internal types need custom logic
// == types with <FILLME> ==
// choice inputs (dropdown, radio button)
// checkbox inputs (tri-checkbox)

type AnyFIXME = any;

export class AutoTTRecConfigFormFieldTypesNoFILLMEClass {
  "aspect-ratio-16-by-9": AspectRatio16By9 = "auto"; // choice
  "audio-bitrate": number = 128000; // number
  "audio-bitrate-displayed": number = 128; // internal
  "audio-bitrate-unit": AudioBitrateUnit = "kbps"; // internal
  "audio-codec": AudioCodec = "libopus"; // choice
  "background-music-source": BackgroundMusicSource = DEBUG_PREFILLED_DEFAULTS ? "game-bgm" : "music-filename"; // choice
  "chadsoft-comparison-ghost-page": string = ""; // arbitrary
  "chadsoft-ghost-page": string = DEBUG_PREFILLED_DEFAULTS ? "https://www.chadsoft.co.uk/time-trials/rkgd/D3/25/D29456963F8A9C5D7D9A8949118A19873EA6.html" : ""; // arbitrary
  "chadsoft-read-cache": boolean = true;
  "chadsoft-write-cache": boolean = true;
  "chadsoft-cache-expiry": string = "24h";
  "comparison-ghost-filename": string = ""; // arbitrary
  "comparison-ghost-source": ComparisonGhostSource = "none"; // choice
  "crf-value": number = 15; // number
  "dolphin-resolution": DolphinResolution = DEBUG_PREFILLED_DEFAULTS ? "480p" : "1440p"; // choice
  "encode-only": boolean = false; // checkbox
  "encode-size": number = 52428800; // number
  "encode-size-displayed": number = 50; // internal
  "encode-size-unit": EncodeSizeUnit = "mib"; // internal
  "encode-type": EncodeType = "crf"; // choice
  "ending-delay": number = 600; // number
  "extra-gecko-codes-enable": boolean = false; // checkbox
  "extra-gecko-codes-contents": string = ""; // arbitrary
  "extra-gecko-codes-filename": string = ""; // arbitrary
  "extra-gecko-codes-unsaved": boolean = false; // internal
  "extra-hq-textures-folder-enable": boolean = false; // checkbox
  "extra-hq-textures-folder": string = ""; // arbitrary
  "fade-in-at-start": boolean = false; // checkbox
  "form-complexity": FormComplexity = FormComplexity.SIMPLE; // choice
  "game-volume-slider": number = 100; // number
  "game-volume-numberinput": number = 100; // number
  "h26x-preset": H26xPreset = DEBUG_PREFILLED_DEFAULTS ? "ultrafast" : "slow";
  "hq-textures": boolean = true; // checkbox
  "input-display": InputDisplay = "auto"; // choice
  "input-display-dont-create": boolean = false; // checkbox
  "iso-filename": string = DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\RMCE01.iso" : "";
  "keep-window": boolean = true; // checkbox
  "main-ghost-filename": string = ""; // arbitrary
  "main-ghost-source": MainGhostSource = "chadsoft"; // choice
  "mk-channel-ghost-description": string = "Ghost Data"; // arbitrary
  "music-filename": string = ""; // arbitrary
  "music-presentation": MusicPresentation = "normal"; // choice
  "music-volume-numberinput": number = 100; // number
  "music-volume-slider": number = 100; // number
  "no-background-blur": boolean = true; // checkbox
  "no-bloom": boolean = false; // checkbox
  "no-music": boolean = false; // checkbox
  "no-top-10-category": NoTop10Category = "mkchannel"; // choice
  "output-video-filename": string = DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\guitest1.mp4" : ""; // arbitrary
  "output-video-file-format": OutputVideoFileFormat = "mp4"; // choice
  "output-width-custom": number = NaN; // number
  "output-width-preset": OutputWidthPreset = DEBUG_PREFILLED_DEFAULTS ? "none" : "2560"; // choice
  "pixel-format": string = "yuv420p"; // arbitrary
  "set-200cc": Set200cc = "no-200cc"; // choice
  "speedometer-decimal-places-str": SpeedometerDecimalPlaces = "1"; // choice
  "speedometer-style": SpeedometerStyle = "fancy"; // choice
  "speedometer-metric": SpeedometerMetric = "engine"; // choice
  "szs-filename": string = ""; // arbitrary
  "szs-source": SZSSource = "automatic"; // choice
  "timeline-category": TimelineCategory = "notop10"; // choice
  "top-10-chadsoft": string = ""; // arbitrary
  "top-10-gecko-code-location-region": Top10GeckoCodeLocationRegion = "worldwide"; // choice
  "top-10-gecko-code-contents": string = ""; // arbitrary
  "top-10-gecko-code-filename": string = ""; // arbitrary
  "top-10-gecko-code-unsaved": boolean = false; // internal
  "top-10-highlight-enable": boolean = true; // checkbox
  "top-10-highlight": number = 1; // number
  "top-10-location-country-location": Top10LocationCountry = "Abkhazia"; // choice
  "top-10-location-region": Top10LocationRegion = "worldwide"; // choice
  "top-10-location-regional-location": Top10LocationRegional = "Europe"; // choice
  "top-10-title": string = ""; // arbitrary
  "top-10-title-type": Top10TitleType = "auto"; // choice
  "track-name": string = DEBUG_PREFILLED_DEFAULTS ? "Mario Circuit" : ""; // arbitrary
  "track-name-type": TrackNameType = "auto"; // choice
  "use-ffv1": boolean = false; // checkbox
  "video-codec": VideoCodec = "libx264"; // choice
  "youtube-settings": boolean = true; // checkbox
}

class AutoTTRecArgsClass {
  "aspect-ratio-16-by-9"?: AspectRatio16By9 = "true";
  "audio-bitrate"?: number | string = 128000;
  "audio-codec"?: AudioCodec = "libopus";
  "chadsoft-comparison-ghost-page"?: string = "";
  "chadsoft-ghost-page"?: string = "";
  "chadsoft-read-cache"?: boolean = true;
  "chadsoft-write-cache"?: boolean = true;
  "chadsoft-cache-expiry"?: string = "24h";
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
  "form-complexity"?: FormComplexity = FormComplexity.ALL;
  "game-volume"?: number = 1.0;
  "h26x-preset"?: H26xPreset = "slow";
  "hq-textures"?: boolean = true;
  "input-display"?: InputDisplay = "auto";
  "input-display-dont-create"?: boolean = false;
  "iso-filename"?: string = "";
  "keep-window"?: boolean = true;
  "main-ghost-filename"?: string = "";
  "mk-channel-ghost-description"?: string = "";
  "music-filename"?: string = "";
  "music-volume"?: number = 1.0;
  "no-background-blur"?: boolean = true;
  "no-bloom"?: boolean = false;
  "no-music"?: boolean = false;
  "no-music-mkchannel"?: boolean = false;
  "on-200cc"?: boolean = false;
  "output-video-filename"?: string = "";
  "output-width"?: number = 2560;
  "output-width-custom"?: never;
  "pixel-format"?: string = "yuv420p";
  "set-200cc"?: never;
  "speedometer"?: SpeedometerStyle = "fancy";
  "speedometer-style"?: never;
  "speedometer-decimal-places"?: SpeedometerDecimalPlacesNumeric = 1;
  "speedometer-decimal-places-str"?: never;
  "speedometer-metric"?: SpeedometerMetric = "engine";
  "start-music-at-beginning"?: boolean = false;
  "szs-filename"?: string = "";
  "timeline"?: Timeline = "mkchannel";
  "top-10-chadsoft"?: string = "";
  "top-10-gecko-code-filename"?: string = "";
  "top-10-highlight"?: number = 1;
  "top-10-location"?: Top10LocationFull = "worldwide";
  "top-10-title"?: string = "";
  "track-name"?: string = "";
  "use-ffv1"?: boolean = false;
  "video-codec"?: VideoCodec = "libx264";
  "youtube-settings"?: boolean = true;
}

type BooleanFILLME = boolean | "<FILLME>";

type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

type IsChoiceType<T, U extends T = T> =
    (Exclude<T, "<FILLME>"> extends string ?
    (U extends Exclude<T, "<FILLME>"> ? false : true)
        : never) extends false ? false : true

//type NonNullable<T> = {[P in keyof T]: Exclude<T[P], null>};

export type PartialFILLME<T> = {
  [P in keyof T]: IfEquals<T[P], number, number, T[P] | "<FILLME>">;
};

interface AutoTTRecConfigFormFieldTypesNoFILLME extends AutoTTRecConfigFormFieldTypesNoFILLMEClass {};
export type AutoTTRecConfigFormFields = PartialFILLME<AutoTTRecConfigFormFieldTypesNoFILLME>;
type AutoTTRecConfigFormFieldName = keyof AutoTTRecConfigFormFields;

type AutoTTRecConfigFormPrimitiveArgs<T> = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?:
    IfEquals<AutoTTRecConfigFormFields[K], T, K, never>
}[AutoTTRecConfigFormFieldName]>;

type AutoTTRecConfigFormStringArgs = AutoTTRecConfigFormPrimitiveArgs<string | "<FILLME>">;
type AutoTTRecConfigFormStringArgName = keyof AutoTTRecConfigFormStringArgs;
type AutoTTRecConfigFormSharedStringArgName = AutoTTRecConfigFormStringArgName & AutoTTRecArgName;

type AutoTTRecConfigFormNumberArgs = AutoTTRecConfigFormPrimitiveArgs<number>;
type AutoTTRecConfigFormNumberArgName = keyof AutoTTRecConfigFormNumberArgs;
type AutoTTRecConfigFormSharedNumberArgName = AutoTTRecConfigFormNumberArgName & AutoTTRecArgName;

type AutoTTRecConfigFormBooleanArgs = AutoTTRecConfigFormPrimitiveArgs<boolean | "<FILLME>">;
type AutoTTRecConfigFormBooleanArgName = keyof AutoTTRecConfigFormBooleanArgs;
type AutoTTRecConfigFormSharedBooleanArgName = AutoTTRecConfigFormBooleanArgName & AutoTTRecArgName;

type AutoTTRecConfigFormChoiceArgs = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?: IsChoiceType<AutoTTRecConfigFormFields[K]> extends true ? K : never
}[AutoTTRecConfigFormFieldName]>;
type AutoTTRecConfigFormChoiceArgNames = keyof AutoTTRecConfigFormChoiceArgs;
type AutoTTRecConfigFormSharedChoiceArgNames = AutoTTRecConfigFormChoiceArgNames & AutoTTRecArgName;

const autoTTRecConfigFormFieldTypesClassObj = new AutoTTRecConfigFormFieldTypesNoFILLMEClass();

type AutoTTRecConfigFormFieldNamesArray = Array<AutoTTRecConfigFormFieldName>;

export const DEFAULT_FORM_VALUES: AutoTTRecConfigFormFieldTypesNoFILLME = autoTTRecConfigFormFieldTypesClassObj as AutoTTRecConfigFormFieldTypesNoFILLME;

export const AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES = Object.keys(autoTTRecConfigFormFieldTypesClassObj) as AutoTTRecConfigFormFieldNamesArray;

const AUTO_TT_REC_TOP_10_LOCATIONS = makeReadonlyArraySet(["ww", "worldwide", ...countryLocations, ...regionalLocations] as const);
type Top10LocationFull = ValidValues<typeof AUTO_TT_REC_TOP_10_LOCATIONS>;

function isInSet<T>(values: ReadonlySet<T>, x: any): x is T {
  return values.has(x);
}

function isFILLMEOrEmptyOrNull(x: any): x is "<FILLME>" | "" | null {
  return x === null || x === "" || x === "<FILLME>";
}

function deleteFromSet<T>(values: Set<T>, x: any): boolean {
  return values.delete(x);
}

export type ExcludeFILLME<T> = {
  [P in keyof T]: Exclude<T[P], "<FILLME>">;
}

export type PartialNull<T> = {
  [P in keyof T]?: T[P] | null;
};

type AutoTTRecConfigFormFieldsPartialNull = PartialNull<AutoTTRecConfigFormFields>;
type AutoTTRecConfigFormFieldsPartial = Partial<AutoTTRecConfigFormFields>;

type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<T[P]> };

export type DoesSomething<T> = {
  [P in keyof T]: T[P] | null;
}

type BothGhostSource = MainGhostSource | ComparisonGhostSource;

export type AutoTTRecConfigFormFieldTypesWithoutFILLME = ExcludeFILLME<AutoTTRecConfigFormFields>;
export type PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = Partial<AutoTTRecConfigFormFieldTypesWithoutFILLME>;
export type AutoTTRecArgsWithFILLME = PartialFILLME<AutoTTRecArgs>;

const autoTTRecArgsClassObj = new AutoTTRecArgsClass();

interface AutoTTRecArgsWithoutNulls extends AutoTTRecArgsClass {}
export type AutoTTRecArgs = PartialNull<AutoTTRecArgsWithoutNulls>;
type AutoTTRecArgNamesType = Array<keyof AutoTTRecArgs>;

type AutoTTRecArgName = keyof AutoTTRecArgs;

const GHOST_AUTO_ARG_NAMES = makeReadonlyArraySet(["main-ghost-auto", "comparison-ghost-auto"] as const);
const UNSUPPORTED_ARG_NAMES = makeReadonlyArraySet(["top-10-censors", "ending-message", "dolphin-volume", "unbuffered-output"] as const);
const OTHER_EXTENDED_ONLY_ARG_NAMES = makeReadonlyArraySet(["no-200cc"] as const);
const AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY = makeReadonlyArraySet([...GHOST_AUTO_ARG_NAMES.arr, ...UNSUPPORTED_ARG_NAMES.arr, ...OTHER_EXTENDED_ONLY_ARG_NAMES.arr] as const);

type AutoTTRecExtendedOnlyArgName = ValidValues<typeof AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY>;
type AutoTTRecUnsupportedArgName = ValidValues<typeof UNSUPPORTED_ARG_NAMES>;
type GhostAutoArgName = ValidValues<typeof GHOST_AUTO_ARG_NAMES>;

const AUTO_TT_REC_ARG_NAMES = makeReadonlyArraySet(Object.keys(autoTTRecArgsClassObj) as AutoTTRecArgNamesType);

const AUTO_TT_REC_ARG_NAMES_EXTENDED = makeReadonlyArraySet([
    ...AUTO_TT_REC_ARG_NAMES.arr,
    ...AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY.arr] as const);

type AutoTTRecArgNameExtended = ValidValues<typeof AUTO_TT_REC_ARG_NAMES_EXTENDED>;
type AutoTTRecArgExtendedAndFormFieldName = AutoTTRecArgNameExtended | AutoTTRecConfigFormFieldName;

export interface AutoTTRecConfigImporterError {
  option: AutoTTRecArgName,
  messages: string[]
}

type AutoTTRecPrimitiveArgs = Pick<AutoTTRecArgs, {
  [K in keyof AutoTTRecArgs]-?:
    IfEquals<AutoTTRecArgs[K], (string | undefined | null), K,
      IfEquals<AutoTTRecArgs[K], (number | undefined | null), K,
        IfEquals<AutoTTRecArgs[K], (boolean | undefined | null), K, never>
      >
    >
}[keyof AutoTTRecArgs]>;

interface AutoTTRecConfigImporterErrorOrWarningMessage {
  isWarning: boolean,
  message: string
}

const listFormatter = new Intl.ListFormat("en", {style: "long", type: "disjunction"});

class AutoTTRecConfigErrorsAndWarnings {
  private _errorsAndWarnings: Map<AutoTTRecArgExtendedAndFormFieldName, AutoTTRecConfigImporterErrorOrWarningMessage[]>;
  private _errorsAndWarningsInvalidCommands: Map<string, AutoTTRecConfigImporterErrorOrWarningMessage[]>;

  constructor() {
    this._errorsAndWarnings = new Map();
    this._errorsAndWarningsInvalidCommands = new Map();
  }

  private addToErrorsWarningMap<K extends string, M extends Map<K, AutoTTRecConfigImporterErrorOrWarningMessage[]>>(name: K, message: string, isWarning: boolean, errorsAndWarnings: M) {
    let errorsAndWarningsForName = errorsAndWarnings.get(name);
    if (errorsAndWarningsForName === undefined) {
      errorsAndWarningsForName = [];
      errorsAndWarnings.set(name, errorsAndWarningsForName);
    }

    errorsAndWarningsForName.push({
      isWarning: isWarning,
      message: message
    });
  }

  private add(name: AutoTTRecArgExtendedAndFormFieldName, message: string, isWarning: boolean) {
    this.addToErrorsWarningMap(name, message, isWarning, this._errorsAndWarnings);
  }

  public addError(name: AutoTTRecArgExtendedAndFormFieldName, message: string) {
    this.add(name, message, false);
  }

  public addErrorWrongType(name: AutoTTRecArgExtendedAndFormFieldName, expectedTypes: string, value: string | number | boolean | null) {
    this.addError(name, `${name} should be a ${expectedTypes}, but got ${typeof value} instead. Option will be left empty.`);
  }

  public addInvalidChoiceError(name: AutoTTRecArgExtendedAndFormFieldName, validValues: ReadonlyArraySet<string>, actualValue: string, extraMessage: string = "") {
    this.addError(name, `${name} should be one of ${listFormatter.format(validValues.arr)}, but got ${actualValue} instead.${extraMessage}`);
  }

  public addWarning(name: AutoTTRecArgExtendedAndFormFieldName, message: string) {
    this.add(name, message, true);
  }

  public addErrorInvalidCommand(name: string) {
    this.addToErrorsWarningMap(name, "Not a valid auto-tt-recorder command.", false, this._errorsAndWarningsInvalidCommands);
  }
}

const ghostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html/;

class AutoTTRecConfigPreprocessor {
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;
  private autoTTRecConfigImporter: AutoTTRecConfigImporter | null;
  private autoTTRecConfigFilename: string;

  constructor(autoTTRecConfig: AutoTTRecConfig, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings, autoTTRecConfigFilename: string) {
    this.autoTTRecConfigImporter = null;
    this.autoTTRecConfig = shallowCopy(autoTTRecConfig);
    this.errorsAndWarnings = errorsAndWarnings;
    this.autoTTRecConfigFilename = autoTTRecConfigFilename;
  }

  private isAutoTTRecArgValueString_ignoreOnNullOrEmpty<K extends AutoTTRecArgNameExtended>(argName: K): string {
    let value = this.autoTTRecConfig[argName];
    if (value === null || value === "") {
      return "";
    } else {
      if (typeof value === "string") {
        return value;
      } else {
        this.errorsAndWarnings.addError(argName, `${argName} should be a string, but got ${typeof value} instead.`);
        return "";
      }
    }
  }

  private isAutoTTRecArgValueBoolean_ignoreNull<K extends AutoTTRecArgNameExtended>(argName: K): (boolean | null) {
    let value = this.autoTTRecConfig[argName];
    if (value === null) {
      return null;
    } else {
      if (typeof value === "boolean") {
        return value;
      } else {
        this.errorsAndWarnings.addError(argName, `${argName} should be a boolean, but got ${typeof value} instead.`);
        return null;
      }
    }
  }
  
  public preprocess() {
    if (this.autoTTRecConfigImporter === null) {
      this.findInvalidNamesAndFillInMissing();
      this.convertGhostAuto("main-ghost-auto", "main-ghost-filename", "chadsoft-ghost-page");
      this.convertGhostAuto("comparison-ghost-auto", "comparison-ghost-filename", "chadsoft-comparison-ghost-page");
      this.convertNo200cc();
      this.fixAspectRatio16By9Type();
      this.convertStringOrNumArgToString("chadsoft-cache-expiry");
      this.convertStringOrNumArgToString("speedometer-decimal-places", "speedometer-decimal-places-str");
      this.convertDifferingArgNames();
      for (const unsupportedArgName of UNSUPPORTED_ARG_NAMES.arr)  {
        this.warnUnsupportedArg(unsupportedArgName);
      }
      this.autoTTRecConfigImporter = new AutoTTRecConfigImporter(this.autoTTRecConfig, this.errorsAndWarnings, this.autoTTRecConfigFilename);
    }

    return this.autoTTRecConfigImporter;
  }
  
  private findInvalidNamesAndFillInMissing() {
    let missingAutoTTRecArgNames = new Set([...AUTO_TT_REC_ARG_NAMES_EXTENDED.arr]);

    for (const [name, value] of Object.entries(this.autoTTRecConfig)) {
      let isAutoTTRecArgName = deleteFromSet(missingAutoTTRecArgNames, name);
      if (isAutoTTRecArgName) {
        if (typeof value === "string" && value.startsWith("<FILLME") && value.charAt(value.length - 1) == ">") {
          this.autoTTRecConfig[name] = "<FILLME>";
        } else {
          this.autoTTRecConfig[name] = value;
        }  
      } else {
        this.errorsAndWarnings.addErrorInvalidCommand(name);
      }
    }

    missingAutoTTRecArgNames.forEach((autoTTRecArgName) => {
      this.autoTTRecConfig[autoTTRecArgName] = null;
    });
  }

  private convertGhostAuto(ghostAutoOptionName: GhostAutoArgName,
    ghostFilenameOptionName: "main-ghost-filename" | "comparison-ghost-filename",
    ghostLinkOptionName: "chadsoft-ghost-page" | "chadsoft-comparison-ghost-page"
  ) {
    let ghostAutoValue = this.isAutoTTRecArgValueString_ignoreOnNullOrEmpty(ghostAutoOptionName);
    
    if (ghostAutoValue !== "") {
      let isGhostFilenameOptionValueOverridable = isFILLMEOrEmptyOrNull(this.autoTTRecConfig[ghostFilenameOptionName]);
      let isGhostLinkOptionValueOverridable = isFILLMEOrEmptyOrNull(this.autoTTRecConfig[ghostLinkOptionName]);

      if (!isGhostFilenameOptionValueOverridable && !isGhostLinkOptionValueOverridable) {
        this.errorsAndWarnings.addError(ghostAutoOptionName, `${ghostAutoOptionName} cannot be specified if ${ghostFilenameOptionName} and ${ghostLinkOptionName} are not <FILLME>, "", or null/unspecified. Option will be ignored.`);
      } else {
        if (ghostAutoValue === "<FILLME>") {
          this.autoTTRecConfig[ghostFilenameOptionName] = "<FILLME>";
          this.autoTTRecConfig[ghostLinkOptionName] = "<FILLME>";
        } else if (ghostAutoValue.match(ghostPageLinkRegex)) {
          this.autoTTRecConfig[ghostLinkOptionName] = ghostAutoValue;
        } else {
          this.autoTTRecConfig[ghostFilenameOptionName] = ghostAutoValue;
        }
      }
    }
  }

  private convertNo200cc() {
    let no200cc = this.isAutoTTRecArgValueBoolean_ignoreNull("no-200cc");
    if (no200cc !== null) {
      let on200cc = this.autoTTRecConfig["on-200cc"];
      if (on200cc !== null) {
        if (typeof on200cc === "boolean") {
          if (on200cc && no200cc) {
            this.errorsAndWarnings.addError("no-200cc", "no-200cc cannot be true if on-200cc is true. Option will be ignored.");
          } else {
            this.autoTTRecConfig["on-200cc"] = !no200cc;
          }
        } else {
          this.errorsAndWarnings.addError("no-200cc", "no-200cc cannot be specified if on-200cc is not a boolean (true/false). Option will be ignored.");
        }
      } else {
        this.autoTTRecConfig["on-200cc"] = !no200cc;
      }
      this.autoTTRecConfig["set-200cc"] = this.autoTTRecConfig["on-200cc"] ? "on-200cc" : "no-200cc";
    }
  }

  private fixAspectRatio16By9Type() {
    let aspectRatio16By9 = this.autoTTRecConfig["aspect-ratio-16-by-9"];
    if (aspectRatio16By9 !== null && aspectRatio16By9 !== "<FILLME>") {
      if (typeof aspectRatio16By9 === "string") {
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = aspectRatio16By9.toLowerCase();
      } else if (typeof aspectRatio16By9 === "boolean") {
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = aspectRatio16By9.toString().toLowerCase();
      } else {
        this.errorsAndWarnings.addErrorWrongType("aspect-ratio-16-by-9", "string or boolean", aspectRatio16By9);
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = "<FILLME>";
      }
    }
  }

  private convertStringOrNumArgToString(stringOrNumArgName: "chadsoft-cache-expiry" | "speedometer-decimal-places", newArgName?: "speedometer-decimal-places-str") {
    let stringOrNumArgValue = this.autoTTRecConfig[stringOrNumArgName];
    if (stringOrNumArgValue !== null && stringOrNumArgValue !== "<FILLME>") {
      if (typeof stringOrNumArgValue !== "string") {
        let destArgName: typeof stringOrNumArgName | Exclude<typeof newArgName, undefined>
        if (newArgName === undefined) {
          destArgName = stringOrNumArgName;
        } else {
          destArgName = stringOrNumArgName;
        }
        if (typeof stringOrNumArgValue === "number") {
          this.autoTTRecConfig[destArgName] = stringOrNumArgValue.toString();
        } else {
          this.errorsAndWarnings.addErrorWrongType(stringOrNumArgName, "string or number", stringOrNumArgValue);
          this.autoTTRecConfig[destArgName] = "<FILLME>";
        }
      }
    }
  }

  private convertDifferingArgNames() {
    this.autoTTRecConfig["speedometer-style"] = this.autoTTRecConfig["speedometer"];
    this.autoTTRecConfig["output-width-custom"] = this.autoTTRecConfig["output-width"];
  }

  private warnUnsupportedArg(autoTTRecUnsupportedArgName: AutoTTRecUnsupportedArgName) {
    if (this.autoTTRecConfig[autoTTRecUnsupportedArgName] !== null) {
      this.errorsAndWarnings.addWarning(autoTTRecUnsupportedArgName, `${autoTTRecUnsupportedArgName} is not currently supported, will be ignored.`);
    }
  }
}

class AutoTTRecConfigImporter {
  private formData: AutoTTRecConfigFormFieldsPartial;
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;
  private configArgWasNullSet: Set<AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgNames | AutoTTRecConfigFormNumberArgName | AutoTTRecConfigFormBooleanArgName>;
  private autoTTRecConfigFilename: string;

  constructor(autoTTRecConfig: AutoTTRecConfig, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings, autoTTRecConfigFilename: string) {
    this.formData = {};
    this.autoTTRecConfig = autoTTRecConfig;
    this.errorsAndWarnings = errorsAndWarnings;
    this.configArgWasNullSet = new Set();
    this.autoTTRecConfigFilename = autoTTRecConfigFilename;
  }

  public addDefault<K extends AutoTTRecConfigFormFieldName>(key: K) {
    this.formData[key] = DEFAULT_FORM_VALUES[key];
  }

  public readArgSanityCheck<K extends AutoTTRecArgName>(key: K): string | number | boolean | null | undefined {
    let configValue = this.autoTTRecConfig[key];
    if (configValue === undefined) {
      this.errorsAndWarnings.addWarning(key, `${key} was not defined! (this is an error within the program itself and not your fault, please contact the developer!)`);
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

  private validateNumber_errorIfNot_handleUndefined<K extends AutoTTRecArgName>(key: K): number | null {
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
      this.errorsAndWarnings.addErrorWrongType(key, "number", value);
      return NaN;
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

  private validateSharedArgString_errorIfNot_handleUndefinedNull<K extends AutoTTRecConfigFormSharedStringArgName | AutoTTRecConfigFormSharedChoiceArgNames>(key: K) {
    let value = this.validateString_errorIfNot_handleUndefined(key);
    if (value === null) {
      this.configArgWasNullSet.add(key);
      return DEFAULT_FORM_VALUES[key];
    } else {
      return value;
    }
  }

  private getFormDataStringOrChoiceArg_nullIfWasNull<K extends AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgNames>(key: K): AutoTTRecConfigFormFields[K] | null {
    if (this.configArgWasNullSet.has(key)) {
      return null;
    } else {
      let value = this.formData[key];
      if (value === undefined) {
        this.errorsAndWarnings.addWarning(key, `formData["${key}"] was not defined! (this is an error within the program itself and not your fault, please contact the developer!)`);
        return null;
      } else {
        return value;        
      }
    }
  }

  private getFormDataStringOrChoice_verifyNotUndefined<K extends AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgNames>(key: K): AutoTTRecConfigFormFields[K] {
    let value = this.formData[key];
    if (value === undefined) {
      this.errorsAndWarnings.addWarning(key, `formData["${key}"] was not defined! (this is an error within the program itself and not your fault, please contact the developer!)`);
      this.formData[key] = "<FILLME>";
      return "<FILLME>";
    } else {
      return value;
    }
  }

  private getFormDataNumber_verifyNotUndefined<K extends AutoTTRecConfigFormSharedNumberArgName>(key: K): number {
    let value = this.formData[key];
    if (value === undefined) {
      this.errorsAndWarnings.addWarning(key, `formData["${key}"] is undefined! (this is an error within the program itself and not your fault, please contact the developer!)`);
      value = NaN;
      this.formData[key] = NaN;
    } else if (value === "<FILLME>") {
      this.errorsAndWarnings.addWarning(key, `formData["${key}"] is <FILLME>! (this is an error within the program itself and not your fault, please contact the developer!)`);
      value = NaN;
      this.formData[key] = NaN;
    }
    return value;
  }

  private stringOrChoiceArgWasNull<K extends AutoTTRecConfigFormSharedStringArgName | AutoTTRecConfigFormSharedChoiceArgNames>(key: K) {
    return this.configArgWasNullSet.has(key);
  }

  private importSharedStringArg<K extends AutoTTRecConfigFormSharedStringArgName>(key: K) {
    this.formData[key] = this.validateSharedArgString_errorIfNot_handleUndefinedNull(key);
  }

  private importSharedNumberArg<K extends AutoTTRecConfigFormSharedNumberArgName>(key: K) {
    let configValue = this.readArgSanityCheck(key);
    if (configValue !== undefined) {
      if (configValue === null) {
        this.configArgWasNullSet.add(key);
        this.addDefault(key);
      } else if (configValue === "<FILLME>") {
        this.formData[key] = NaN;
      } else if (typeof configValue === "number") {
        this.formData[key] = configValue;
      } else {
        this.errorsAndWarnings.addErrorWrongType(key, "number", configValue);
        this.formData[key] = NaN;
      }
    }
  }

  private importSharedBooleanArg<K extends AutoTTRecConfigFormSharedBooleanArgName>(key: K) {
    let configValue = this.readArgSanityCheck(key);
    if (configValue !== undefined) {
      if (configValue === null) {
        this.configArgWasNullSet.add(key);
        this.addDefault(key);
      } else if (configValue === "<FILLME>") {
        this.formData[key] = "<FILLME>";
      } else if (typeof configValue === "boolean") {
        this.formData[key] = configValue;
      } else {
        this.errorsAndWarnings.addErrorWrongType(key, "boolean", configValue);
        this.formData[key] = "<FILLME>";
      }
    }
  }

  private importSharedChoiceArg<K extends AutoTTRecConfigFormSharedChoiceArgNames, V extends ReadonlyArraySet<AutoTTRecConfigFormChoiceArgs[K]>>(key: K, validValues: V) {
    let configValue = this.readArgSanityCheck(key);
    if (configValue !== undefined) {
      if (configValue === null) {
        this.addDefault(key);
      } else if (configValue === "<FILLME>") {
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

  private setPathnameArgEnable_resolvePathname_returnOriginalFilename<K extends AutoTTRecConfigFormSharedStringArgName, L extends AutoTTRecConfigFormBooleanArgName>(pathnameArgName: K, enableArgName: L): [string, string] {
    let pathnameArgValue = this.getFormDataStringOrChoiceArg_nullIfWasNull(pathnameArgName);
    let pathnameAbsoluteArgValue: string;
    let enableArgValue: BooleanFILLME;
    if (pathnameArgValue === "") {
      enableArgValue = "<FILLME>";
    } else if (pathnameArgValue !== null) {
      enableArgValue = true;
    } else {
      enableArgValue = false;
    }

    this.formData[enableArgName] = enableArgValue;

    if (enableArgValue && typeof pathnameArgValue === "string") {
      if (path.isAbsolute(pathnameArgValue)) {
        pathnameAbsoluteArgValue = pathnameArgValue;
      } else {
        pathnameAbsoluteArgValue = path.resolve(path.dirname(this.autoTTRecConfigFilename), pathnameArgValue);
      }
    } else {
      pathnameAbsoluteArgValue = "";
      pathnameArgValue = "";
    }

    return [pathnameAbsoluteArgValue, pathnameArgValue];
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
    let musicFilename = this.validateSharedArgString_errorIfNot_handleUndefinedNull("music-filename");
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
    let timelineCategory: TimelineCategory;
    let noTop10Category: NoTop10Category;

    if (timeline === "top10") {
      let top10Chadsoft = this.getFormDataStringOrChoiceArg_nullIfWasNull("top-10-chadsoft");
      let top10GeckoCodeFilename = this.getFormDataStringOrChoiceArg_nullIfWasNull("top-10-gecko-code-filename");
      if (top10Chadsoft === "") {
        timelineCategory = "top10chadsoft";
      } else if (top10GeckoCodeFilename === "") {
        timelineCategory = "top10gecko";
      } else if (top10Chadsoft !== null) {
        timelineCategory = "top10chadsoft";
      } else if (top10GeckoCodeFilename !== null) {
        timelineCategory = "top10gecko";
      } else {
        timelineCategory = "top10chadsoft";
        this.errorsAndWarnings.addError("timeline", "timeline was specified as top10 but neither top-10-chadsoft nor top-10-gecko-code-filename were specified! Defaulting to top10chadsoft.");
      }
      noTop10Category = "mkchannel";
    } else {
      timelineCategory = "notop10";
      if (timeline !== null) {
        if (isInSet(NO_TOP_10_CATEGORIES.set, timeline)) {
          noTop10Category = timeline;
        } else {
          noTop10Category = "mkchannel";
          if (timeline === "") {
            this.errorsAndWarnings.addError("timeline", "Timeline cannot be empty or <FILLME>! Defaulting to mkchannel.");
          }
          this.errorsAndWarnings.addInvalidChoiceError("timeline", TIMELINES, timeline, " Defaulting to mkchannel.");
        }
      } else {
        this.errorsAndWarnings.addWarning("timeline", "timeline was unspecified/null, defaulting to mkchannel.");
        noTop10Category = "mkchannel";
      }
    }
    this.formData["timeline-category"] = timelineCategory;
    this.formData["no-top-10-category"] = noTop10Category;
  }

  private setTop10HighlightEnable() {
    let top10Highlight = this.getFormDataNumber_verifyNotUndefined("top-10-highlight");
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

    let ghostPageValue = this.getFormDataStringOrChoiceArg_nullIfWasNull(ghostPageArgName);
    let ghostFilenameValue = this.getFormDataStringOrChoiceArg_nullIfWasNull(ghostFilenameArgName);
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
        let timelineCategory = this.getFormDataStringOrChoiceArg_nullIfWasNull("timeline-category");
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
    let encodeSize = this.getFormDataNumber_verifyNotUndefined("encode-size");
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
    let [extraGeckoCodesAbsoluteFilename, extraGeckoCodesFilename] = this.setPathnameArgEnable_resolvePathname_returnOriginalFilename("extra-gecko-codes-filename", "extra-gecko-codes-enable");

    if (extraGeckoCodesAbsoluteFilename !== "") {
      let extraGeckoCodesContents: string = "";
      try {
        extraGeckoCodesContents = await readFileEnforceUTF8(extraGeckoCodesAbsoluteFilename, "Not a valid text file!");
      } catch (eAsAny) {
        let e: NodeJS.ErrnoException  = (eAsAny as NodeJS.ErrnoException);
        let errorMessageReason: string;
        if (e.code === "ENOENT") {
          errorMessageReason = "File does not exist!";
        } else {
          errorMessageReason = e.message;
        }

        let errorMessage: string = `Error occurred when reading extra-gecko-codes-filename ${extraGeckoCodesFilename}: ${errorMessageReason}`;
        this.errorsAndWarnings.addError("extra-gecko-codes-filename", errorMessage);
        extraGeckoCodesAbsoluteFilename = "";
      }
      this.formData["extra-gecko-codes-contents"] = extraGeckoCodesContents;
      this.formData["extra-gecko-codes-filename"] = extraGeckoCodesAbsoluteFilename;
    }
  }

  private resolveHQTexturesFolderAndSetHQTexturesFolderEnable() {
    let [extraHQTexturesAbsoluteFolder, extraHQTexturesFolder] = this.setPathnameArgEnable_resolvePathname_returnOriginalFilename("extra-hq-textures-folder", "extra-hq-textures-folder-enable");
    if (extraHQTexturesAbsoluteFolder !== "") {
      this.formData["extra-hq-textures-folder"] = extraHQTexturesAbsoluteFolder;
    }
  }

  private importVolume(
    volumeArgName: "game-volume" | "music-volume",
    volumeNumberInputArgName: "game-volume-numberinput" | "music-volume-numberinput",
    volumeSliderArgName: "game-volume-slider" | "music-volume-slider"
  ) {
    let volumeArgValue = this.validateNumber_errorIfNot_handleUndefined(volumeArgName);
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
        let noTop10Category = this.getFormDataStringOrChoiceArg_nullIfWasNull("no-top-10-category");
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

    this.formData["output-video-file-format"] = outputVideoFileFormat;
    this.formData["video-codec"] = videoCodec;
  }

  public import() {
    this.importStraightCopyArgs();

    
    
    // add in main ghost
    this.tryAddSameOption("chadsoft-ghost-page");
    this.tryAddSameOption("main-ghost-filename");
    this.tryAddGhostAuto("main-ghost-auto", "main-ghost-filename", "chadsoft-ghost-page");

    // add in comparison ghost
    this.tryAddSameOption("chadsoft-comparison-ghost-page");
    this.tryAddSameOption("comparison-ghost-filename");
    this.tryAddGhostAuto("comparison-ghost-auto", "comparison-ghost-filename", "chadsoft-comparison-ghost-page");

    this.tryAddSameOption("iso-filename");
    this.tryAddSameOption("szs-filename");
    this.tryAddSameOption("output-video-filename");

    this.tryAddSameOption("on-200cc");
    let no200cc = this.autoTTRecConfig["no-200cc"];

    if (no200cc !== null && no200cc !== undefined) {
      if (typeof no200cc === "boolean") {
        this.add("on-200cc" as AnyFIXME, !no200cc);
      } else {
        this.addErrorExtended("no-200cc", `no-200cc should be a boolean, but got ${typeof no200cc} instead.`);
      }
    } else if (no200cc === undefined) {
      this.add("on-200cc" as AnyFIXME, undefined);
    }

    this.tryAddSameOptionComplex("timeline", TIMELINES);
    this.tryAddSameOption("mk-channel-ghost-description");
    this.tryAddSameOption("track-name");
    this.tryAddSameOption("top-10-chadsoft");
    this.tryAddSameOptionComplex("top-10-location", AUTO_TT_REC_TOP_10_LOCATIONS);
    this.tryAddSameOption("top-10-highlight");
    if (this.autoTTRecConfig["top-10-censors"] !== null) {
      this.addWarningExtended("top-10-censors", "top-10-censors currently not supported!");
    }

    this.tryAddSameOption("top-10-gecko-code-filename");
    this.tryAddSameOption("no-music");
    this.tryAddSameOption("music-filename");
    this.tryAddSameOption("game-volume");
    this.tryAddSameOption("music-volume");
    this.tryAddSameOption("start-music-at-beginning");
    this.tryAddSameOption("no-music-mkchannel");
    this.tryAddSameOptionComplex("input-display", INPUT_DISPLAYS);
    this.tryAddSameOptionComplex("speedometer", SPEEDOMETER_STYLES2);
    this.tryAddSameOptionComplex("speedometer-metric", SPEEDOMETER_METRICS)
    this.tryAddSameOptionComplex("speedometer-decimal-places", SPEEDOMETER_DECIMAL_PLACES_NUMERIC);
    if (this.autoTTRecConfig["ending-message"] !== null) {
      this.addWarningExtended("ending-message", "ending-message currently not supported!");
    }
    this.tryAddSameOption("fade-in-at-start");
    this.tryAddSameOption("ending-delay");
    this.tryAddSameOptionComplex("dolphin-resolution", DOLPHIN_RESOLUTIONS);
    this.tryAddSameOption("no-background-blur");
    this.tryAddSameOption("no-bloom");
    this.tryAddSameOption("hq-textures");
    this.tryAddSameOption("extra-hq-textures-folder");
    this.tryAddSameOption("use-ffv1");
    this.tryAddSameOptionComplex("encode-type", ENCODE_TYPES);
    this.tryAddSameOption("crf-value");
    this.tryAddSameOptionComplex("h26x-preset", H26X_PRESETS);
    this.tryAddSameOptionComplex("video-codec", VIDEO_CODECS);
    this.tryAddSameOptionComplex("audio-codec", AUDIO_CODECS);
    this.tryAddSameOption("encode-size");

    let audioBitrate = this.autoTTRecConfig["audio-bitrate"];
    if (audioBitrate !== null && audioBitrate !== undefined) {
      if (typeof audioBitrate === "string" || typeof audioBitrate === "number") {
        this.add("audio-bitrate", audioBitrate as AnyFIXME);
        //if (audioBitrate.charAt(audioBitrate.length - 1) == "k") {
        //  audioBitrateAsNum = Number(audioBitrate.substring(0, audioBitrate.length - 1));
        //  if (!Number.isNaN(audioBitrateAsNum)) {
        //    this.add("audio-bitrate", )
        //   } else {
        //    this.addError("audio-bitrate", `audio-bitrate has invalid kbps ("k") format.`);
        //  }
        //} else {
        //  this.addError("audio-bitrate", `audio-bitrate is a string but not in kbps ("k") format.`);
        //}
      } else {
        this.addError("audio-bitrate", `audio-bitrate should be a string or number, but got a ${typeof audioBitrate} instead.`);
      }
    } else {
      this.add("audio-bitrate", audioBitrate as AnyFIXME);
    }

    this.tryAddSameOption("pixel-format");
    this.tryAddSameOption("output-width");

    let aspectRatio16By9 = this.autoTTRecConfig["aspect-ratio-16-by-9"];
    if (aspectRatio16By9 !== null && aspectRatio16By9 !== undefined) {
      if (typeof aspectRatio16By9 === "boolean" || typeof aspectRatio16By9 === "string") {
        let aspectRatio16By9AsStr: string;
        if (typeof aspectRatio16By9 === "boolean") {
          aspectRatio16By9AsStr = aspectRatio16By9.toString();
        } else {
          aspectRatio16By9AsStr = aspectRatio16By9;
        }
        aspectRatio16By9AsStr = aspectRatio16By9AsStr.toLowerCase();
        if (isInSet(ASPECT_RATIO_16_BY_9_VALUES.set, aspectRatio16By9AsStr)) {
          this.add("aspect-ratio-16-by-9", aspectRatio16By9AsStr);
        } else {
          this.addError("aspect-ratio-16-by-9", "aspect-ratio-16-by-9 should be one of true, false, or auto");
        }
      } else {
        this.addError("aspect-ratio-16-by-9", `aspect-ratio-16-by-9 should be a string or number, but got a ${typeof aspectRatio16By9} instead.`);
      }
    } else {
      this.add("aspect-ratio-16-by-9", aspectRatio16By9 as AnyFIXME);
    }

    this.tryAddSameOption("youtube-settings");
    this.tryAddSameOption("extra-gecko-codes-filename");

    this.tryAddSameOption("keep-window");
    this.tryAddSameOption("encode-only");
    if (this.autoTTRecConfig["dolphin-volume"] !== null) {
      this.addWarningExtended("dolphin-volume", "dolphin-volume currently not supported!");
    }
    this.tryAddSameOption("input-display-dont-create");
  }

  public createFormDataConverter() {
    return new AutoTTRecConfigToFormData(this.autoTTRecArgs);
  }
}

class AutoTTRecConfigToFormData {
  private autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFields;

  constructor(autoTTRecArgs: AutoTTRecArgs) {
    this.autoTTRecArgs = autoTTRecArgs;
    this.formData = {...autoTTRecConfigFormFieldTypesClassObj} as AnyFIXME;
  }

    // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends AutoTTRecConfigFormFieldName & keyof AutoTTRecArgs, V extends AutoTTRecArgs[K] & AutoTTRecConfigFormFields[K]>(key: K) {
    let value = this.autoTTRecArgs[key];
    if (value !== null && value !== undefined) {
      //let value2 = value;
      //let oldFormData = this.formData[key];
      this.formData[key] = value as AnyFIXME;
    }
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends AutoTTRecConfigFormFieldName>(key: K, value: AutoTTRecConfigFormFields[K] | null | undefined) {
    let nonNullValue: AutoTTRecConfigFormFields[K];
    if (value === null) {
      nonNullValue = DEFAULT_FORM_VALUES[key];
    } else if (value === undefined) {
      nonNullValue = "<FILLME>" as AnyFIXME;
    } else {
      nonNullValue = value;
    }
    this.formData[key] = nonNullValue;
  }

  public convert() {
    this.addManual("aspect-ratio-16-by-9", this.autoTTRecArgs["aspect-ratio-16-by-9"]);
    //this.formData["aspect-ratio-16-by-9"] = ;
  }
}

export function importAutoTTRecConfig(autoTTRecConfig: AutoTTRecConfig) {
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();
  let autoTTRecConfigPreprocessor = new AutoTTRecConfigPreprocessor(autoTTRecConfig, errorsAndWarnings, "");
  let autoTTRecConfigImporter = autoTTRecConfigPreprocessor.preprocess();
  autoTTRecConfigImporter.import();

  //let toFormDataConverter: AutoTTRecConfigToFormData = autoTTRecConfigImporter.createFormDataConverter();
  

    //autoTTRecArgs["chadsoft-ghost-page"] = 
  
}


function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFields;

  constructor(formData: AutoTTRecConfigFormFields) {
    this._autoTTRecArgs = {};
    this.formData = formData;
  }

  // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends AutoTTRecConfigFormFieldName & AutoTTRecArgName>(key: K) {
    this._autoTTRecArgs[key] = this.formData[key];
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends AutoTTRecArgName>(key: K, value: AutoTTRecArgs[K]) {
    this._autoTTRecArgs[key] = value;
  }

  public get autoTTRecArgs() {
    return this._autoTTRecArgs;
  }
}

class AutoTTRecFormData {
  private _formData: AutoTTRecConfigFormFields;
  private _extendedTimeline: ExtendedTimeline;
  private _formComplexity: FormComplexity;
  private _isOnMKChannel: boolean;

  constructor(formData: AutoTTRecConfigFormFields) {
    this._formData = shallowCopy(formData);
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
      this.formData["output-width-preset"] = recommendedOutputWidths[this.formData["dolphin-resolution"]];
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

function excludeFILLMEFromAutoTTRecConfigFormData(formData: AutoTTRecConfigFormFields) {
  let formDataNoFILLMEPartial: PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = {};

  //export type AutoTTRecConfigFormFieldTypesWithoutFILLME = ExcludeFILLME<AutoTTRecConfigFormFields>;
  //export type PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = Partial<AutoTTRecConfigFormFieldTypesWithoutFILLME>;
  
}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFields) {
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
