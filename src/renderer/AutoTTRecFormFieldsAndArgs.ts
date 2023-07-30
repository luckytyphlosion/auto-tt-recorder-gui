
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

import { NoTop10Category, NO_TOP_10_CATEGORIES } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9, ASPECT_RATIO_16_BY_9_VALUES } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "./components/form_components/Top10TitleInput";

import { Set200cc, SET_200CC_VALUES } from "./components/form_components/Set200ccInput";

import { AutoTTRecConfig, StringOrError } from "../shared/shared-types";

import { ValidValues, ReadonlyArraySet, makeReadonlyArraySet } from "../shared/array-set";

import { shallowCopy } from "../shared/util-shared";

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

class AutoTTRecConfigFormFieldsSomeFILLMEClass {
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
  "output-width-custom"?: void;
  "pixel-format"?: string = "yuv420p";
  "set-200cc"?: void;
  "speedometer"?: SpeedometerStyle = "fancy";
  "speedometer-style"?: void;
  "speedometer-decimal-places"?: SpeedometerDecimalPlacesNumeric = 1;
  "speedometer-decimal-places-str"?: void;
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

export type PartialFILLME_FormComplexityNoFILLME<T> = {
  [P in keyof T]: IfEquals<T[P], number, number, 
    P extends "form-complexity" ? FormComplexity : T[P] | "<FILLME>">;
};

export type ExcludeFILLME<T> = {
  [P in keyof T]: Exclude<T[P], "<FILLME>">;
}

export interface AutoTTRecConfigFormFieldsSomeFILLME extends AutoTTRecConfigFormFieldsSomeFILLMEClass {};
export type AutoTTRecConfigFormFields = PartialFILLME_FormComplexityNoFILLME<AutoTTRecConfigFormFieldsSomeFILLME>;
export type AutoTTRecConfigFormFieldName = keyof AutoTTRecConfigFormFields;
export type AutoTTRecConfigFormFieldNameExceptFormComplexity = Exclude<AutoTTRecConfigFormFieldName, "form-complexity">;



export type AutoTTRecConfigFormFieldsNoFILLME = ExcludeFILLME<AutoTTRecConfigFormFieldsSomeFILLME>;

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

export type AutoTTRecConfigFormChoiceArgs = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?: IsChoiceType<AutoTTRecConfigFormFields[K]> extends true ? K : never
}[AutoTTRecConfigFormFieldName]>;
export type AutoTTRecConfigFormChoiceArgName = keyof AutoTTRecConfigFormChoiceArgs;
type AutoTTRecConfigFormSharedChoiceArgName = AutoTTRecConfigFormChoiceArgName & AutoTTRecArgName;

//type NaNCheck = 

type AutoTTRecConfigFormMinimalFields = (
  {[K in AutoTTRecConfigFormStringArgName]: ""}
  | {[K in AutoTTRecConfigFormNumberArgName]: number}
  | {[K in AutoTTRecConfigFormBooleanArgName]: "<FILLME>"}
  | {[K in AutoTTRecConfigFormChoiceArgName]: "<FILLME>"}
  | {"form-complexity": FormComplexity}
) & AutoTTRecConfigFormFields;

