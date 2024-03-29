import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";

import { Top10GeckoCodeInput } from "../../form_components/Top10GeckoCodeInput";
import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ChadsoftGhostPageInput } from "../../form_components/ChadsoftGhostPageInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { MKChannelGhostDescriptionInput } from "../../form_components/MKChannelGhostDescriptionInput";
import { TrackNameTypeInput } from "../../form_components/TrackNameTypeInput";
import { OutputVideoFilenameInput } from "../../form_components/OutputVideoFilenameInput";
import { Set200ccInput } from "../../form_components/Set200ccInput";
import { Top10ChadsoftInput } from "../../form_components/Top10ChadsoftInput";
import { Top10TitleInput } from "../../form_components/Top10TitleInput";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { EncodeSettingsLayout } from "../choice_layouts/EncodeSettingsLayout";
import { BackgroundMusicSourceInputAndMusicLayout } from "../sub_layouts/BackgroundMusicSourceInputAndMusicLayout";
import { GameVolumeInput } from "../../form_components/GameVolumeInput";
import { Top10GeckoCodeLocationInput } from "../../form_components/Top10GeckoCodeLocationInput";
import { InputDisplayInput } from "../../form_components/InputDisplayInput";
import { SpeedometerStyleAndLayout } from "../sub_layouts/SpeedometerStyleAndLayout";
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
import { GhostAndSZSSourceLayout } from "../sub_layouts/GhostAndSZSSourceLayout";
import { CustomizationSettingsLayout } from "../sub_layouts/CustomizationSettingsLayout";
import { FieldsetOr } from "../../reusable_components/FieldsetOr";

const TrackNameInput_Memo = memo(TrackNameTypeInput);

export function Top10GeckoCodeLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const renderCounter = useRenderCounter(false, "Top10GeckoCodeLayout");

  return (
    <div>
      <GhostAndSZSSourceLayout/>

      <FieldsetOr>
        <legend>Timeline-specific presentation settings</legend>
        <Top10GeckoCodeInput isAutoTTRecRunning={props.isAutoTTRecRunning}/>
        <div className="like-input-group">
          {
            props.formComplexity > FormComplexity.SIMPLE ? <>
              <MKChannelGhostDescriptionInput/>
              <Top10GeckoCodeLocationInput/>
              <TrackNameInput_Memo formComplexity={props.formComplexity}/>
            </> : <TrackNameInput_Memo formComplexity={props.formComplexity}/>
          }
        </div>
      </FieldsetOr>

      <BackgroundMusicSourceInputAndMusicLayout timeline="top10" formComplexity={props.formComplexity}/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <CustomizationSettingsLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
      {
        props.formComplexity > FormComplexity.SIMPLE ? <SpeedometerStyleAndLayout/> : ""
      }
      <PresentationSettingsLayout formComplexity={props.formComplexity} enableFadeInAtStart={true}/>
      {
        props.formComplexity > FormComplexity.SIMPLE ? <EncodeSettingsLayout formComplexity={props.formComplexity}/>
        : ""
      }
      <QualitySettingsLayout formComplexity={props.formComplexity} isNoEncode={false}/>
      <ExtraSettingsLayout formComplexity={props.formComplexity} isNoEncode={false}/>
      {renderCounter}
      <OutputVideoFilenameInput noTop10CategoryIsNoEncode={false}/>
    </div>
  );
}