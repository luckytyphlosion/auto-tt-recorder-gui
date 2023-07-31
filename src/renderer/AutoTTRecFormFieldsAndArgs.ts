
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
