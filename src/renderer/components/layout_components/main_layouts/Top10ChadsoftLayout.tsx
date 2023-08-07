import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";

import { ISOWBFSFileInput } from "../../form_components/ISOWBFSFileInput";
import { NoTop10CategoryLayout } from "../choice_layouts/NoTop10CategoryLayout";
import { ChadsoftGhostPageInput } from "../../form_components/ChadsoftGhostPageInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { MKChannelGhostDescriptionInput } from "../../form_components/MKChannelGhostDescriptionInput";
import { TrackNameInput } from "../../form_components/TrackNameInput";
import { OutputVideoFilenameInput } from "../../form_components/OutputVideoFilenameInput";
import { Set200ccInput } from "../../form_components/Set200ccInput";
import { Top10ChadsoftInput } from "../../form_components/Top10ChadsoftInput";
import { Top10TitleInput } from "../../form_components/Top10TitleInput";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { EncodeSettingsLayout } from "../choice_layouts/EncodeSettingsLayout";
import { BackgroundMusicSourceInput } from "../../form_components/BackgroundMusicSourceInput";
import { GameVolumeInput } from "../../form_components/GameVolumeInput";
import { Top10LocationInput } from "../../form_components/Top10LocationInput";
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
import { Top10HighlightEnableInput } from "../../form_components/Top10HighlightEnableInput";
import { ExtraGeckoCodesEnableInput } from "../../form_components/ExtraGeckoCodesEnableInput";
import { AspectRatio16By9Input } from "../../form_components/AspectRatio16By9Input";
import { FadeInAtStartInput } from "../../form_components/FadeInAtStartInput";
import { EndingDelayInput } from "../../form_components/EndingDelayInput";
import { FormComplexity } from "../FormComplexityLayout";
import { QualitySettingsLayout } from "../sub_layouts/QualitySettingsLayout";
import { ExtraSettingsLayout } from "../sub_layouts/ExtraSettingsLayout";
import { PresentationSettingsLayout } from "../sub_layouts/PresentationSettingsLayout";
import { Top10CensorsInput } from "../../form_components/Top10CensorsInput";

import useRenderCounter from "../../../RenderCounter";

const TrackNameInput_Memo = memo(TrackNameInput);

export function Top10ChadsoftLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const [timelineCategory, setTimelineCategory] = useState("notop10");
  const renderCounter = useRenderCounter(false, "MarioKartChannelLayout");

  return (
    <div>
      <Top10ChadsoftInput/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <>
          <Top10HighlightEnableInput/>
        </> : ""
      }
      <ComparisonGhostSourceInput/>
      <SZSSourceInput/>

      <Top10TitleInput/>
      {
        props.formComplexity === FormComplexity.ALL ? <Top10CensorsInput/> : ""
      }
      
      
      {
        props.formComplexity > FormComplexity.SIMPLE ? <>
          <MKChannelGhostDescriptionInput/>
          <TrackNameInput_Memo formComplexity={props.formComplexity}/>
          <Top10LocationInput/>
        </> : <TrackNameInput_Memo formComplexity={props.formComplexity}/>
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
        props.formComplexity > FormComplexity.SIMPLE ? <EncodeSettingsLayout formComplexity={props.formComplexity}/>
        : ""
      }
      <QualitySettingsLayout formComplexity={props.formComplexity} isNoEncode={false}/>
      <ExtraSettingsLayout formComplexity={props.formComplexity}/>
      {renderCounter}
      <OutputVideoFilenameInput noTop10CategoryIsNoEncode={false}/>

    </div>
  );
}