export const MINIMAL_FORM_VALUES: AutoTTRecConfigFormMinimalFields = {
  "aspect-ratio-16-by-9": "<FILLME>",
  "audio-bitrate": NaN,
  "audio-bitrate-displayed": NaN,
  "audio-bitrate-unit": "<FILLME>",
  "audio-codec": "<FILLME>",
  "background-music-source": "<FILLME>",
  "chadsoft-comparison-ghost-page": "",
  "chadsoft-ghost-page": "",
  "chadsoft-read-cache": "<FILLME>",
  "chadsoft-write-cache": "<FILLME>",
  "chadsoft-cache-expiry": "",
  "comparison-ghost-filename": "",
  "comparison-ghost-source": "<FILLME>",
  "crf-value": NaN,
  "dolphin-resolution": "<FILLME>",
  "encode-only": "<FILLME>",
  "encode-size": NaN,
  "encode-size-displayed": NaN,
  "encode-size-unit": "<FILLME>",
  "encode-type": "<FILLME>",
  "ending-delay": NaN,
  "extra-gecko-codes-enable": "<FILLME>",
  "extra-gecko-codes-contents": "",
  "extra-gecko-codes-filename": "",
  "extra-gecko-codes-unsaved": "<FILLME>",
  "extra-hq-textures-folder-enable": "<FILLME>",
  "extra-hq-textures-folder": "",
  "fade-in-at-start": "<FILLME>",
  "form-complexity": FormComplexity.ADVANCED,
  "game-volume-slider": NaN,
  "game-volume-numberinput": NaN,
  "h26x-preset": "<FILLME>",
  "hq-textures": "<FILLME>",
  "input-display": "<FILLME>",
  "input-display-dont-create": "<FILLME>",
  "iso-filename": "",
  "keep-window": "<FILLME>",
  "main-ghost-filename": "",
  "main-ghost-source": "<FILLME>",
  "mk-channel-ghost-description": "",
  "music-filename": "",
  "music-presentation": "<FILLME>",
  "music-volume-numberinput": NaN,
  "music-volume-slider": NaN,
  "no-background-blur": "<FILLME>",
  "no-bloom": "<FILLME>",
  "no-music": "<FILLME>",
  "no-top-10-category": "<FILLME>",
  "output-video-filename": "",
  "output-video-file-format": "<FILLME>",
  "output-width-custom": NaN,
  "output-width-preset": "<FILLME>",
  "pixel-format": "",
  "set-200cc": "<FILLME>",
  "speedometer-decimal-places-str": "<FILLME>",
  "speedometer-style": "<FILLME>",
  "speedometer-metric": "<FILLME>",
  "szs-filename": "",
  "szs-source": "<FILLME>",
  "timeline-category": "<FILLME>",
  "top-10-chadsoft": "",
  "top-10-gecko-code-location-region": "<FILLME>",
  "top-10-gecko-code-contents": "",
  "top-10-gecko-code-filename": "",
  "top-10-gecko-code-unsaved": "<FILLME>",
  "top-10-highlight-enable": "<FILLME>",
  "top-10-highlight": NaN,
  "top-10-location-country-location": "<FILLME>",
  "top-10-location-region": "<FILLME>",
  "top-10-location-regional-location": "<FILLME>",
  "top-10-title": "",
  "top-10-title-type": "<FILLME>",
  "track-name": "",
  "track-name-type": "<FILLME>",
  "use-ffv1": "<FILLME>",
  "video-codec": "<FILLME>",
  "youtube-settings": "<FILLME>"
};

// type AutoTTRecStringOrChoiceArgName = Pick<AutoTTRecArgs, {
//   [K in AutoTTRecArgName]-?:
//     (AutoTTRecArgs[K] extends string | null | undefined) extends true ? K : never
// }[AutoTTRecArgName]>;

const autoTTRecConfigFormFieldTypesClassObj = new AutoTTRecConfigFormFieldsSomeFILLMEClass();

type AutoTTRecConfigFormFieldNamesArray = Array<AutoTTRecConfigFormFieldName>;

export const DEFAULT_FORM_VALUES: AutoTTRecConfigFormFieldsNoFILLME = autoTTRecConfigFormFieldTypesClassObj as AutoTTRecConfigFormFieldsNoFILLME;

export const AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES = Object.keys(autoTTRecConfigFormFieldTypesClassObj) as AutoTTRecConfigFormFieldNamesArray;

const AUTO_TT_REC_TOP_10_LOCATIONS = makeReadonlyArraySet(["ww", "worldwide", ...COUNTRY_LOCATIONS.arr, ...REGIONAL_LOCATIONS.arr] as const);
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

