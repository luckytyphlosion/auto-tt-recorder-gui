import React from "react";

import { EncodeSizeUnit } from "./components/form_components/EncodeSizeInput";

import { MainGhostSource } from "./components/form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "./components/form_components/ComparisonGhostSourceInput";
import { SZSSource } from "./components/form_components/SZSSourceInput";
import { Top10LocationRegion } from "./components/form_components/Top10LocationInput";

import { Top10LocationCountry, countryLocations } from "./components/form_components/Top10LocationCountryInput";
import { Top10LocationRegional, regionalLocations } from "./components/form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "./components/form_components/BackgroundMusicSourceInput";

import { InputDisplay, INPUT_DISPLAYS } from "./components/form_components/InputDisplayInput";
import { SpeedometerStyle, SPEEDOMETER_STYLES, SPEEDOMETER_STYLES2 } from "./components/form_components/SpeedometerInput";
import { SpeedometerMetric, SPEEDOMETER_METRICS } from "./components/form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces, SpeedometerDecimalPlacesNumeric, SPEEDOMETER_DECIMAL_PLACES_NUMERIC } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { EncodeType, ENCODE_TYPES } from "./components/layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat } from "./components/form_components/OutputVideoFileFormatInput";
import { VideoCodec, VIDEO_CODECS } from "./components/form_components/VideoCodecInput";

import { DolphinResolution, DOLPHIN_RESOLUTIONS } from "./components/form_components/DolphinResolutionInput";
import { AudioCodec, AUDIO_CODECS } from "./components/form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit } from "./components/form_components/AudioBitrateInput";

import { H26xPreset, H26X_PRESETS } from "./components/form_components/H26xPresetInput";
import { OutputWidthPreset, recommendedOutputWidths } from "./components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9, ASPECT_RATIO_16_BY_9_VALUES } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "./components/form_components/Top10TitleInput";

import { Set200cc } from "./components/form_components/Set200ccInput";

import { AutoTTRecConfig } from "../shared-types";

import { ValidValues, ReadonlyArraySet, makeReadonlyArraySet } from "./array-set";

const TIMELINES = makeReadonlyArraySet(["noencode", "ghostonly", "ghostselect", "mkchannel", "top10"] as const);
export type Timeline = ValidValues<typeof TIMELINES>;

export type ExtendedTimeline = "noencode" | "ghostonly" | "ghostselect" | "mkchannel" | "top10chadsoft" | "top10gecko";

const DEBUG_PREFILLED_DEFAULTS = false;

type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

// == types without <FILLME> ==
// arbitrary (string) types can just be set to ""
// number types can just be set to NaN
// internal types need custom logic
// == types with <FILLME> ==
// choice inputs (dropdown, radio button)
// checkbox inputs (tri-checkbox)

type AnyFIXME = any;

