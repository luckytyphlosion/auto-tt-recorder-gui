import React, { useState, ReactNode, useEffect, memo, useMemo, useCallback } from "react";

import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues, FormProviderProps, UseFormReturn } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";

import { EncodeSizeUnit } from "./form_components/EncodeSizeInput";

import { MainGhostSource } from "./form_components/MainGhostSourceInput";
import { ComparisonGhostSource } from "./form_components/ComparisonGhostSourceInput";
import { SZSSource } from "./form_components/SZSSourceInput";
import { Top10LocationRegion } from "./form_components/Top10LocationInput";

import { Top10LocationCountry } from "./form_components/Top10LocationCountryInput";
import { Top10LocationRegional } from "./form_components/Top10LocationRegionalInput";

import { BackgroundMusicSource } from "./form_components/BackgroundMusicSourceInput";

import { INPUT_DISPLAYS } from "./form_components/InputDisplayInput";
import { SpeedometerStyle } from "./form_components/SpeedometerInput";
import { SpeedometerMetric } from "./form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlaces } from "./form_components/SpeedometerDecimalPlacesInput";

import { EncodeType } from "./layout_components/choice_layouts/EncodeSettingsLayout";
import { OutputVideoFileFormat } from "./form_components/OutputVideoFileFormatInput";
import { VideoCodec } from "./form_components/VideoCodecInput";

import { DolphinResolution } from "./form_components/DolphinResolutionInput";
import { AudioCodec } from "./form_components/AudioCodecAndBitrateInput";
import { AudioBitrateUnit } from "./form_components/AudioBitrateInput";

import { H26xPreset } from "./form_components/H26xPresetInput";
import { OutputWidthPreset } from "./form_components/OutputWidthInput";

import { Top10GeckoCodeLocationRegion } from "./form_components/Top10GeckoCodeLocationInput";

import { TimelineCategory } from "./layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./layout_components/choice_layouts/NoTop10CategoryLayout";
import { AspectRatio16By9 } from "./form_components/AspectRatio16By9Input";
import { TrackNameType } from "./form_components/TrackNameInput";

import { MusicPresentation } from "./form_components/MusicPresentationInput";
import { FormComplexity } from "./layout_components/FormComplexityLayout";

import { ClearAllFields } from "./ClearAllFields";
import { ImportTemplate } from "./ImportTemplate";

import { AutoTTRecConfigFormFieldTypes, AutoTTRecArgs, Timeline, DEFAULT_FORM_VALUES, convertFormDataToAutoTTRecArgs } from "../AutoTTRecFormFieldsAndArgs";

import useRenderCounter from "../RenderCounter";

const AutoTTRecConfigFormComponents_Memo = memo(AutoTTRecConfigFormComponents);
const AutoTTRecSubmitAbortButtons_Memo = memo(AutoTTRecSubmitAbortButtons);

export function AutoTTRecConfigForm(
  props: {
    whichUI: boolean, onSubmitCallback: (autoTTRecArgs: AutoTTRecArgs, setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>) => any,
    onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isAutoTTRecRunning: boolean,
    formDefaultValues: AutoTTRecConfigFormFieldTypes,
    setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFieldTypes>>
  }
) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigForm");
  const formMethods = useForm<AutoTTRecConfigFormFieldTypes>({
    criteriaMode: "all",
    defaultValues: props.formDefaultValues
  });
  console.log("AutoTTRecConfigForm formState:", formMethods.formState);

  //console.log("formMethods:", formMethods);
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  let formState = formMethods.formState;

  const [stateTest, setStateTest] = useState(false);
  const [submittedToggle, setSubmittedToggle] = useState(false);

  async function onSubmit(formData: AutoTTRecConfigFormFieldTypes) {
    //setSubmittedToggle((submittedToggle) => !submittedToggle);
    console.log("onSubmit");
    formMethods.reset(undefined, {keepValues: true});
    console.log(formData);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    let autoTTRecArgs = convertFormDataToAutoTTRecArgs(formData);
    console.log("autoTTRecArgs:", autoTTRecArgs);
    console.log("formState.isSubmitSuccessful:", formState.isSubmitSuccessful);
    console.log("formState.isSubmitted:", formState.isSubmitted);
    await props.onSubmitCallback(autoTTRecArgs, setSubmittedToggle);
  }

  function onError(errors: Object) {
    console.log("errors:", errors);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    setSubmittedToggle((submittedToggle) => !submittedToggle);
    //props.setFormDefaultValues(DEFAULT_FORM_VALUES);
    formMethods.reset(undefined, {keepValues: true, keepErrors: true});
  }

  function onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStateTest((stateTest) => !stateTest);
  }

  return (
    <div>
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <ImportTemplate/>
        <ClearAllFields formMethods={formMethods} submittedToggle={submittedToggle} setSubmittedToggle={setSubmittedToggle} setFormDefaultValues={props.setFormDefaultValues}/>
        <fieldset disabled={props.isAutoTTRecRunning}>
          {/*<AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={submittedToggle} isAutoTTRecRunning={props.isAutoTTRecRunning}/>*/}
          <AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={submittedToggle} isAutoTTRecRunning={props.isAutoTTRecRunning}/>
        </fieldset>
        <AutoTTRecSubmitAbortButtons_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} onAbortCallback={props.onAbortCallback}/>
      </form>
      {/*<input type="checkbox" id="state-test" checked={stateTest} onChange={onCheckChange}/>*/}
      {renderCounter}
    </div>
  );
}
