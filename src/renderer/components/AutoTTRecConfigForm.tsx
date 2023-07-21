import React, { useState, ReactNode, useEffect, memo, useMemo, useCallback } from "react";

import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues, FormProviderProps, UseFormReturn } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";

import { EncodeSizeUnit } from "./form_components/EncodeSizeInput";

import { MainGhostSource } from "./form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "./form_components/ComparisonGhostSourceInput";
import { SZSSource } from "./form_components/SZSSourceInput";
import { Top10LocationRegion } from "./form_components/Top10LocationInput";

import { Top10LocationCountry } from "./form_components/Top10LocationCountryInput";
import { Top10LocationRegional } from "./form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "./form_components/BackgroundMusicSourceInput";

import { InputDisplay } from "./form_components/InputDisplayInput";
import { SpeedometerStyle } from "./form_components/SpeedometerInput";
import { SpeedometerMetric } from "./form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces } from "./form_components/SpeedometerDecimalPlacesInput";

import { EncodeType } from "./layout_components/choice_layouts/EncodeTypeInput";
import { OutputVideoFileFormat } from "./form_components/OutputVideoFileFormatInput";
import { VideoCodec } from "./form_components/VideoCodecInput";

import { DolphinResolution } from "./form_components/DolphinResolutionInput";
import { AudioCodec } from "./form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit } from "./form_components/AudioBitrateInput";

import { H26xPreset } from "./form_components/H26xPresetInput";
import { OutputWidthPreset } from "./form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./layout_components/NoTop10CategoryLayout";
import { AspectRatio16By9 } from "./form_components/AspectRatio16By9Input";
import { TrackNameType } from "./form_components/TrackNameInput";

import { MusicPresentation } from "./form_components/MusicPresentationInput";
import { FormComplexity } from "./layout_components/FormComplexityLayout";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

export interface AutoTTRecConfigFormFieldTypes {
  "aspect-ratio-16-by-9": AspectRatio16By9,
  "audio-bitrate": number,
  "audio-bitrate-displayed": number,
  "audio-bitrate-unit": AudioBitrateUnit,
  "audio-codec": AudioCodec,
  "background-music-source": BackgroundMusicSource,
  "chadsoft-comparison-ghost-page": string,
  "chadsoft-ghost-page": string,
  "comparison-ghost-filename": string,
  "comparison-ghost-source": ComparisonGhostSource,
  "crf-value": number,
  "dolphin-resolution": DolphinResolution,
  "encode-only": boolean,
  "encode-size": number,
  "encode-size-displayed": number,
  "encode-size-unit": EncodeSizeUnit,
  "encode-type": EncodeType,
  "ending-delay": number,
  "extra-gecko-codes-enable": boolean,
  "extra-gecko-codes-contents": string,
  "extra-gecko-codes-filename": string,
  "extra-gecko-codes-unsaved": boolean,
  "extra-hq-textures-folder-enable": boolean,
  "extra-hq-textures-folder": string,
  "fade-in-at-start": boolean,
  "form-complexity": FormComplexity,
  "game-volume-slider": number,
  "game-volume-numberinput": number,
  "h26x-preset": H26xPreset,
  "hq-textures": boolean,
  "input-display": InputDisplay,
  "input-display-dont-create": boolean,
  "iso-filename": string,
  "keep-window": boolean,
  "main-ghost-filename": string,
  "main-ghost-source": MainGhostSource,
  "mk-channel-ghost-description": string,
  "music-filename": string,
  "music-volume-numberinput": number,
  "music-volume-slider": number,
  "no-background-blur": boolean,
  "no-bloom": boolean,
  "no-music": boolean,
  "no-top-10-category": NoTop10Category,
  "output-video-filename": string,
  "output-width-custom": number,
  "output-width-preset": OutputWidthPreset,
  "output-video-file-format": OutputVideoFileFormat,
  "pixel-format": string,
  "set-200cc": string,
  "speedometer-decimal-places-str": SpeedometerDecimalPlaces,
  "speedometer-style": SpeedometerStyle,
  "speedometer-metric": SpeedometerMetric,
  "music-presentation": MusicPresentation,
  "szs-filename": string,
  "szs-source": SZSSource,
  "timeline-category": TimelineCategory,
  "top-10-chadsoft": string,
  "top-10-gecko-code-location-region": Top10GeckoCodeLocationRegion,
  "top-10-gecko-code-contents": string,
  "top-10-gecko-code-filename": string,
  "top-10-gecko-code-unsaved": boolean,
  "top-10-highlight-enable": boolean,
  "top-10-highlight": number,
  "top-10-location-country-location": Top10LocationCountry,
  "top-10-location-region": Top10LocationRegion,
  "top-10-location-regional-location": Top10LocationRegional,
  "top-10-title": string,
  "track-name": string,
  "track-name-type": TrackNameType,
  "use-ffv1": boolean,
  "video-codec": VideoCodec,
  "youtube-settings": boolean,
}

export type Timeline = "noencode" | "ghostonly" | "ghostselect" | "mkchannel" | "top10";