export type PartialNull<T> = {
  [P in keyof T]?: T[P] | null;
};

export type AutoTTRecConfigFormTriCheckboxFields = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?:
    IfEquals<AutoTTRecConfigFormFields[K], boolean | "<FILLME>", K, never>
}[AutoTTRecConfigFormFieldName]>;

//type AutoTTRecConfigFormFieldsPartialNull = PartialNull<AutoTTRecConfigFormFields>;
type AutoTTRecConfigFormFieldsPartial = Partial<AutoTTRecConfigFormFields>;

//type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<T[P]> };

export type DoesSomething<T> = {
  [P in keyof T]: T[P] | null;
}

type BothGhostSource = MainGhostSource | ComparisonGhostSource;

//export type AutoTTRecConfigFormFieldTypesWithoutFILLME = ExcludeFILLME<AutoTTRecConfigFormFields>;
//export type PartialAutoTTRecConfigFormFieldTypesWithoutFILLME = Partial<AutoTTRecConfigFormFieldTypesWithoutFILLME>;
//export type AutoTTRecArgsWithFILLME = PartialFILLME<AutoTTRecArgs>;

const autoTTRecArgsClassObj = new AutoTTRecArgsClass();

export interface AutoTTRecArgs extends AutoTTRecArgsClass {}
//type AutoTTRecArgsNoNever = ExcludeNever<AutoTTRecArgs>;

type WithoutVoid<T> = {
  [P in keyof T as T[P] extends void ? never : P]: T[P]
};

type AutoTTRecRealArgs = WithoutVoid<AutoTTRecArgs>;
type AutoTTRecRealArgName = keyof AutoTTRecRealArgs;

//export type AutoTTRecArgs = PartialNull<AutoTTRecArgsWithoutNulls>;
type AutoTTRecArgNamesType = Array<keyof AutoTTRecArgs>;

type AutoTTRecArgName = keyof AutoTTRecArgs;

const GHOST_AUTO_ARG_NAMES = makeReadonlyArraySet(["main-ghost-auto", "comparison-ghost-auto"] as const);
const UNSUPPORTED_ARG_NAMES = makeReadonlyArraySet(["top-10-censors", "ending-message", "dolphin-volume", "unbuffered-output"] as const);
const OTHER_EXTENDED_ONLY_ARG_NAMES = makeReadonlyArraySet(["no-200cc", "ffmpeg-filename", "ffprobe-filename"] as const);
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

// type AutoTTRecPrimitiveArgs = Pick<AutoTTRecArgs, {
//   [K in keyof AutoTTRecArgs]-?:
//     IfEquals<AutoTTRecArgs[K], (string | undefined | null), K,
//       IfEquals<AutoTTRecArgs[K], (number | undefined | null), K,
//         IfEquals<AutoTTRecArgs[K], (boolean | undefined | null), K, never>
//       >
//     >
// }[keyof AutoTTRecArgs]>;

interface AutoTTRecConfigImporterErrorOrWarningMessage {
  isWarning: boolean,
  message: string
}

function validateFormDataNonPartial(formData: AutoTTRecConfigFormFieldsPartial, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings) {
  for (const argName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
    if (formData[argName] === undefined) {
      errorsAndWarnings.addKeyUndefinedWarning(argName, "formData");
      formData[argName] = DEFAULT_FORM_VALUES[argName] as any;
    } else if (formData[argName] === null) {
      errorsAndWarnings.addWarning(argName, `formData[${argName}] was somehow null! (this is an error within the program itself and not your fault, please contact the developer!)`);
      formData[argName] = DEFAULT_FORM_VALUES[argName] as any;
    }
  }
}