export class AutoTTRecConfigFormFieldTypesClass {
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
  "encode-only"?: boolean = false; // checkbox
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
  "youtube-settings": boolean | undefined = true; // checkbox
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
  "pixel-format"?: string = "yuv420p";
  "speedometer"?: SpeedometerStyle = "fancy";
  "speedometer-decimal-places"?: SpeedometerDecimalPlacesNumeric = 1;
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

type NonNullable<T> = {[P in keyof T]: Exclude<T[P], null>};

export interface AutoTTRecConfigFormFieldTypes extends AutoTTRecConfigFormFieldTypesClass {};

const autoTTRecConfigFormFieldTypesClassObj = new AutoTTRecConfigFormFieldTypesClass();

//export type AutoTTRecConfigFormFieldTypes = Writable<AutoTTRecConfigFormFieldTypesReadonly>;

type AutoTTRecConfigFormFieldNames = Array<keyof AutoTTRecConfigFormFieldTypes>;

export const DEFAULT_FORM_VALUES: AutoTTRecConfigFormFieldTypes = autoTTRecConfigFormFieldTypesClassObj as AutoTTRecConfigFormFieldTypes;

export const AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES = Object.keys(autoTTRecConfigFormFieldTypesClassObj) as AutoTTRecConfigFormFieldNames;

export type AutoTTRecConfigFormStringFieldTypes = Pick<AutoTTRecConfigFormFieldTypes, {
  [K in keyof AutoTTRecConfigFormFieldTypes]-?:
    IfEquals<AutoTTRecConfigFormFieldTypes[K], string, K, never>
}[keyof AutoTTRecConfigFormFieldTypes]>;

export type AutoTTRecConfigFormNumberFieldTypes = Pick<AutoTTRecConfigFormFieldTypes, {
  [K in keyof AutoTTRecConfigFormFieldTypes]-?:
    IfEquals<AutoTTRecConfigFormFieldTypes[K], number, K, never>
}[keyof AutoTTRecConfigFormFieldTypes]>;

export type AutoTTRecConfigFormTriCheckboxFieldTypes = Pick<AutoTTRecConfigFormFieldTypes, {
  [K in keyof AutoTTRecConfigFormFieldTypes]-?:
    IfEquals<AutoTTRecConfigFormFieldTypes[K], boolean | undefined, K, never>
}[keyof AutoTTRecConfigFormFieldTypes]>;

export type AutoTTRecConfigFormInternalFieldTypes = Pick<AutoTTRecConfigFormFieldTypes, {
  [K in keyof AutoTTRecConfigFormFieldTypes]-?:
    null extends AutoTTRecConfigFormFieldTypes[K] ? K : never
}[keyof AutoTTRecConfigFormFieldTypes]>;

const AUTO_TT_REC_TOP_10_LOCATIONS = makeReadonlyArraySet(["ww", "worldwide", ...countryLocations, ...regionalLocations] as const);
type Top10LocationFull = ValidValues<typeof AUTO_TT_REC_TOP_10_LOCATIONS>;

function isInSet<T>(values: ReadonlySet<T>, x: any): x is T {
  return values.has(x);
}

type NullOrEmpty = null | "";

function isNullOrEmpty(x: any): x is NullOrEmpty {
  return x === null && x === "";
}

function deleteFromSet<T>(values: Set<T>, x: any): boolean {
  return values.delete(x);
}

export type PartialNull<T> = {
  [P in keyof T]: T[P] | null;
};

export type PartialFILLME<T> = {
  [P in keyof T]: T[P] | "<FILLME>";
};

export type ExcludeFILLME<T> = {
  [P in keyof T]: Exclude<T[P], "<FILLME>">;
}

interface AutoTTRecArgsWithoutNulls extends AutoTTRecArgsClass {}
export type AutoTTRecArgs = PartialNull<AutoTTRecArgsWithoutNulls>;
export type AutoTTRecArgsWithFILLME = PartialFILLME<AutoTTRecArgs>;

export type AutoTTRecConfigFormFieldTypesWithoutFILLME = ExcludeFILLME<AutoTTRecConfigFormFieldTypes>;
export type PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = Partial<AutoTTRecConfigFormFieldTypesWithoutFILLME>;

type AutoTTRecArgName = keyof AutoTTRecArgs;

const autoTTRecArgsClassObj = new AutoTTRecArgsClass();

type AutoTTRecArgNamesType = Array<keyof AutoTTRecArgs>;

interface AutoTTRecArgsExtendedTypes {
  [name: string]: "string" | "boolean" | "number" | "unsupported"
}

const autoTTRecArgExtendedTypes: AutoTTRecArgsExtendedTypes = {
  "main-ghost-auto": "string",
  "comparison-ghost-auto": "string",
  "no-200cc": "boolean",
  "top-10-censors": "unsupported",
  "ending-message": "unsupported",
  "dolphin-volume": "unsupported",
  "unbuffered-output": "unsupported"
} as const;

const GHOST_AUTO = makeReadonlyArraySet(["main-ghost-auto", "comparison-ghost-auto"] as const);
type GhostAuto = ValidValues<typeof GHOST_AUTO>;

const AUTO_TT_REC_ARG_NAMES = makeReadonlyArraySet(Object.keys(autoTTRecArgsClassObj) as AutoTTRecArgNamesType);
const AUTO_TT_REC_ARG_NAMES_EXTENDED = makeReadonlyArraySet([
    ...AUTO_TT_REC_ARG_NAMES.arr,
    ...GHOST_AUTO.arr,
    "no-200cc", "top-10-censors", "ending-message", "dolphin-volume", "unbuffered-output"] as const);

type AutoTTRecArgNameExtended = ValidValues<typeof AUTO_TT_REC_ARG_NAMES_EXTENDED>;

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

class AutoTTRecConfigImporterErrorsAndWarnings {
  private _errorsAndWarnings: Map<AutoTTRecArgNameExtended, AutoTTRecConfigImporterErrorOrWarningMessage[]>;
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

  private add(name: AutoTTRecArgNameExtended, message: string, isWarning: boolean) {
    this.addToErrorsWarningMap(name, message, isWarning, this._errorsAndWarnings);
  }

