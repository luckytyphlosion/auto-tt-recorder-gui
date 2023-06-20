import React, { useState, ReactNode } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";

import { EncodeType, AudioCodec, AudioBitrateUnit, EncodeSizeUnit } from "../helper-types";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

interface AutoTTRecConfigFormFieldTypes {
  "dolphin-resolution": string;
  "timeline-category": string;
  "no-top-10-category": string;
  "main-ghost-source": string;
  "szs-source": string;
  "background-music": string;
  "encode-type": EncodeType;
  "h26x-preset": string;
  "video-codec": string;
  "audio-codec": AudioCodec;
  "audio-bitrate-unit": AudioBitrateUnit;
  "audio-bitrate": number;
  "audio-bitrate-displayed": number;
  "encode-size": number;
  "encode-size-displayed": number;
  "encode-size-unit": EncodeSizeUnit;
}

export function AutoTTRecConfigForm(props: {whichUI: boolean}) {  
  const renderCounter = useRenderCounter();
  const formMethods = useForm<AutoTTRecConfigFormFieldTypes>({
    criteriaMode: "all",
    defaultValues: {
      "dolphin-resolution": "1440p",
      "timeline-category": "notop10",
      "no-top-10-category": "mkchannel",
      "main-ghost-source": "chadsoft",
      "szs-source": "automatic",
      "background-music": "bgm-music-filename",
      "encode-type": "crf",
      "h26x-preset": "slow",
      "video-codec": "libx264",
      "audio-codec": "libopus",
      "audio-bitrate-unit": "kbps",
      "audio-bitrate": 128000,
      "audio-bitrate-displayed": 128,
      "encode-size": 52428800,
      "encode-size-displayed": 50,
      "encode-size-unit": "mib"
    }
  });
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  function onSubmit(d: any) {
    console.log(d);
  }
  // <AutoTTRecConfigFormComponents/>
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <AutoTTRecConfigFormComponents whichUI={props.whichUI}/>
          <AutoTTRecSubmitAbortButtons/>
        </form>
      </FormProvider>
      {renderCounter}
    </div>
  );
}