export interface AutoTTRecArgs {
  "iso-filename": string,
  "timeline"?: Timeline,
  "main-ghost-filename"?: string,
  "chadsoft-ghost-page"?: string,
  "on-200cc"?: boolean
  "chadsoft-comparison-ghost-page"?: string,
  "comparison-ghost-filename"?: string,
  "szs-filename"?: string,
  "mk-channel-ghost-description"?: string,
  "track-name"?: string,
  "top-10-location"?: "ww" | "worldwide" | Top10LocationCountry | Top10LocationRegional,
  "music-filename"?: string,
  "game-volume"?: number,
  "music-volume"?: number,
  "input-display"?: InputDisplay,
  "speedometer"?: SpeedometerStyle,
  "speedometer-metric"?: SpeedometerMetric,
  "speedometer-decimal-places"?: number,
  "hq-textures"?: boolean,
  "no-background-blur"?: boolean,
  "no-bloom"?: boolean,
  "no-music"?: boolean,
  "encode-type": EncodeType,
  "video-codec"?: VideoCodec,
  "crf-value"?: number,
  "h26x-preset"?: H26xPreset,
  "encode-size"?: number,
  "audio-codec"?: AudioCodec,
  "audio-bitrate"?: number,
  "pixel-format"?: string,
  "dolphin-resolution"?: DolphinResolution,
  "output-width"?: number | null,
  "youtube-settings"?: boolean,
  "use-ffv1"?: boolean,
  "encode-only"?: boolean,
  "input-display-dont-create"?: boolean,
  "keep-window"?: boolean,
  "output-video-filename": string,
  "top-10-chadsoft"?: string,
  "top-10-title"?: string,
  "top-10-highlight"?: number,
  "top-10-gecko-code-filename"?: string,
  "extra-gecko-codes-filename"?: string,
  "aspect-ratio-16-by-9"?: AspectRatio16By9,
  "extra-hq-textures-folder"?: string,
  "start-music-at-beginning"?: boolean,
  "no-music-mkchannel"?: boolean,
  "ending-delay"?: number,
  "fade-in-at-start"?: boolean,
}

