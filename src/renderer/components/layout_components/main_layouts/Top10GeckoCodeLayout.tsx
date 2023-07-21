import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes } from "../../../AutoTTRecFormFieldsAndArgs";

import { Top10GeckoCodeInput } from "../../form_components/Top10GeckoCodeInput";
import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ChadsoftGhostPageInput } from "../../form_components/ChadsoftGhostPageInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { MKChannelGhostDescriptionInput } from "../../form_components/MKChannelGhostDescriptionInput";
import { TrackNameInput } from "../../form_components/TrackNameInput";
import { QualityInput } from "../../form_components/QualityInput";
import { OutputVideoFilenameInput } from "../../form_components/OutputVideoFilenameInput";
import { Set200ccInput } from "../../form_components/Set200ccInput";
import { Top10ChadsoftInput } from "../../form_components/Top10ChadsoftInput";
import { Top10TitleInput } from "../../form_components/Top10TitleInput";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { EncodeSettingsLayout } from "../choice_layouts/EncodeSettingsLayout";
import { BackgroundMusicSourceInput } from "../../form_components/BackgroundMusicSourceInput";
import { GameVolumeInput } from "../../form_components/GameVolumeInput";
import { Top10GeckoCodeLocationInput } from "../../form_components/Top10GeckoCodeLocationInput";
import { InputDisplayInput } from "../../form_components/InputDisplayInput";
import { SpeedometerInput } from "../../form_components/SpeedometerInput";
import { HQTexturesInput } from "../../form_components/HQTexturesInput";
import { NoBackgroundBlurInput } from "../../form_components/NoBackgroundBlurInput";
import { NoBloomInput } from "../../form_components/NoBloomInput";
import { UseFFV1Input } from "../../form_components/UseFFV1Input";
import { EncodeOnlyInput } from "../../form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "../../form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "../../form_components/KeepWindowInput";
import { YoutubeSettingsInput } from "../../form_components/YoutubeSettingsInput";
import { DolphinResolutionInput } from "../../form_components/DolphinResolutionInput";
import { TimelineCategoryLayout } from "../TimelineCategoryLayout";
import { MusicVolumeInput } from "../../form_components/MusicVolumeInput";
import { ExtraGeckoCodesEnableInput } from "../../form_components/ExtraGeckoCodesEnableInput";
import { QualitySettingsLayout } from "../sub_layouts/QualitySettingsLayout";
import { ExtraSettingsLayout } from "../sub_layouts/ExtraSettingsLayout";
import useRenderCounter from "../../../RenderCounter";
import { FadeInAtStartInput } from "../../form_components/FadeInAtStartInput";
import { EndingDelayInput } from "../../form_components/EndingDelayInput";
import { FormComplexity } from "../FormComplexityLayout";
import { PresentationSettingsLayout } from "../sub_layouts/PresentationSettingsLayout";
import { CRFValueInput } from "../../form_components/CRFValueInput";

/**/
export function Top10GeckoCodeLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const renderCounter = useRenderCounter(false, "Top10GeckoCodeLayout");

  return (
    <div>
      <MainGhostSourceInput/>
      <ComparisonGhostSourceInput/>
      <Top10GeckoCodeInput isAutoTTRecRunning={props.isAutoTTRecRunning}/>
      <SZSSourceInput/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <>
          <MKChannelGhostDescriptionInput/>
          <TrackNameInput/>
          <Top10GeckoCodeLocationInput/>
        </> : <TrackNameInput/>
      }
      <BackgroundMusicSourceInput timeline="top10" formComplexity={props.formComplexity}/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <>
          <InputDisplayInput/>
          <ExtraGeckoCodesEnableInput isAutoTTRecRunning={props.isAutoTTRecRunning}/>
          <SpeedometerInput/>
        </> : ""
      }
      <PresentationSettingsLayout formComplexity={props.formComplexity} enableFadeInAtStart={true}/>
      {
        props.formComplexity === FormComplexity.ALL ? <EncodeSettingsLayout/>
        : ""
      }
      <QualitySettingsLayout formComplexity={props.formComplexity} isNoEncode={false}/>
      <ExtraSettingsLayout formComplexity={props.formComplexity}/>
      {renderCounter}
      <OutputVideoFilenameInput noTop10CategoryIsNoEncode={false}/>
    </div>
  );
}