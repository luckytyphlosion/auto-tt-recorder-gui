import React, { useState, ReactElement } from "react";
import { useFormContext } from "react-hook-form";

import { ISOWBFSFileInput } from "../form_components/ISOWBFSFileInput";
import { NoTop10CategoryInput } from "../form_components/NoTop10CategoryInput";
import { MainGhostSourceInput } from "../form_components/MainGhostSourceInput";
import { ChadsoftGhostPageInput } from "../form_components/ChadsoftGhostPageInput";
import { ComparisonGhostSourceInput } from "../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../form_components/SZSSourceInput";
import { MKChannelGhostDescriptionInput } from "../form_components/MKChannelGhostDescriptionInput";
import { TrackNameInput } from "../form_components/TrackNameInput";
import { QualityInput } from "../form_components/QualityInput";
import { OutputVideoFilenameInput } from "../form_components/OutputVideoFilenameInput";
import { Set200ccInput } from "../form_components/Set200ccInput";
import { Top10ChadsoftInput } from "../form_components/Top10ChadsoftInput";
import { Top10TitleInput } from "../form_components/Top10TitleInput";
import { Top10HighlightEnableInput } from "../form_components/Top10HighlightEnableInput";
import { EncodeTypeInput } from "../form_components/EncodeTypeInput";
import { BackgroundMusicInput } from "../form_components/BackgroundMusicInput";
import { GameVolumeInput } from "../form_components/GameVolumeInput";
import { Top10LocationInput } from "../form_components/Top10LocationInput";
import { InputDisplayInput } from "../form_components/InputDisplayInput";
import { SpeedometerInput } from "../form_components/SpeedometerInput";
import { HQTexturesInput } from "../form_components/HQTexturesInput";
import { NoBackgroundBlurInput } from "../form_components/NoBackgroundBlurInput";
import { NoBloomInput } from "../form_components/NoBloomInput";
import { UseFFV1Input } from "../form_components/UseFFV1Input";
import { EncodeOnlyInput } from "../form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "../form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "../form_components/KeepWindowInput";
import { YoutubeSettingsInput } from "../form_components/YoutubeSettingsInput";
import { DolphinResolutionInput } from "../form_components/DolphinResolutionInput";
import { TimelineCategoryInput } from "../form_components/TimelineCategoryInput";

import useRenderCounter from "../../RenderCounter";

export function MarioKartChannelLayout() {
  //const {register, getValues} = useFormContext();
  const [timelineCategory, setTimelineCategory] = useState("notop10");
  const renderCounter = useRenderCounter();

  return (
    <div>
      <MainGhostSourceInput/>
      <ComparisonGhostSourceInput/>
      <SZSSourceInput/>
      <Set200ccInput/>
      <MKChannelGhostDescriptionInput/>
      <TrackNameInput/>
      <Top10LocationInput/>
      <BackgroundMusicInput/>
      <GameVolumeInput/>
      <InputDisplayInput/>
      <SpeedometerInput/>
      <HQTexturesInput/>
      <NoBackgroundBlurInput/>
      <NoBloomInput/>
      <EncodeTypeInput/>
      <UseFFV1Input/>
      <EncodeOnlyInput/>
      <InputDisplayDontCreateInput/>
      <KeepWindowInput/>
      <YoutubeSettingsInput/>
      <DolphinResolutionInput/>
      <QualityInput/>
      <OutputVideoFilenameInput/>

    </div>
  );
}
