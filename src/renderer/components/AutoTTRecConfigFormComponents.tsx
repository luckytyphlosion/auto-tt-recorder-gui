import React, { memo } from "react";

import { FormProvider, UseFormReturn } from "react-hook-form";

import "../styles/AutoTTRecConfigFormComponents.css";

import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { MarioKartChannelLayout } from "./layout_components/MarioKartChannelLayout";
import { TimelineCategoryInput } from "./form_components/TimelineCategoryInput";
import { NoTop10CategoryLayout } from "./layout_components/NoTop10CategoryLayout";
import { Top10ChadsoftLayout } from "./layout_components/Top10ChadsoftLayout";
import { Top10GeckoCodeLayout } from "./layout_components/Top10GeckoCodeLayout";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";

import { AutoTTRecConfigFormFieldTypes } from "./AutoTTRecConfigForm";

import useRenderCounter from "../RenderCounter";

const ISOWBFSFileInput_Memo = memo(ISOWBFSFileInput);
const TimelineCategoryInput_Memo = memo(TimelineCategoryInput);

export function AutoTTRecConfigFormComponents(props: {
    formMethods: UseFormReturn<AutoTTRecConfigFormFieldTypes, any, undefined>,
    forceUpdate: boolean,
    isAutoTTRecRunning: boolean}) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormComponents");
  console.log("Rendering AutoTTRecConfigFormComponents. forceUpdate: ", props.forceUpdate);
  // remaining components
  // handling top 10 vs no top 10
  // top 10 censors
  // top 10 gecko code filename
  // dolphin volume

  return (
    <div className="auto-tt-rec-config-form">
      <FormProvider {...props.formMethods}>
        <ISOWBFSFileInput_Memo/>
        <TimelineCategoryInput_Memo noTop10Child={<NoTop10CategoryLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/>} top10ChadsoftChild={<Top10ChadsoftLayout  isAutoTTRecRunning={props.isAutoTTRecRunning}/>} top10GeckoChild={<Top10GeckoCodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/>}/>
        <OutputVideoFilenameInput/>
      {/*<TimelineCategoryInput noTop10Child={<NoTop10CategoryInput/>} top10ChadsoftChild={<div></div>} top10GeckoChild={<div></div>}/>*/}
      {/*<MainGhostFilenameInput arg={1}/>
      <ChadsoftGhostPageInput/>
      <ChadsoftComparisonGhostPageInput/>
      <SZSFilenameInput/>
      <Set200ccInput/>
      <MKChannelGhostDescriptionInput/>
      <TrackNameInput/>
      <Top10HighlightEnableInput/>
      <Top10HighlightInput/>
      <Top10ChadsoftInput/>
      <Top10TitleInput/>
      <Top10LocationInput/>
      <BackgroundMusicSourceInput/>
      <GameVolumeInput/>
      <InputDisplayInput/>
      <SpeedometerInput/>
      <HQTexturesInput/>
      <NoBackgroundBlurInput/>
      <NoBloomInput/>
      <UseFFV1Input/>
      <EncodeOnlyInput/>
      <InputDisplayDontCreateInput/>
      <KeepWindowInput/>
      <YoutubeSettingsInput/>
      <DolphinResolutionInput/>
      <QualityInput/>
      <OutputVideoFilenameInput/>*/}
        {renderCounter}
      </FormProvider>
    </div>
  );
}