const DEFAULT_AUTO_TT_REC_ARGS: AutoTTRecArgs = {
  "iso-filename": "",
  "speedometer": "fancy",
  "encode-type": "crf",
  "output-video-filename": ""
};

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFieldTypes;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
    this._autoTTRecArgs = {...DEFAULT_AUTO_TT_REC_ARGS};
    this.formData = formData;
  }

  // add an argument with the same name and type from the submitted formData
  // to the resulting auto-tt-rec arguments
  public add<K extends keyof AutoTTRecConfigFormFieldTypes & keyof AutoTTRecArgs>(key: K) {
    this._autoTTRecArgs[key] = this.formData[key];
  }

  // simple key value argument add, not taking data from formData
  public addManual<K extends keyof AutoTTRecArgs>(key: K, value: AutoTTRecArgs[K]) {
    this._autoTTRecArgs[key] = value;
  }

  // same value, different key name
  /*public addDifferentKey<
    T extends keyof AutoTTRecArgs,
    U extends keyof AutoTTRecConfigFormFieldTypes,
    V extends AutoTTRecArgs[T] & AutoTTRecConfigFormFieldTypes[U],    
    K1 extends keyof Record<T, V>,
    K2 extends keyof Record<U, V>
  >(autoTTRecKey: K1, formKey: K2) {
    this._autoTTRecArgs[autoTTRecKey] = this.formData[formKey];
  }*/

  public get autoTTRecArgs() {
    return this._autoTTRecArgs;
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

function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes) {
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
      argsBuilder.add("top-10-title");
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
  if (isOnMKChannel) {
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
      argsBuilder.addManual("speedometer-decimal-places", Number.parseInt(formData["speedometer-decimal-places-str"]));
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
  
    let outputWidth: number | null;
  
    if (formData["output-width-preset"] === "custom") {
      outputWidth = formData["output-width-custom"];
    } else if (formData["output-width-preset"] === "none") {
      outputWidth = null;
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

const DEBUG_PREFILLED_DEFAULTS = true;

const AutoTTRecConfigFormComponents_Memo = memo(AutoTTRecConfigFormComponents);
const AutoTTRecSubmitAbortButtons_Memo = memo(AutoTTRecSubmitAbortButtons);

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function AutoTTRecConfigForm(props: {
  whichUI: boolean, onSubmitCallback: (autoTTRecArgs: AutoTTRecArgs, setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>) => any,
  onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isAutoTTRecRunning: boolean}) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigForm");
  const formMethods = useForm<AutoTTRecConfigFormFieldTypes>({
    criteriaMode: "all",
    defaultValues: {
      "aspect-ratio-16-by-9": "auto",
      "audio-bitrate": 128000,
      "audio-bitrate-displayed": 128,
      "audio-bitrate-unit": "kbps",
      "audio-codec": "libopus",
      "background-music-source": DEBUG_PREFILLED_DEFAULTS ? "game-bgm" : "music-filename",
      "chadsoft-comparison-ghost-page": "",
      "chadsoft-ghost-page": DEBUG_PREFILLED_DEFAULTS ? "https://www.chadsoft.co.uk/time-trials/rkgd/D3/25/D29456963F8A9C5D7D9A8949118A19873EA6.html" : "",
      "comparison-ghost-filename": "",
      "comparison-ghost-source": "none",
      "crf-value": 15,
      "dolphin-resolution": DEBUG_PREFILLED_DEFAULTS ? "480p" : "1440p",
      "encode-only": false,
      "encode-size": 52428800,
      "encode-size-displayed": 50,
      "encode-size-unit": "mib",
      "encode-type": "crf",
      "ending-delay": 600,
      "extra-gecko-codes-enable": false,
      "extra-gecko-codes-contents": "",
      "extra-gecko-codes-filename": "",
      "extra-gecko-codes-unsaved": false,
      "extra-hq-textures-folder-enable": false,
      "extra-hq-textures-folder": "",
      "fade-in-at-start": false,
      "form-complexity": FormComplexity.SIMPLE,
      "game-volume-slider": 100,
      "game-volume-numberinput": 100,
      "h26x-preset": DEBUG_PREFILLED_DEFAULTS ? "ultrafast" : "slow",
      "hq-textures": true,
      "input-display": "auto",
      "input-display-dont-create": false,
      "iso-filename": DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\RMCE01.iso" : "",
      "keep-window": true,
      "main-ghost-filename": "",
      "main-ghost-source": "chadsoft",
      "mk-channel-ghost-description": "Ghost Data",
      "music-presentation": "normal",
      "music-filename": "",
      "music-volume-numberinput": 100,
      "music-volume-slider": 100,
      "no-background-blur": true,
      "no-bloom": false,
      "no-music": false,
      "no-top-10-category": "mkchannel",
      "output-video-filename": DEBUG_PREFILLED_DEFAULTS ? "C:\\Users\\User\\Documents\\RMCE 01\\guitest1.mp4" : "",
      "output-video-file-format": "mp4",
      "output-width-custom": NaN,
      "output-width-preset": DEBUG_PREFILLED_DEFAULTS ? "none" : "2560",
      "pixel-format": "yuv420p",
      "set-200cc": "no-200cc",
      "speedometer-decimal-places-str": "1",
      "speedometer-style": "fancy",
      "speedometer-metric": "engine",
      "szs-filename": "",
      "szs-source": "automatic",
      "timeline-category": "notop10",
      "top-10-chadsoft": "",
      "top-10-gecko-code-location-region": "worldwide",
      "top-10-gecko-code-contents": "",
      "top-10-gecko-code-filename": "",
      "top-10-gecko-code-unsaved": false,      
      "top-10-highlight-enable": true,
      "top-10-highlight": 1,
      "top-10-location-country-location": "Abkhazia",
      "top-10-location-region": "worldwide",
      "top-10-location-regional-location": "Europe",
      "top-10-title": "",
      "track-name": DEBUG_PREFILLED_DEFAULTS ? "Mario Circuit" : "",
      "track-name-type": "auto",
      "use-ffv1": false,
      "video-codec": "libx264",
      "youtube-settings": true,
    }
  });
  //console.log("formMethods:", formMethods);
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  let formState = formMethods.formState;

  const [stateTest, setStateTest] = useState(false);
  const [submittedToggle, setSubmittedToggle] = useState(false);

  async function onSubmit(formData: AutoTTRecConfigFormFieldTypes) {
    //setSubmittedToggle((submittedToggle) => !submittedToggle);
    console.log("onSubmit");
    formMethods.reset(undefined, {keepValues: true});
    console.log(formData);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    let autoTTRecArgs = convertFormDataToAutoTTRecArgs(formData);
    console.log("autoTTRecArgs:", autoTTRecArgs);
    console.log("formState.isSubmitSuccessful:", formState.isSubmitSuccessful);
    console.log("formState.isSubmitted:", formState.isSubmitted);
    await props.onSubmitCallback(autoTTRecArgs, setSubmittedToggle);
  }

  function onError(errors: Object) {
    console.log("errors:", errors);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    setSubmittedToggle((submittedToggle) => !submittedToggle);
    formMethods.reset(undefined, {keepValues: true, keepErrors: true});
  }

  function onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStateTest((stateTest) => !stateTest);
  }

  return (
    <div>
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <fieldset disabled={props.isAutoTTRecRunning}>
          {/*<AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={submittedToggle} isAutoTTRecRunning={props.isAutoTTRecRunning}/>*/}
          <AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={submittedToggle} isAutoTTRecRunning={props.isAutoTTRecRunning}/>
        </fieldset>
        <AutoTTRecSubmitAbortButtons_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} onAbortCallback={props.onAbortCallback}/>
      </form>
      {/*<input type="checkbox" id="state-test" checked={stateTest} onChange={onCheckChange}/>*/}
      {renderCounter}
    </div>
  );
}
