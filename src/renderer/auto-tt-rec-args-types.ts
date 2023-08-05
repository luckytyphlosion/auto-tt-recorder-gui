
import { COUNTRY_LOCATIONS } from "./components/form_components/Top10LocationCountryInput";
import { REGIONAL_LOCATIONS } from "./components/form_components/Top10LocationRegionalInput";

import { InputDisplay } from "./components/form_components/InputDisplayInput";
import { SpeedometerStyle } from "./components/form_components/SpeedometerInput";
import { SpeedometerMetric } from "./components/form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlacesNumeric } from "./components/form_components/SpeedometerDecimalPlacesInput";

import { EncodeType } from "./components/layout_components/choice_layouts/EncodeSettingsLayout";
import { VideoCodec } from "./components/form_components/VideoCodecInput";

import { DolphinResolution } from "./components/form_components/DolphinResolutionInput";
import { AudioCodec } from "./components/form_components/AudioCodecAndBitrateInput";

import { H26xPreset } from "./components/form_components/H26xPresetInput";

import { Timeline } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9 } from "./components/form_components/AspectRatio16By9Input";
import { PurgeAutoAdd } from "./components/form_components/PurgeAutoAddInput";

import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

import { ValidValues, makeReadonlyArraySet } from "../shared/array-set";

// The class containing all the auto-tt-recorder commands which the program can set
// Like above, it is a class instead of an interface to be able to set default values
// some fields are set up such that their name and type match exactly with fields in 
// the form data class above
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
  "ending-message"?: string = "";
  "extra-gecko-codes-filename"?: string = "";
  "extra-hq-textures-folder"?: string = "";
  "fade-in-at-start"?: boolean = false;
  "form-complexity"?: FormComplexity = FormComplexity.ALL;
  "game-volume"?: number = 1.0;
  "h26x-preset"?: H26xPreset = "slow";
  "hq-textures"?: boolean = true;
  "ignore-auto-add-missing-files"?: boolean = false;
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
  "purge-auto-add"?: PurgeAutoAdd = "onerror";
  "set-200cc"?: void;
  "speedometer"?: SpeedometerStyle = "fancy";
  "speedometer-style"?: void;
  "speedometer-decimal-places"?: SpeedometerDecimalPlacesNumeric = 1;
  "speedometer-decimal-places-str"?: void;
  "speedometer-metric"?: SpeedometerMetric = "engine";
  "start-music-at-beginning"?: boolean = false;
  "szs-filename"?: string = "";
  "timeline"?: Timeline = "mkchannel";
  "top-10-censors"?: string = "";
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

// The actual auto-tt-recorder arguments type used by most of the code,
// extended from the above class AutoTTRecArgsClass for greater type
// manipulation with TypeScript
export interface AutoTTRecArgs extends AutoTTRecArgsClass {}

// The object created from instantiating the base form data class
// which allows us to access default values and create other data structures
// Because of TypeScript limitations, we will have to use `as` assertions to set the type
// of the data structures we create from the object containing the default values
// Actually, the only objects created are related to the argument names,
// and the default values go unused
const autoTTRecArgsClassObj = new AutoTTRecArgsClass();

// A type indicating a possible auto-tt-recorder command name defined in AutoTTRecArgsClass
export type AutoTTRecArgName = keyof AutoTTRecArgs;
// A type describing an array with all of the auto-tt-recorder command names defined in AutoTTRecArgsClass
type AutoTTRecArgNamesArray = Array<keyof AutoTTRecArgs>;
// The actual array as described by the above type
const AUTO_TT_REC_ARG_NAMES = makeReadonlyArraySet(Object.keys(autoTTRecArgsClassObj) as AutoTTRecArgNamesArray);

