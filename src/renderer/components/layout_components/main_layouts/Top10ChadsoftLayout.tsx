import React, { useState, ReactElement, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { useFormContext } from "react-hook-form";

import { ISOWBFSFileInput } from "../../form_components/ISOWBFSFileInput";
import { NoTop10CategoryLayout } from "../choice_layouts/NoTop10CategoryLayout";
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
import { Top10LocationInput } from "../../form_components/Top10LocationInput";
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
import { CustomizationSettingsLayout } from "../sub_layouts/CustomizationSettingsLayout";
import { FieldsetOr } from "../../reusable_components/FieldsetOr";
import { EmptyGridRow } from "../../reusable_components/EmptyGridRow";

import useRenderCounter from "../../../RenderCounter";

const TrackNameInput_Memo = memo(TrackNameTypeInput);

export function Top10ChadsoftLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const [timelineCategory, setTimelineCategory] = useState("notop10");
  const renderCounter = useRenderCounter(false, "MarioKartChannelLayout");

  return (
    <div>
      <FieldsetOr>
        <legend>Ghosts and Track SZS</legend>
        <div className="like-input-group">
          <Top10ChadsoftInput/>
          <ComparisonGhostSourceInput/>
          <SZSSourceInput/>
          {
            props.formComplexity > FormComplexity.SIMPLE ? <>
              <EmptyGridRow padding="0.25em"/>
              <Top10HighlightEnableInput/>
            </> : ""
          }
        </div>
      </FieldsetOr>

      <FieldsetOr>
        <legend>Timeline-specific presentation settings</legend>
        <div className="like-input-group">
          {
            props.formComplexity > FormComplexity.SIMPLE ? 
            <MKChannelGhostDescriptionInput/> : ""
          }

          <Top10TitleInput/>

          {
            props.formComplexity > FormComplexity.SIMPLE ? <Top10LocationInput/> : ""
          }

          {
            props.formComplexity > FormComplexity.SIMPLE ? <>
              
              <TrackNameInput_Memo formComplexity={props.formComplexity}/>
            </> : <TrackNameInput_Memo formComplexity={props.formComplexity}/>
          }
          {
            props.formComplexity === FormComplexity.ALL ? <Top10CensorsInput/> : ""
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