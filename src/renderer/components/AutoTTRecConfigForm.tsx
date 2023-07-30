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

import { shallowCopy } from "../../shared/util-shared";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormFieldsNoFILLME, AutoTTRecArgs, Timeline, DEFAULT_FORM_VALUES, convertFormDataToAutoTTRecArgs } from "../AutoTTRecFormFieldsAndArgs";

import useRenderCounter from "../RenderCounter";

const AutoTTRecConfigFormComponents_Memo = memo(AutoTTRecConfigFormComponents);
const AutoTTRecSubmitAbortButtons_Memo = memo(AutoTTRecSubmitAbortButtons);
const ClearAllFields_Memo = memo(ClearAllFields);
const ImportTemplate_Memo = memo(ImportTemplate);

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

function createUnFILLMEFormData(formData: Readonly<AutoTTRecConfigFormFields>) {
  let warningMessages: string[] = [];
  let formDataUnFILLME: AutoTTRecConfigFormFields = shallowCopy(formData);

  for (const [argName, argValue] of (Object.entries(formDataUnFILLME) as Entries<AutoTTRecConfigFormFields>)) {
    if (argValue === "<FILLME>") {
      warningMessages.push(`formData["${argName}"] was somehow <FILLME>! Defaulting to ${DEFAULT_FORM_VALUES[argName]} (this is an error within the program itself and not your fault, please contact the developer!)`);
      let x = argName;
      formDataUnFILLME[argName] = DEFAULT_FORM_VALUES[argName] as any;
    }
  }
  return formDataUnFILLME as AutoTTRecConfigFormFieldsNoFILLME;
}

type AutoTTRecConfigFormProps = {
  whichUI: boolean,
  onSubmitCallback: (autoTTRecArgs: AutoTTRecArgs, setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>) => any,
  onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isAutoTTRecRunning: boolean
  //setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFields>>
}

export function areAutoTTRecConfigFormPropsEqual(oldProps: AutoTTRecConfigFormProps, newProps: AutoTTRecConfigFormProps) {
  if (oldProps.whichUI === newProps.whichUI && oldProps.isAutoTTRecRunning === newProps.isAutoTTRecRunning) {
    return true;
  } else {
    return false;
  }
}

export function AutoTTRecConfigForm(
  props: AutoTTRecConfigFormProps
) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigForm");
  const formMethods = useForm<AutoTTRecConfigFormFields>({
    criteriaMode: "firstError",
    reValidateMode: "onSubmit",
    defaultValues: DEFAULT_FORM_VALUES
  });
  console.log("AutoTTRecConfigForm formState:", formMethods.formState.errors);
  //console.trace();
  //console.log("props:", props);

  //console.log("formMethods:", formMethods);
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  let formState = formMethods.formState;

  const [stateTest, setStateTest] = useState(false);
  const [submittedToggle, setSubmittedToggle] = useState(false);
  const [doNotTriggerRendersDueToErrors, setDoNotTriggerRendersDueToErrors] = useState(false);

  useEffect(() => {
    //setTimeout(() => {
      formMethods.reset(undefined, {keepValues: true, keepErrors: false});
    //}, 1000);
  }, [doNotTriggerRendersDueToErrors]);

  async function onSubmit(formData: AutoTTRecConfigFormFields) {
    //setSubmittedToggle((submittedToggle) => !submittedToggle);
    console.log("onSubmit");
    formMethods.reset(undefined, {keepValues: true, keepIsValid: true});
    console.log(formData);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    let unFILLMEformData = createUnFILLMEFormData(formData);
    let autoTTRecArgs = convertFormDataToAutoTTRecArgs(unFILLMEformData);
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
    setDoNotTriggerRendersDueToErrors((doNotTriggerRendersDueToErrors) => !doNotTriggerRendersDueToErrors);
    formMethods.reset(undefined, {keepValues: true, keepErrors: true});
  }

  return (
    <div>
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <ImportTemplate_Memo/>
        <ClearAllFields_Memo formMethods={formMethods} submittedToggle={submittedToggle} setSubmittedToggle={setSubmittedToggle} />
        <fieldset disabled={props.isAutoTTRecRunning}>
          <AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={submittedToggle} isAutoTTRecRunning={props.isAutoTTRecRunning}/>
        </fieldset>
        <AutoTTRecSubmitAbortButtons_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} onAbortCallback={props.onAbortCallback}/>
      </form>
      {renderCounter}
    </div>
  );
}
