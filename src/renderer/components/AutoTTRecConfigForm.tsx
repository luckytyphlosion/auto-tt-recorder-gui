import React, { useState, ReactNode, useEffect } from "react";

import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";

import { AudioCodec, AudioBitrateUnit, EncodeSizeUnit } from "../helper-types";

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

import { EncodeType } from "./form_components/EncodeTypeInput";
import { OutputVideoFileFormat } from "./form_components/OutputVideoFileFormatInput";
import { VideoCodec } from "./form_components/VideoCodecInput";

import { DolphinResolution } from "./form_components/DolphinResolutionInput";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

export interface AutoTTRecConfigFormFieldTypes {
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
  "game-volume-slider": number,
  "game-volume-numberinput": number,
  "h26x-preset": string,
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
  "no-top-10-category": string,
  "output-video-filename": string,
  "output-width-custom": number,
  "output-width-preset": string,
  "output-video-file-format": OutputVideoFileFormat,
  "pixel-format": string,
  "set-200cc": string,
  "speedometer-decimal-places": SpeedometerDecimalPlaces,
  "speedometer-style": SpeedometerStyle,
  "speedometer-metric": SpeedometerMetric,
  "szs-filename": string,
  "szs-source": SZSSource,
  "timeline-category": string,
  "top-10-chadsoft": string,
  "top-10-highlight-enable": boolean,
  "top-10-highlight": number,
  "top-10-location-country-location": Top10LocationCountry,
  "top-10-location-region": Top10LocationRegion,
  "top-10-location-regional-location": Top10LocationRegional,
  "top-10-title": string,
  "track-name": string,
  "use-ffv1": boolean,
  "video-codec": VideoCodec,
  "youtube-settings": boolean,
}

interface AutoTTRecArgs {
  "iso-filename": string,
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
  "speedometer-decimal-places"?: SpeedometerDecimalPlaces,
  "hq-textures"?: boolean,
  "no-background-blur"?: boolean,
  "no-bloom"?: boolean,
  "encode-type": EncodeType,
  "video-codec": VideoCodec
}

class AutoTTRecArgsBuilder {
  private _autoTTRecArgs: AutoTTRecArgs;
  private formData: AutoTTRecConfigFormFieldTypes;

