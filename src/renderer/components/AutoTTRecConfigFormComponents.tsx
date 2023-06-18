import React, { useState } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { SetTimelineInput } from "./form_components/SetTimelineInput";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { ChadsoftComparisonGhostPageInput } from "./form_components/ChadsoftComparisonGhostPageInput";
import { SZSFilenameInput } from "./form_components/SZSFilenameInput";
import { MKChannelGhostDescriptionInput } from "./form_components/MKChannelGhostDescriptionInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import { Set200ccInput } from "./form_components/Set200ccInput";
import { Top10ChadsoftInput } from "./form_components/Top10ChadsoftInput";
import { Top10TitleInput } from "./form_components/Top10TitleInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents(props: {whichUI: boolean}) {  
  const renderCounter = useRenderCounter();

  return (
    <>
      
      <SetTimelineInput/>
      <MainGhostFilenameInput arg={1}/>
      <ChadsoftGhostPageInput/>
      <ChadsoftComparisonGhostPageInput/>
      <SZSFilenameInput/>
      <Set200ccInput/>
      <MKChannelGhostDescriptionInput/>
      <TrackNameInput/>
      <Top10ChadsoftInput/>
      <Top10TitleInput/>
      <QualityInput/>
      <OutputVideoFilenameInput/>
      {renderCounter}
    </>
  );
}
