import React, { useState } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import "../styles/AutoTTRecConfigFormComponents.css";

import { MarioKartChannelLayout } from "./layout_components/MarioKartChannelLayout";
import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { NoTop10CategoryInput } from "./form_components/NoTop10CategoryInput";
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
import { Top10HighlightEnableInput } from "./form_components/Top10HighlightEnableInput";
import { Top10HighlightInput } from "./form_components/Top10HighlightInput";
import { BackgroundMusicSourceInput } from "./form_components/BackgroundMusicSourceInput";
import { GameVolumeInput } from "./form_components/GameVolumeInput";
import { Top10LocationInput } from "./form_components/Top10LocationInput";
import { InputDisplayInput } from "./form_components/InputDisplayInput";
import { SpeedometerInput } from "./form_components/SpeedometerInput";
import { HQTexturesInput } from "./form_components/HQTexturesInput";
import { NoBackgroundBlurInput } from "./form_components/NoBackgroundBlurInput";
import { NoBloomInput } from "./form_components/NoBloomInput";
import { UseFFV1Input } from "./form_components/UseFFV1Input";
import { EncodeOnlyInput } from "./form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "./form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "./form_components/KeepWindowInput";
import { YoutubeSettingsInput } from "./form_components/YoutubeSettingsInput";
import { DolphinResolutionInput } from "./form_components/DolphinResolutionInput";
import { TimelineCategoryInput } from "./form_components/TimelineCategoryInput";

import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents() {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormComponents");

  // remaining components
  // handling top 10 vs no top 10
  // top 10 censors
  // top 10 gecko code filename
  // music volume
  // dolphin volume
  // cache settings

  return (
    <>
      <ISOWBFSFileInput/>
      <MarioKartChannelLayout/>
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
    </>
  );
}