  constructor(formData: AutoTTRecConfigFormFieldTypes) {
    this._autoTTRecArgs = {
      "iso-filename": "",
      "speedometer": "fancy",
      "encode-type": "crf",
      "video-codec": "libx264"
    };
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

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes) {
  let argsBuilder = new AutoTTRecArgsBuilder(formData);
  argsBuilder.add("iso-filename");

  if (formData["main-ghost-source"] === "chadsoft") {
    argsBuilder.add("chadsoft-ghost-page");
  } else if (formData["main-ghost-source"] === "rkg") {
    argsBuilder.add("main-ghost-filename");
    if (formData["set-200cc"] === "on-200cc") {
      argsBuilder.addManual("on-200cc", true);
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

  argsBuilder.add("mk-channel-ghost-description");
  argsBuilder.add("track-name");

  if (formData["top-10-location-region"] === "worldwide") {
    argsBuilder.addManual("top-10-location", "ww");
  } else if (formData["top-10-location-region"] === "regional") {
    argsBuilder.addManual("top-10-location", formData["top-10-location-regional-location"]);
  } else if (formData["top-10-location-region"] === "country") {
    argsBuilder.addManual("top-10-location", formData["top-10-location-country-location"]);
  }

  if (formData["background-music-source"] === "music-filename") {
    argsBuilder.add("music-filename");
    argsBuilder.addManual("game-volume", formData["game-volume-numberinput"]);
    argsBuilder.addManual("music-volume", formData["music-volume-numberinput"]);
  } else if (formData["background-music-source"] === "game-bgm") {
    argsBuilder.addManual("music-filename", "bgm");
  } else if (formData["background-music-source"] === "none") {
    argsBuilder.addManual("music-filename", "none");
  }

  argsBuilder.add("input-display");

  argsBuilder.addManual("speedometer", formData["speedometer-style"]);

  if (formData["speedometer-style"] !== "none") {
    argsBuilder.add("speedometer-metric");
    if (formData["speedometer-style"] === "fancy" || formData["speedometer-style"] === "regular") {
      argsBuilder.add("speedometer-decimal-places");
    }
  }

  argsBuilder.add("hq-textures");
  argsBuilder.add("no-background-blur");
  argsBuilder.add("no-bloom");

  argsBuilder.add("video-codec");

  return argsBuilder.autoTTRecArgs;
}

export function AutoTTRecConfigForm(props: {whichUI: boolean}) {  
  const renderCounter = useRenderCounter();
  const formMethods = useForm<AutoTTRecConfigFormFieldTypes>({
    criteriaMode: "all",
    defaultValues: {
      "audio-bitrate": 128000,
      "audio-bitrate-displayed": 128,
      "audio-bitrate-unit": "kbps",
      "audio-codec": "libopus",
      "background-music-source": "music-filename",
      "chadsoft-comparison-ghost-page": "",
      "chadsoft-ghost-page": "",
      "comparison-ghost-filename": "",
      "comparison-ghost-source": "none",
      "crf-value": 15,
      "dolphin-resolution": "1440p",
      "encode-only": false,
      "encode-size": 52428800,
      "encode-size-displayed": 50,
      "encode-size-unit": "mib",
      "encode-type": "crf",
      "game-volume-slider": 100,
      "game-volume-numberinput": 100,
      "h26x-preset": "slow",
      "hq-textures": true,
      "input-display": "gcn",
      "input-display-dont-create": false,
      "iso-filename": "",
      "keep-window": true,
      "main-ghost-filename": "",
      "main-ghost-source": "chadsoft",
      "mk-channel-ghost-description": "Ghost Data",
      "music-filename": "",
      "music-volume-numberinput": 100,
      "music-volume-slider": 100,
      "no-background-blur": true,
      "no-bloom": false,
      "no-top-10-category": "mkchannel",
      "output-video-filename": "",
      "output-width-custom": NaN,
      "output-width-preset": "2560",
      "pixel-format": "yuv420p",
      "set-200cc": "no-200cc",
      "speedometer-decimal-places": "1",
      "speedometer-style": "fancy",
      "speedometer-metric": "engine",
      "szs-filename": "",
      "szs-source": "automatic",
      "timeline-category": "notop10",
      "top-10-chadsoft": "",
      "top-10-highlight-enable": true,
      "top-10-highlight": 1,
      "top-10-location-country-location": "Abkhazia",
      "top-10-location-region": "worldwide",
      "top-10-location-regional-location": "Europe",
      "top-10-title": "",
      "track-name": "",
      "use-ffv1": false,
      "video-codec": "libx264",
      "youtube-settings": true,
    }
  });
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  const [errorData, setErrorData] = useState({});

  let formState = formMethods.formState;

  useEffect(() => {
    if (formState.isSubmitted && !formState.isSubmitSuccessful) {
      formMethods.reset(undefined, {keepValues: true, keepErrors: true});
    }
  }, [formState, errorData, formMethods.reset]);

  function onSubmit(formData: AutoTTRecConfigFormFieldTypes) {
    console.log(formData);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    let autoTTRecArgs = convertFormDataToAutoTTRecArgs(formData);
  }

  function onError(errors: Object) {
    console.log("errors:", errors);
    setErrorData(errors);
    //console.log("formMethods.formState.isSubmitSuccessful:", formMethods.formState.isSubmitSuccessful);
    //console.log("formMethods.formState.isSubmitted:", formMethods.formState.isSubmitted);
  }

  // <AutoTTRecConfigFormComponents/>
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
          <AutoTTRecConfigFormComponents whichUI={props.whichUI}/>
          <AutoTTRecSubmitAbortButtons/>
        </form>
      </FormProvider>
      {renderCounter}
    </div>
  );
}
