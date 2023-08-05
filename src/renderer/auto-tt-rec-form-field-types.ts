
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
import { OutputWidthPreset } from "./components/form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./components/form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9 } from "./components/form_components/AspectRatio16By9Input";
import { TrackNameType } from "./components/form_components/TrackNameInput";

import { MusicPresentation } from "./components/form_components/MusicPresentationInput";
import { FormComplexity } from "./components/layout_components/FormComplexityLayout";
import { Top10TitleType } from "./components/form_components/Top10TitleInput";

import { Set200cc } from "./components/form_components/Set200ccInput";

import { IfEquals } from "../shared/shared-types";

import { AutoTTRecArgName } from "./auto-tt-rec-args-types";

const DEBUG_PREFILLED_DEFAULTS = false;

// The class containing the entire definition of the form data used in the form
// It is a class rather than an interface so that I can also define default values at the same time
// which reduces clutter
// Types must be either string, number, boolean, or "Choice" (string union)
// "SomeFILLME" is derived from the fact that any choice type specified here
// is derived from the ValidValues generic type, which also adds "<FILLME>" to the type union
// as every choice input can be uninitialized to support config flexibility
class AutoTTRecConfigFormFieldsSomeFILLMEClass {
  "aspect-ratio-16-by-9": AspectRatio16By9 = "auto"; // choice
  "audio-bitrate": number = 128000; // number
  "audio-bitrate-last-encode-type": EncodeType = "crf"; // choice but internal
  "audio-bitrate-last-audio-codec": AudioCodec = "libopus"; // choice but internal
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
  "ending-message": string = "Video recorded by https://bit.ly/AutoTTRecorderGUI"; // string
  "expand-unselected-choice-inputs": boolean = false; // checkbox but internal
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
  "top-10-censors": string = ""; // arbitrary (really shouldn't be but no more time to make this a proper input)
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

// interface version of the respective class, which allows TypeScript manipulation of the type
export interface AutoTTRecConfigFormFieldsSomeFILLME extends AutoTTRecConfigFormFieldsSomeFILLMEClass {};

// A helper type which adds a <FILLME>-like option to every field
// as every field is allowed to be missing, for flexible template support
// numeric types don't need <FILLME> as any number inputs will be NaN if they are empty
// string types get added <FILLME> even though a <FILLME> string is empty,
// but it doesn't matter because the type still ends up being string
// "form-complexity" is omitted because it is an enum which messes up the following generated types (TODO how?)
// (Technically speaking, neither timeline-category nor no-top-10-category can be <FILLME> either,
// but this was implemented before I realized that, and it doesn't affect the program logic by much).
export type PartialFILLME_FormComplexityNoFILLME<T> = {
  [P in keyof T]: IfEquals<T[P], number, number, 
    P extends "form-complexity" ? FormComplexity : T[P] | "<FILLME>">;
};

// The actual form data type used by most of the code, based on the initial class with the above FILLME type adder
export type AutoTTRecConfigFormFields = PartialFILLME_FormComplexityNoFILLME<AutoTTRecConfigFormFieldsSomeFILLME>;
// A partial version of AutoTTRecConfigFormFields, allowing for undefined values. This makes
// constructing the form data from the auto-tt-recorder config a lot easier, as it
// can be done incrementally this way, as opposed to requiring all fields to be defined first.
export type AutoTTRecConfigFormFieldsPartial = Partial<AutoTTRecConfigFormFields>;

// A type indicating a possible field name in AutoTTRecConfigFormFields
export type AutoTTRecConfigFormFieldName = keyof AutoTTRecConfigFormFields;

// A helper type which excludes <FILLME> from every field in the object-like type.
type ExcludeFILLME<T> = {
  [P in keyof T]: Exclude<T[P], "<FILLME>">;
}

// AutoTTRecConfigFormFields, without any <FILLME>s
// Makes the conversion of the form data to auto-tt-recorder arguments
// a lot easier, as it avoids needing to account for <FILLME>, and
// none of the submitted form data values should ever be <FILLME>
// if the form is considered valid anyway
export type AutoTTRecConfigFormFieldsNoFILLME = ExcludeFILLME<AutoTTRecConfigFormFieldsSomeFILLME>;

// A helper type which will remove all fields that are not exactly of the specified type
// avoiding the TypeScript extending logic using a special IfEquals helper type
// defined in shared-types.ts
type AutoTTRecConfigFormPrimitiveArgs<T> = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?:
    IfEquals<AutoTTRecConfigFormFields[K], T, K, never>
}[AutoTTRecConfigFormFieldName]>;

// Below are four categories of types which divide the form data type into partitions
// based on a specific type
// The four categories are arbitrary strings, numbers, booleans, and choice-based types (e.g. radio button, dropdown)
// each category has three types associated.
// The first type ends in Args and just contains AutoTTRecConfigFormFields
// with ONLY fields that match the specified type
// The second type is a union of the possible field names with the specified type
// The third type is the intersection of the possible field names with the specified type
// AND the possible auto-tt-recorder command names (AutoTTRecArgName)
// This third type allows us to define functions related to directly copying
// a value in the auto-tt-recorder config to the form data object, with minimal validation

// only string fields are kept here
export type AutoTTRecConfigFormStringArgs = AutoTTRecConfigFormPrimitiveArgs<string | "<FILLME>">;
export type AutoTTRecConfigFormStringArgName = keyof AutoTTRecConfigFormStringArgs;
export type AutoTTRecConfigFormSharedStringArgName = AutoTTRecConfigFormStringArgName & AutoTTRecArgName;