export function makeMinimalFormData(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category) {
  let formData: AutoTTRecConfigFormFields = shallowCopy(MINIMAL_FORM_VALUES);
  formData["form-complexity"] = formComplexity;
  formData["timeline-category"] = timelineCategory;
  formData["no-top-10-category"] = noTop10Category;
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();

  for (const argName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
    if (typeof formData[argName] === "number") {
      if (!Number.isNaN(formData[argName])) {
        errorsAndWarnings.addWarning(argName, `minimal formData[${argName}] should be NaN! (this is an error within the program itself and not your fault, please contact the developer!)`);
      }
    }
  }

  console.log(errorsAndWarnings.compile());
  return formData;
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
    if (name === "extra-gecko-codes-filename") {
      console.log("extra-gecko-codes-filename error message:", message);
    }
    this.add(name, message, false);
  }

  public addErrorWrongType(name: AutoTTRecArgExtendedAndFormFieldName, expectedTypes: string, value: string | number | boolean | null) {
    this.addError(name, `${name} should be a ${expectedTypes}, but got ${typeof value} instead. Option will be left empty.`);
  }

  public addInvalidChoiceError(name: AutoTTRecArgExtendedAndFormFieldName, validValues: ReadonlyArraySet<string>, actualValue: string, extraMessage: string = "") {
    this.addError(name, `${name} should be one of ${listFormatter.format(validValues.arr)}, but got ${actualValue} instead.${extraMessage}`);
  }

  public addKeyUndefinedWarning(name: AutoTTRecArgExtendedAndFormFieldName, objVariableName: string) {
    this.addWarning(name, `${objVariableName}["${name}"] was not defined! (this is an error within the program itself and not your fault, please contact the developer!)`);
  }

  public addWarning(name: AutoTTRecArgExtendedAndFormFieldName, message: string) {
    this.add(name, message, true);
  }

  public addErrorInvalidCommand(name: string) {
    this.addToErrorsWarningMap(name, `${name} is not a valid auto-tt-recorder command.`, false, this._errorsAndWarningsInvalidCommands);
  }

  public debug_get_errorsAndWarnings() {
    return this._errorsAndWarnings;
  }

  public compile() {
    let output: string[] = [];

    for (const [invalidCommandName, invalidCommandMessages] of this._errorsAndWarningsInvalidCommands.entries()) {
      output.push(`Error with ${invalidCommandName}:`);
      for (const invalidCommandMessage of invalidCommandMessages) {
        let curErrorOrWarningMessage: string;
  
        if (invalidCommandMessage.isWarning) {
          curErrorOrWarningMessage = "  Warning: ";
        } else {
          curErrorOrWarningMessage = "  Error: ";
        }

        curErrorOrWarningMessage += invalidCommandMessage.message;
        output.push(curErrorOrWarningMessage);
      }
    }

    output.push("\n");

    for (const [commandName, commandMessages] of this._errorsAndWarnings.entries()) {
      output.push(`Error with ${commandName}:`);
      for (const commandMessage of commandMessages) {
        let curErrorOrWarningMessage: string;
  
        if (commandMessage.isWarning) {
          curErrorOrWarningMessage = "  Warning: ";
        } else {
          curErrorOrWarningMessage = "  Error: ";
        }

        curErrorOrWarningMessage += commandMessage.message;
        output.push(curErrorOrWarningMessage);
      }
    }

    return output.join("\n");
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
    } else {
      this.autoTTRecConfig["on-200cc"] = false;
    }

    this.autoTTRecConfig["set-200cc"] = this.autoTTRecConfig["on-200cc"] ? "on-200cc" : "no-200cc";
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

  private convertStringOrNumArgToString(stringOrNumArgName: "chadsoft-cache-expiry" | "speedometer-decimal-places" | "form-complexity", newArgName?: "speedometer-decimal-places-str") {
    let stringOrNumArgValue = this.autoTTRecConfig[stringOrNumArgName];
    let destValue: string | null;
    let destArgName: typeof stringOrNumArgName | Exclude<typeof newArgName, undefined>
    if (newArgName === undefined) {
      destArgName = stringOrNumArgName;
    } else {
      destArgName = newArgName;
    }

    if (stringOrNumArgValue === null) {
      destValue = null;
    } else if (stringOrNumArgValue === "<FILLME>") {
      destValue = "<FILLME>";
    } else {
      if (typeof stringOrNumArgValue !== "string") {
        if (typeof stringOrNumArgValue === "number") {
          destValue = stringOrNumArgValue.toString();
        } else {
          this.errorsAndWarnings.addErrorWrongType(stringOrNumArgName, "string or number", stringOrNumArgValue);
          destValue = "<FILLME>";
        }
      } else {
        destValue = stringOrNumArgValue;
      }
    }

    this.autoTTRecConfig[destArgName] = destValue;
  }

  private convertDifferingArgNames() {
    this.autoTTRecConfig["speedometer-style"] = this.autoTTRecConfig["speedometer"];
    this.autoTTRecConfig["output-width-custom"] = this.autoTTRecConfig["output-width"];
  }

  private removeFFmpegFFprobeArgs() {
    delete this.autoTTRecConfig["ffmpeg-filename"];
    delete this.autoTTRecConfig["ffprobe-filename"];
  }

  private warnUnsupportedArg(autoTTRecUnsupportedArgName: AutoTTRecUnsupportedArgName) {
    if (this.autoTTRecConfig[autoTTRecUnsupportedArgName] !== null) {
      this.errorsAndWarnings.addWarning(autoTTRecUnsupportedArgName, `${autoTTRecUnsupportedArgName} is not currently supported, will be ignored.`);
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
      this.convertStringOrNumArgToString("form-complexity");
      this.convertDifferingArgNames();
      this.removeFFmpegFFprobeArgs();
      for (const unsupportedArgName of UNSUPPORTED_ARG_NAMES.arr)  {
        this.warnUnsupportedArg(unsupportedArgName);
      }
      this.autoTTRecConfigImporter = new AutoTTRecConfigImporter(this.autoTTRecConfig, this.errorsAndWarnings, this.autoTTRecConfigFilename);
    }

    return this.autoTTRecConfigImporter;
  }
}