  public addError(name: AutoTTRecArgNameExtended, message: string) {
    this.add(name, message, false);
  }
  public addWarning(name: AutoTTRecArgNameExtended, message: string) {
    this.add(name, message, true);
  }

  public addErrorInvalidCommand(name: string) {
    this.addToErrorsWarningMap(name, "Not a valid auto-tt-recorder command.", false, this._errorsAndWarningsInvalidCommands);
  }
}

const listFormatter = new Intl.ListFormat("en", {style: "long", type: "disjunction"});
const ghostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html/;
const emptyOrNull = new Set([null, ""]);

type GhostAutoType = "rkg" | "chadsoft" | "<FILLME>";
const chadsoftGhostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36}\.html$/;

class AutoTTRecConfigPreprocessor {
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigImporterErrorsAndWarnings;

  constructor(autoTTRecConfig: AutoTTRecConfig, errorsAndWarnings: AutoTTRecConfigImporterErrorsAndWarnings) {
    this.autoTTRecConfig = shallowCopy(autoTTRecConfig);
    this.errorsAndWarnings = errorsAndWarnings;
  }

  
  private preprocess() {
    this.findInvalidNamesAndFillInMissing();

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

  private convertExtendedArgs() {

  }

  private convertGhostAuto(ghostAutoOptionName: GhostAuto,
    ghostFilenameOptionName: "main-ghost-filename" | "comparison-ghost-filename",
    ghostLinkOptionName: "chadsoft-ghost-page" | "chadsoft-comparison-ghost-page"
  ) {
    const ghostAutoValue = this.autoTTRecConfig[ghostAutoOptionName];

    if (!isNullOrEmpty(ghostAutoValue)) {
      let conflictsWithNonAutoOptions: boolean;
      if (this.autoTTRecConfig[ghostFilenameOptionName] === "<FILLME>" && this.autoTTRecConfig[ghostLinkOptionName] === "<FILLME>") {
        conflictsWithNonAutoOptions = false;
      } else {
        conflictsWithNonAutoOptions = true;
      }
      let ghostAutoType: GhostAutoType;

      if (ghostAutoValue === "<FILLME>") {
        ghostAutoType = "<FILLME>";
      } else if (ghostAutoVa)
      if (conflictsWithNonAutoOptions) {
        if ()
      }
      
        this.autoTTRecConfig[ghostFilenameOptionName] = "<FILLME>";
        this.autoTTRecConfig[ghostLinkOptionName] = "<FILLME>";
      }
      if (ghostAutoValue !== null && ghostAutoValue !== undefined) {
        if (typeof ghostAutoValue === "string") {
          if (ghostAutoValue.match(ghostPageLinkRegex)) {
            this.add(ghostLinkOptionName, ghostAutoValue);
          } else {
            this.add(ghostFilenameOptionName, ghostAutoValue);
          }
        } else {
          this.addErrorExtended(ghostAutoOptionName, `${ghostAutoOptionName} should be a string, but got ${typeof ghostAutoValue} instead.`);
        }
      } else {
        this.add(ghostFilenameOptionName, ghostAutoValue as AnyFIXME);
        this.add(ghostLinkOptionName, ghostAutoValue as AnyFIXME);
      }
  }
  }


}

class AutoTTRecConfigImporter {
  private autoTTRecArgs: AutoTTRecArgs;
  private formData: Partial<AutoTTRecConfigFormFieldTypes>;
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigImporterErrorsAndWarnings;

  constructor(autoTTRecConfig: AutoTTRecConfig) {
    this.autoTTRecArgs = {};
    this.formData = {};
    this.autoTTRecConfig = shallowCopy(autoTTRecConfig);
    this.errorsAndWarnings = new AutoTTRecConfigImporterErrorsAndWarnings();
  }

  //public add<K extends AutoTTRecArgName>(key: K, value: AutoTTRecArgs[K]) {
  //  this.autoTTRecArgs[key] = value;
  //}

  public addError<K extends AutoTTRecArgName>(key: K, message: string) {
    this.errorsAndWarnings.addError(key, message);
    this.autoTTRecArgs[key] = undefined;
  }

  public addWarning<K extends AutoTTRecArgName>(key: K, message: string) {
    this.errorsAndWarnings.addWarning(key, message);
  }

  public addErrorExtended<K extends AutoTTRecArgNameExtended>(key: K, message: string) {
    this.errorsAndWarnings.addError(key, message);
  }

