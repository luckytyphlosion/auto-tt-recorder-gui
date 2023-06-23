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

import { EncodeType, AudioCodec, AudioBitrateUnit, EncodeSizeUnit, MainGhostSource } from "../helper-types";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

defaultValues: {

}

export interface AutoTTRecConfigFormFieldTypes {
  "audio-bitrate": number,
  "audio-bitrate-displayed": number,
  "audio-bitrate-unit": AudioBitrateUnit,
  "audio-codec": AudioCodec,
  "background-music": string,
  "chadsoft-comparison-ghost-page": string,
  "chadsoft-ghost-page": string,
  "comparison-ghost-filename": string,
  "comparison-ghost-source": string,
  "crf-value": number,
  "dolphin-resolution": string,
  "encode-only": boolean,
  "encode-size": number,
  "encode-size-displayed": number,
  "encode-size-unit": EncodeSizeUnit,
  "encode-type": EncodeType,
  "game-volume-slider": number,
  "game-volume-numberinput": number,
  "h26x-preset": string,
  "hq-textures": boolean,
  "input-display": string,
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
  "pixel-format": string,
  "set-200cc": string,
  "speedometer-decimal-places": string,
  "speedometer-style": string,
  "speedometer-metric": string,
  "szs-filename": string,
  "szs-source": string,
  "timeline-category": string,
  "top-10-chadsoft": string,
  "top-10-highlight-enable": boolean,
  "top-10-highlight": number,
  "top-10-location-country-location": string,
  "top-10-location-region": string,
  "top-10-location-regional-location": string,
  "top-10-title": string,
  "track-name": string,
  "use-ffv1": boolean,
  "video-codec": string,
  "youtube-settings": boolean,
}


interface AutoTTRecArgs {
  "iso-filename": string,
  "main-ghost-filename"?: string,
  "chadsoft-ghost-page"?: string,
  "on-200cc"?: boolean

}

export function convertFormDataToAutoTTRecArgs(formData: AutoTTRecConfigFormFieldTypes) {
  let autoTTRecArgs: AutoTTRecArgs = {
    "iso-filename": formData["iso-filename"]
  };

  if (formData["main-ghost-source"] === "chadsoft") {
    autoTTRecArgs["chadsoft-ghost-page"] = formData["chadsoft-ghost-page"];
  } else if (formData["main-ghost-source"] === "rkg") {
    autoTTRecArgs["main-ghost-filename"] = formData["main-ghost-filename"];
    if (formData["set-200cc"] === "on-200cc") {
      autoTTRecArgs["on-200cc"] = true;
    }
  }

  //if (formData[""])

  return autoTTRecArgs;
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
      "background-music": "music-filename",
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