// An ArraySet containing the "auto"-based ghost commands
// This is only used to create a type containing the possible "auto"-based ghost commands
const GHOST_AUTO_ARG_NAMES = makeReadonlyArraySet(["main-ghost-auto", "comparison-ghost-auto"] as const);
// An ArraySet containing the auto-tt-recorder commands unsupported by the program at this time
export const UNSUPPORTED_ARG_NAMES = makeReadonlyArraySet(["dolphin-volume", "chadsoft-cache-folder", "dolphin-folder", "storage-folder", "temp-folder", "wiimm-folder", "unbuffered-output"] as const);
// An ArraySet containing auto-tt-recorder commands supported by the program
// but are preprocessed or ignored before the conversion step
const OTHER_EXTENDED_ONLY_ARG_NAMES = makeReadonlyArraySet(["no-200cc", "ffmpeg-filename", "ffprobe-filename"] as const);

// An ArraySet containing all of the auto-tt-recorder commands which can be found in a config file
// but are not included in the auto-tt-recorder config file generated by the program
const AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY = makeReadonlyArraySet([...GHOST_AUTO_ARG_NAMES.arr, ...UNSUPPORTED_ARG_NAMES.arr, ...OTHER_EXTENDED_ONLY_ARG_NAMES.arr] as const);

// An ArraySet containing both the "extended only" auto-tt-recorder commands described above
// as well as the auto-tt-recorder commands which are used when exporting.
export const AUTO_TT_REC_ARG_NAMES_EXTENDED = makeReadonlyArraySet([
  ...AUTO_TT_REC_ARG_NAMES.arr,
  ...AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY.arr] as const);

// Below are types which correspond to the possible values of the ArraySets defined above
export type AutoTTRecExtendedOnlyArgName = ValidValues<typeof AUTO_TT_REC_ARG_NAMES_EXTENDED_ONLY>;
export type AutoTTRecUnsupportedArgName = ValidValues<typeof UNSUPPORTED_ARG_NAMES>;
export type GhostAutoArgName = ValidValues<typeof GHOST_AUTO_ARG_NAMES>;
export type AutoTTRecArgNameExtended = ValidValues<typeof AUTO_TT_REC_ARG_NAMES_EXTENDED>;

// A helper type which removes any fields in an object-like type that extend void
type WithoutVoid<T> = {
  [P in keyof T as T[P] extends void ? never : P]: T[P]
};

// A type describing all "real" auto-tt-recorder command
// void is used in the AutoTTRecArgs class to indicate a command that is not
// actually an auto-tt-recorder command (i.e. a "fake"/non-"real" command)
// but is generated during the preprocessing stage, to allow a "straight copy"
// to be done between the auto-tt-recorder config object and the form data object
export type AutoTTRecRealArgs = WithoutVoid<AutoTTRecArgs>;

// A type describing the possible real auto-tt-recorder command names
export type AutoTTRecRealArgName = keyof AutoTTRecRealArgs;

// An array containing all the valid locations for the `top-10-location` option of auto-tt-recorder.
// This array is currently only used to derive the type (Top10LocationFull)
const AUTO_TT_REC_TOP_10_LOCATIONS = makeReadonlyArraySet(["ww", "worldwide", ...COUNTRY_LOCATIONS.arr, ...REGIONAL_LOCATIONS.arr] as const);

// A type describing the possible values of the `top-10-location` option of auto-tt-recorder
export type Top10LocationFull = ValidValues<typeof AUTO_TT_REC_TOP_10_LOCATIONS>;
export type Top10LocationExport = Top10LocationFull | "regional" | "country";

// A helper type which includes <FILLME> and null to every field in the object-like type.
type IncludeFILLMENull<T> = {
  [P in keyof T]: T[P] | "<FILLME>" | null;
}

// A helper type to override the type of "top-10-location" to support special values for templates
type ExtendTop10LocationForTemplateExport<T> = {
  [P in keyof T]: P extends "top-10-location" ? T[P] | Top10LocationExport : T[P];
}

// A type specifically for the template exporter which allows <FILLME> and null values
// as well as overriding the type of "top-10-location" as described above
export type AutoTTRecExportArgs = ExtendTop10LocationForTemplateExport<IncludeFILLMENull<AutoTTRecRealArgs>>;

// A type describing the possible names of the auto-tt-recorder args that can be exported 
export type AutoTTRecExportArgName = keyof AutoTTRecExportArgs;
