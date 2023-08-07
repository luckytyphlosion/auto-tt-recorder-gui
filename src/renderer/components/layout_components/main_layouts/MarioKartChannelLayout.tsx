import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";

import { ISOWBFSFileInput } from "../../form_components/ISOWBFSFileInput";
import { NoTop10CategoryLayout } from "../choice_layouts/NoTop10CategoryLayout";
import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
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
import { ExtraGeckoCodesEnableInput } from "../../form_components/ExtraGeckoCodesEnableInput";
import { AspectRatio16By9Input } from "../../form_components/AspectRatio16By9Input";
import { FadeInAtStartInput } from "../../form_components/FadeInAtStartInput";
import { EndingDelayInput } from "../../form_components/EndingDelayInput";
import { FormComplexity } from "../FormComplexityLayout";
import { QualitySettingsLayout } from "../sub_layouts/QualitySettingsLayout";
import { ExtraSettingsLayout } from "../sub_layouts/ExtraSettingsLayout";
import { PresentationSettingsLayout } from "../sub_layouts/PresentationSettingsLayout";
import { CRFValueInput } from "../../form_components/CRFValueInput";
import { GhostAndSZSSourceLayout } from "../sub_layouts/GhostAndSZSSourceLayout";
import { CustomizationSettingsLayout } from "../sub_layouts/CustomizationSettingsLayout";

import useRenderCounter from "../../../RenderCounter";

const TrackNameInput_Memo = memo(TrackNameInput);

export function MarioKartChannelLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const renderCounter = useRenderCounter(false, "MarioKartChannelLayout");

  return (
    <div>
      <GhostAndSZSSourceLayout/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <>
          <MKChannelGhostDescriptionInput/>
          <Top10LocationInput/>
          <TrackNameInput_Memo formComplexity={props.formComplexity}/>
        </> : <TrackNameInput_Memo formComplexity={props.formComplexity}/>
      }
      <br/>
      <BackgroundMusicSourceInput timeline="mkchannel" formComplexity={props.formComplexity}/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <CustomizationSettingsLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
      {
        props.formComplexity > FormComplexity.SIMPLE ? <SpeedometerInput/> : ""
      }
      <PresentationSettingsLayout formComplexity={props.formComplexity} enableFadeInAtStart={true}/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <EncodeSettingsLayout formComplexity={props.formComplexity}/>
        : ""
      }
      <QualitySettingsLayout formComplexity={props.formComplexity} isNoEncode={false}/>
      <ExtraSettingsLayout formComplexity={props.formComplexity}/>

      {renderCounter}

    </div>
  );
}