// only number fields are kept here
export type AutoTTRecConfigFormNumberArgs = AutoTTRecConfigFormPrimitiveArgs<number>;
export type AutoTTRecConfigFormNumberArgName = keyof AutoTTRecConfigFormNumberArgs;
export type AutoTTRecConfigFormSharedNumberArgName = AutoTTRecConfigFormNumberArgName & AutoTTRecArgName;

// only boolean fields are kept here
export type AutoTTRecConfigFormBooleanArgs = AutoTTRecConfigFormPrimitiveArgs<boolean | "<FILLME>">;
export type AutoTTRecConfigFormBooleanArgName = keyof AutoTTRecConfigFormBooleanArgs;
export type AutoTTRecConfigFormSharedBooleanArgName = AutoTTRecConfigFormBooleanArgName & AutoTTRecArgName;

// A helper type to determine if a type is a choice type, that is the type
// is a union of strings
// Because "<FILLME>" is also added to boolean types, we must remove it in order
// to test whether the type is a string
type IsChoiceType<T, U extends T = T> =
    (Exclude<T, "<FILLME>"> extends string ?
    (U extends Exclude<T, "<FILLME>"> ? false : true)
        : never) extends false ? false : true

// only choice (string union, e.g. radio button/dropdown) fields are kept here
export type AutoTTRecConfigFormChoiceArgs = Pick<AutoTTRecConfigFormFields, {
  [K in AutoTTRecConfigFormFieldName]-?: IsChoiceType<AutoTTRecConfigFormFields[K]> extends true ? K : never
}[AutoTTRecConfigFormFieldName]>;
export type AutoTTRecConfigFormChoiceArgName = keyof AutoTTRecConfigFormChoiceArgs;
export type AutoTTRecConfigFormSharedChoiceArgName = AutoTTRecConfigFormChoiceArgName & AutoTTRecArgName;

// A type describing the field names of fields with a pathname type, but not checked that the types are actual string args
type AutoTTRecConfigFormPathnameArgNameUnvalidated = ("iso-filename" | "extra-gecko-codes-filename" | "top-10-gecko-code-filename" | "extra-hq-textures-folder" | "main-ghost-filename" | "comparison-ghost-filename" | "szs-filename" | "music-filename" | "output-video-filename");
// The above type, but validated to ensure that the specified types are string args in the form data
export type AutoTTRecConfigFormPathnameArgName = AutoTTRecConfigFormPathnameArgNameUnvalidated extends AutoTTRecConfigFormStringArgName ? AutoTTRecConfigFormPathnameArgNameUnvalidated : never;

export type AutoTTRecConfigFormSharedPathnameArgName = AutoTTRecConfigFormPathnameArgName & AutoTTRecArgName;

// A restricted version of AutoTTRecConfigFormFields dictating the expected values
// for each field, when the form is cleared.
// This is an empty string for string fields
// a NaN for number fields (unfortunately not possible to state something as a NaN type)
// and <FILLME> for boolean and choice fields
export type AutoTTRecConfigFormMinimalFields = (
  {[K in AutoTTRecConfigFormStringArgName]: ""}
  | {[K in AutoTTRecConfigFormNumberArgName]: number}
  | {[K in AutoTTRecConfigFormBooleanArgName]: "<FILLME>"}
  | {[K in AutoTTRecConfigFormChoiceArgName]: "<FILLME>"}
  | {"form-complexity": FormComplexity}
) & AutoTTRecConfigFormFields;

// The actual object definition adhering to the above type AutoTTRecConfigFormMinimalFields
export const MINIMAL_FORM_VALUES: AutoTTRecConfigFormMinimalFields = {
  "aspect-ratio-16-by-9": "<FILLME>",
  "audio-bitrate": NaN,
  "audio-bitrate-displayed": NaN,
  "audio-bitrate-last-encode-type": "<FILLME>",
  "audio-bitrate-last-audio-codec": "<FILLME>",
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
  "ending-message": "",
  "expand-unselected-choice-inputs": "<FILLME>",
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
  "top-10-censors": "",
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

// The object created from instantiating the base form data class
// which allows us to access default values and create other data structures
// Because of TypeScript limitations, we will have to use `as` assertions to set the type
// of the data structures we create from the object containing the default values
const autoTTRecConfigFormFieldTypesClassObj = new AutoTTRecConfigFormFieldsSomeFILLMEClass();

// The default form values of the form
export const DEFAULT_FORM_VALUES: AutoTTRecConfigFormFieldsNoFILLME = autoTTRecConfigFormFieldTypesClassObj as AutoTTRecConfigFormFieldsNoFILLME;

// A type describing an array with all of the field names in AutoTTRecConfigFormFields
type AutoTTRecConfigFormFieldNamesArray = Array<AutoTTRecConfigFormFieldName>;
// The actual array as described by the above type
export const AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES = Object.keys(autoTTRecConfigFormFieldTypesClassObj) as AutoTTRecConfigFormFieldNamesArray;

// A type describing the possible sources of both the main and comparison ghost
export type BothGhostSource = MainGhostSource | ComparisonGhostSource;

// A helper type which includes <FILLME> to every field in the object-like type.
type IncludeFILLME<T> = {
  [P in keyof T]: T[P] | "<FILLME>" | null;
}

export type AutoTTRecConfigFormExportFields = IncludeFILLME<AutoTTRecConfigFormFields>;