  public addWarningExtended<K extends AutoTTRecArgNameExtended>(key: K, message: string) {
    this.errorsAndWarnings.addWarning(key, message);
  }
  public add<K extends AutoTTRecArgName & keyof AutoTTRecConfigFormFieldTypes, V extends AutoTTRecArgs[K] & AutoTTRecConfigFormFieldTypes[K]>(key: K, value: V) {
    if (key in this.formData) {
      let message = `Option ${key} was already defined. Was originally ${this.autoTTRecArgs[key]}, but is now being defined to ${value}.`
      this.addWarning(key, message);
    }
    if (value === null) {
      this.formData[key] = DEFAULT_FORM_VALUES[key];
    } else {
      this.formData[key] = value;

    }
  }

  private tryAddSameOption_Common<K extends keyof AutoTTRecArgs>(key: K, validValues?: ReadonlyArraySet<AutoTTRecArgs[K]>) {
    let expectedType = typeof autoTTRecArgsClassObj[key];
    if (expectedType === "string" || expectedType === "boolean" || expectedType === "number") {
      let configValue = this.autoTTRecConfig[key];
      if (configValue !== undefined && configValue !== null) {
        if (typeof configValue === expectedType) {
          if (validValues !== undefined) {
            if (isInSet(validValues.set, configValue)) {
              this.add(key as AnyFIXME, configValue);
            } else {
              this.addError(key, `${key} should be one of ${listFormatter.format(validValues.arr.map(x => String(x)))}`);
            }
          } else {
            let configValueWithType = configValue as AutoTTRecArgs[K];
            this.add(key as AnyFIXME, configValueWithType);
          }
        } else {
          this.addError(key, `${key} should be a ${expectedType}, but got a ${typeof configValue} instead.`);
        }
      } else {
        this.add(key as AnyFIXME, configValue);
      }
    } else {
      this.addError(key, "Error in determining expected type (please contact the developer).");
    }
  }

  public tryAddSameOption<K extends keyof AutoTTRecPrimitiveArgs>(key: K) {
    this.tryAddSameOption_Common(key);
  }

  public tryAddSameOptionComplex<K extends AutoTTRecArgName>(key: K, validValues: ReadonlyArraySet<AutoTTRecArgs[K]>) {
    this.tryAddSameOption_Common(key, validValues);
  }

  public import() {
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
  private formData: AutoTTRecConfigFormFieldTypes;

  constructor(autoTTRecArgs: AutoTTRecArgs) {
    this.autoTTRecArgs = autoTTRecArgs;
    this.formData = {...autoTTRecConfigFormFieldTypesClassObj} as AnyFIXME;
  }

    // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends keyof AutoTTRecConfigFormFieldTypes & keyof AutoTTRecArgs, V extends AutoTTRecArgs[K] & AutoTTRecConfigFormFieldTypes[K]>(key: K) {
    let value = this.autoTTRecArgs[key];
    if (value !== null && value !== undefined) {
      //let value2 = value;
      //let oldFormData = this.formData[key];
      this.formData[key] = value as AnyFIXME;
    }
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends keyof AutoTTRecConfigFormFieldTypes>(key: K, value: AutoTTRecConfigFormFieldTypes[K] | null | undefined) {
    let nonNullValue: AutoTTRecConfigFormFieldTypes[K];
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
  let autoTTRecConfigImporter = new AutoTTRecConfigImporter(autoTTRecConfig);
  autoTTRecConfigImporter.import();

  //let toFormDataConverter: AutoTTRecConfigToFormData = autoTTRecConfigImporter.createFormDataConverter();
  

    //autoTTRecArgs["chadsoft-ghost-page"] = 
  
}


function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFieldTypes;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
    this._autoTTRecArgs = {};
    this.formData = formData;
  }

  // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends keyof AutoTTRecConfigFormFieldTypes & AutoTTRecArgName>(key: K) {
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
  private _formData: AutoTTRecConfigFormFieldTypes;
  private _extendedTimeline: ExtendedTimeline;
  private _formComplexity: FormComplexity;
  private _isOnMKChannel: boolean;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
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

function excludeFILLMEFromAutoTTRecConfigFormData(formData: AutoTTRecConfigFormFieldTypes) {
  let formDataNoFILLMEPartial: PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = {};

  //export type AutoTTRecConfigFormFieldTypesWithoutFILLME = ExcludeFILLME<AutoTTRecConfigFormFieldTypes>;
  //export type PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = Partial<AutoTTRecConfigFormFieldTypesWithoutFILLME>;
  
}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes) {
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