class AutoTTRecConfigImporter {
  private formData: AutoTTRecConfigFormFieldsPartial;
  private hasImported: boolean;
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;
  private configArgWasNullOrDisallowedFILLMESet: Set<AutoTTRecConfigFormStringArgName | AutoTTRecConfigFormChoiceArgName | AutoTTRecConfigFormNumberArgName | AutoTTRecConfigFormBooleanArgName>;
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

  public isArgValueNull_addDefaultIfNull<K extends AutoTTRecConfigFormFieldNameExceptFormComplexity>(key: K, value: string | number | boolean | null): value is null {
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
    let [extraHQTexturesAbsoluteFolder, extraHQTexturesFolder] = await this.setPathnameArgEnable_resolvePathname_returnOriginalAndResolvedFilename({
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
      validateFormDataNonPartial(this.formData, this.errorsAndWarnings);
      this.hasImported = true;
    }

    return this.formData as AutoTTRecConfigFormFields;
  }
}

export async function convertAutoTTRecConfigToFormData(autoTTRecConfig: AutoTTRecConfig, autoTTRecConfigFilename: string) {
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();
  let autoTTRecConfigPreprocessor = new AutoTTRecConfigPreprocessor(autoTTRecConfig, errorsAndWarnings, autoTTRecConfigFilename);
  let autoTTRecConfigImporter = autoTTRecConfigPreprocessor.preprocess();
  let autoTTRecConfigFormFields = await autoTTRecConfigImporter.import();
  console.log(errorsAndWarnings.compile());
  console.log("after import errorsAndWarnings: ", errorsAndWarnings.debug_get_errorsAndWarnings());

  return autoTTRecConfigFormFields;
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
