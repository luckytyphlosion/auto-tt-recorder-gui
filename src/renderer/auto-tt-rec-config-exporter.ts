
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

import { AutoTTRecConfigFormFieldsPartial, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormNumberArgName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormSharedStringArgName, AutoTTRecConfigFormSharedChoiceArgName, AutoTTRecConfigFormSharedNumberArgName, AutoTTRecConfigFormSharedBooleanArgName, AutoTTRecConfigFormChoiceArgs, BothGhostSource, AutoTTRecConfigFormPathnameArgName, AutoTTRecConfigFormSharedPathnameArgName } from "./auto-tt-rec-form-field-types";

import { AutoTTRecExportArgName, AutoTTRecExportArgs } from "./auto-tt-rec-args-types";

import { AutoTTRecConfigErrorsAndWarnings } from "./auto-tt-rec-errors-and-warnings";

export class AutoTTRecConfigExporter {
  private formData: AutoTTRecConfigFormFields;
  private hasExported: boolean;
  private autoTTRecExportArgs: AutoTTRecExportArgs;

  constructor(formData: AutoTTRecConfigFormFields) {
    this.formData = formData;
    this.hasExported = false;
    this.autoTTRecExportArgs = {};
  }

  private exportSharedStringArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormStringArgName>(key: K) {
    let value = this.formData[key];
    if (value === "") {
      value = "<FILLME>";
    }

    this.autoTTRecExportArgs[key] = value;
  }

  private exportSharedNumberArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormNumberArgName>(key: K) {
    let value: number | "<FILLME>" = this.formData[key];
    if (Number.isNaN(value)) {
      value = "<FILLME>";
    }

    this.autoTTRecExportArgs[key] = value;
  }

  private exportSharedBooleanArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormBooleanArgName>(key: K) {
    this.autoTTRecExportArgs[key] = this.formData[key];
  }

  private exportSharedChoiceArg<K extends AutoTTRecExportArgName & AutoTTRecConfigFormChoiceArgName>(key: K) {
    this.autoTTRecExportArgs[key] = this.formData[key];
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

  public async export(): Promise<AutoTTRecExportArgs> {
    if (!this.hasExported) {
      this.exportStraightCopyArgs();
      this.hasExported = true;
    }

    return this.autoTTRecExportArgs;
  }
}
