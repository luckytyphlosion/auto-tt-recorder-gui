import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecConfigForm";

import { ISOWBFSFileInput } from "../form_components/ISOWBFSFileInput";
import { NoTop10CategoryLayout } from "./NoTop10CategoryLayout";
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
import { PixelFormatInput } from "../form_components/PixelFormatInput";
import { EncodeTypeInput } from "../form_components/EncodeTypeInput";
import { BackgroundMusicSourceInput } from "../form_components/BackgroundMusicSourceInput";
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
import { NoMusicInput } from "../form_components/NoMusicInput";

import useRenderCounter from "../../RenderCounter";

export function NoEncodeLayout() {
  const renderCounter = useRenderCounter(false, "NoEncodeLayout");

  return (
    <div>
      <MainGhostSourceInput/>
      <ComparisonGhostSourceInput/>
      <SZSSourceInput/>
      <NoMusicInput/>
      <SpeedometerInput/>
      <h3>Quality settings</h3>
      <DolphinResolutionInput enableOutputWidth={false}/>
      <HQTexturesInput/>
      <NoBackgroundBlurInput/>
      <NoBloomInput/>
      <h3>Extra settings (ignore if not sure)</h3>
      <UseFFV1Input/>
      <KeepWindowInput/>
      {renderCounter}

    </div>
  );
}
