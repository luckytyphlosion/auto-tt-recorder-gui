import React, { useState, useRef, ReactNode, useEffect, memo, useMemo, useCallback } from "react";

import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues, FormProviderProps, UseFormReturn } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameTypeInput } from "./form_components/TrackNameTypeInput";
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

import { BackgroundMusicSource } from "./layout_components/sub_layouts/BackgroundMusicSourceInputAndMusicLayout";

import { INPUT_DISPLAYS } from "./form_components/InputDisplayInput";
import { SpeedometerStyle } from "./layout_components/sub_layouts/SpeedometerStyleAndLayout";
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
import { TrackNameType } from "./form_components/TrackNameTypeInput";

import { MusicPresentation } from "./form_components/MusicPresentationInput";
import { FormComplexity } from "./layout_components/FormComplexityLayout";

import { ClearAllFields } from "./ClearAllFields";
import { ImportTemplate } from "./ImportTemplate";
import { ExpandUnselectedChoiceInputs } from "./ExpandUnselectedChoiceInputs";
import { LoadFormInputsTypeSelect } from "./LoadFormInputsTypeSelect";
import { ValidateFormOnOpen } from "./ValidateFormOnOpen";

import { shallowCopy } from "../../shared/util-shared";
import { LoadFormInputsType } from "../../shared/shared-types";

import { DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldsNoFILLME } from "../auto-tt-rec-form-field-types";
import { convertFormDataToAutoTTRecArgs } from "../auto-tt-rec-args-builder";
import { getInitialFormData } from "../import-template-on-program-open";

import { AutoTTRecArgs } from "../auto-tt-rec-args-types";
import { tryExportAutoTTRecConfigTemplate } from "../auto-tt-rec-form-data-generators";
import useRenderCounter from "../RenderCounter";

const AutoTTRecConfigFormComponents_Memo = memo(AutoTTRecConfigFormComponents);
const AutoTTRecSubmitAbortButtons_Memo = memo(AutoTTRecSubmitAbortButtons);
const ExpandUnselectedChoiceInputs_Memo = memo(ExpandUnselectedChoiceInputs);
const ClearAllFields_Memo = memo(ClearAllFields);
const ImportTemplate_Memo = memo(ImportTemplate);

export let globalValidateFormOnOpen: boolean;

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
  onSubmitCallback: (autoTTRecArgs: AutoTTRecArgs, setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>, resetForm: () => void) => any,
  onAbortCallback: (event: React.MouseEvent<HTMLButtonElement>) => void,
  isAutoTTRecRunning: boolean,
  initialLoadFormInputsType: LoadFormInputsType,
  INITIAL_FORM_DATA: AutoTTRecConfigFormFields,
  validateFormOnOpen: boolean
  //setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFields>>
}

export function areAutoTTRecConfigFormPropsEqual(oldProps: AutoTTRecConfigFormProps, newProps: AutoTTRecConfigFormProps) {
  if (oldProps.whichUI === newProps.whichUI && oldProps.isAutoTTRecRunning === newProps.isAutoTTRecRunning) {
    return true;
  } else {
    return false;
  }
}

enum ValidationSubmitState {
  NOT_VALIDATING = 0,
  DO_RESET
}

export function AutoTTRecConfigForm(
  props: AutoTTRecConfigFormProps
) {
  globalValidateFormOnOpen = props.validateFormOnOpen;

  const renderCounter = useRenderCounter(false, "AutoTTRecConfigForm");
  const formMethods = useForm<AutoTTRecConfigFormFields>({
    criteriaMode: "all",
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: props.INITIAL_FORM_DATA
  });
  //console.log("AutoTTRecConfigForm formState.isSubmitted:", formMethods.formState.isSubmitted);
  //console.trace();
  //console.log("props:", props);

  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;
  const [unrenderFormToggle, setUnrenderFormToggle] = useState(false);
  const [forceUpdateToggle, setForceUpdateToggle] = useState(false);
  const [validateFormViaSubmit_keepErrors, setValidateFormViaSubmit_keepErrors] = useState(false);
  const [initialValidationStateNum, setInitialValidationStateNum] = useState<ValidationSubmitState>(ValidationSubmitState.NOT_VALIDATING);
  const [savedScrollYForValidateFormViaSubmit, setSavedScrollYForValidateFormViaSubmit] = useState<number | undefined>(undefined);

  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  //console.log("AutoTTRecConfigForm renderCount:", renderCount.current, ", forceUpdateToggle:", forceUpdateToggle);

  let formState = formMethods.formState;
  console.log(`[${renderCount.current}] AutoTTRecConfigForm formMethods:`, formMethods, ", forceUpdateToggle:", forceUpdateToggle, ", formState.isSubmitSuccessful:", formState.isSubmitSuccessful);

  const validateFormViaSubmitSync = useCallback(function (keepErrors: boolean, keepScroll?: boolean) {
    //function validateFormViaSubmitSync(keepErrors: boolean) {
      // function resetFormKeepErrors(errors: Object) {
      //   console.log("resetFormKeepErrors formState.submitCount:", formState.submitCount);
      //   //setSubmitCountOnLastValidateSubmit(formState.submitCount);
      //   //setValidateFormViaSubmit_keepErrors(true);
      //   formMethods.reset(undefined, {keepValues: true, keepErrors: true, keepSubmitCount: true});
      // }

      // function resetFormClearErrors(errors: Object) {
      //   console.log("resetFormClearErrors formState.submitCount:", formState.submitCount);
      //   //setSubmitCountOnLastValidateSubmit(formState.submitCount);
      //   //setValidateFormViaSubmit_keepErrors(false);
      //   formMethods.reset(undefined, {keepValues: true, keepErrors: false, keepSubmitCount: true});
      // }

      async function validateFormViaSubmit(keepErrors: boolean) {
        const handleSubmitForValidation = formMethods.handleSubmit(() => {}, () => {});
        await handleSubmitForValidation();
      }

      const savedScrollY = window.scrollY;

      console.log("in validateFormViaSubmitSync: keepErrors: ", keepErrors);
      validateFormViaSubmit(keepErrors).then(() => {
        setValidateFormViaSubmit_keepErrors(keepErrors);
        setInitialValidationStateNum(ValidationSubmitState.DO_RESET);
        if (keepScroll === true) {
          setSavedScrollYForValidateFormViaSubmit(savedScrollY);
        }
      });/*.then(() => {
        setForceUpdateToggle((oldForceUpdateToggle) => {
          console.log("in setForceUpdateToggle oldForceUpdateToggle:", oldForceUpdateToggle, "->", !oldForceUpdateToggle);
          return !oldForceUpdateToggle;
        });
      });*/
    //}
  }, []);

  const validateAndDisplayFormErrorsViaSubmitSync = useCallback(() => {
    validateFormViaSubmitSync(true, true);
  }, [validateFormViaSubmitSync]);

  useEffect(() => {
    validateFormViaSubmitSync(props.validateFormOnOpen);
  }, []);

  useEffect(() => {
    if (initialValidationStateNum === ValidationSubmitState.DO_RESET) {
      if (savedScrollYForValidateFormViaSubmit !== undefined) {
        window.scroll({top: savedScrollYForValidateFormViaSubmit});
      }
      formMethods.reset(undefined, {keepValues: true, keepErrors: validateFormViaSubmit_keepErrors, keepSubmitCount: true});
      //console.log("validateFormViaSubmit_keepErrors:", validateFormViaSubmit_keepErrors);
      setForceUpdateToggle((oldForceUpdateToggle) => {
        //console.log("in setForceUpdateToggle oldForceUpdateToggle:", oldForceUpdateToggle, "->", !oldForceUpdateToggle);
        return !oldForceUpdateToggle;
      });
      setInitialValidationStateNum(ValidationSubmitState.NOT_VALIDATING);
    }
  }, [initialValidationStateNum]);

  /*
  useEffect(() => {
    let submitCount = formState.submitCount;
    console.log("submitCountOnLastValidateSubmit:", submitCountOnLastValidateSubmit, ", submitCount:", submitCount);
  }, [submitCountOnLastValidateSubmit]);
  */

  /*const getRunAutoTTRecOnSubmitCallback = () => {
    return formMethods.handleSubmit(onSubmit, onError);
  };*/

  //const formOnSubmitCallbackRef = useRef<() => React.FormEventHandler<HTMLFormElement>>(getRunAutoTTRecOnSubmitCallback);

  //

  // const setRunAutoTTRecOnSubmitCallback = useCallback(() => {
  //   formOnSubmitCallbackRef.current = runAutoTTRecOnSubmitCallback;
  // }, []);

  // const setValidateFormArgsOnlyOnSubmitCallback = useCallback(() => {
  //   formOnSubmitCallbackRef.current = validateFormArgsOnlyOnSubmitCallback;
  // }, []);



  //const [doNotTriggerRendersDueToErrors, setDoNotTriggerRendersDueToErrors] = useState(false);

  //console.log("submittedToggle: ", submittedToggle);

  // useEffect(() => {
  //   setTimeout(() => {
  //     formMethods.reset(undefined, {keepValues: true, keepErrors: false});
  //   }, 1000);
  // }, [doNotTriggerRendersDueToErrors]);

  //if (props.validateFormOnOpen) {
  /*useEffect(() => {
    // very unstable hack. figure out how to fix this
    if (formState.submitCount === 2) {
      console.log("in AutoTTRecConfigForm useEffect, formState.submitCount:", formState.submitCount);
      setForceUpdateToggle((forceUpdateToggle) => (!forceUpdateToggle));
    }
  }, [formState.submitCount]);*/
  //}

  // I tried figuring out why a form reset had to be done
  // for error messages to show up before submitting the form
  // but I was unable to, so we have to submit the form on open
  // so that error messages show.
  


  // const validateFormViaSubmit = useCallback(async function (keepErrors: boolean) {
  //   const handleSubmitForValidation = formMethods.handleSubmit(() => {}, keepErrors ? resetFormKeepErrors : resetFormClearErrors);
  //   await handleSubmitForValidation();
  // }, []);

  async function onSubmit(formData: AutoTTRecConfigFormFields) {
    console.log("AutoTTRecConfigForm onSubmit");
    let lastRecordedTemplateFilename = await window.api.getLastRecordedTemplateFilename();
    await tryExportAutoTTRecConfigTemplate(formData, lastRecordedTemplateFilename);
    console.log("formState: isSubmitSuccessful:", formState.isSubmitSuccessful, ", isSubmitted:", formState.isSubmitted, ", isSubmitting:", formState.isSubmitting);

    formMethods.reset(undefined, {keepValues: true, keepIsValid: true, keepSubmitCount: true, keepIsSubmitted: true});
    formMethods.setValue("is-submitting", true);
    //console.log(formData);
    console.log("formState.dirtyFields:", formState.dirtyFields);
    console.log("formState.touchedFields:", formState.touchedFields);
    let unFILLMEformData = createUnFILLMEFormData(formData);
    let autoTTRecArgs = convertFormDataToAutoTTRecArgs(unFILLMEformData);
    console.log("autoTTRecArgs:", autoTTRecArgs);

    await props.onSubmitCallback(autoTTRecArgs, setForceUpdateToggle, () => {
      formMethods.reset(undefined, {keepValues: true, keepIsValid: true, keepSubmitCount: true});
      formMethods.setValue("is-submitting", false);
    });
  }

  const onError = useCallback(async function (errors: Object) {
    let lastRecordedTemplateFilename = await window.api.getLastRecordedTemplateFilename();
    let formData = formMethods.getValues();
    await tryExportAutoTTRecConfigTemplate(formData, lastRecordedTemplateFilename);
    console.log("errors in onError:", errors);
    setForceUpdateToggle((forceUpdateToggle) => (!forceUpdateToggle));
    //console.log("formState.dirtyFields:", formState.dirtyFields);
    //console.log("formState.touchedFields:", formState.touchedFields);
    formMethods.reset(undefined, {keepValues: true, keepErrors: true, keepSubmitCount: true});
  }, []);

  //const autoTTRecConfigFormComponentsMemoElement = ;

  /*useEffect(() => {
    //console.log("AutoTTRecConfigFormComponents useEffect renderCount:", renderCount.current);
    if (props.formMethods.formState.submitCount === 0) {
      // I tried figuring out why a form reset had to be done for error messages to show up
      // before submitting the form
      // but I was unable to
      // so we have to submit the form on open so that error messages show
      // validate form on open just controls whether to show the errors
      console.log("Do form submission at start:", formMethods.formState, ", submitCount:", props.formMethods.formState.submitCount);
      props.validateFormViaSubmitSync(props.validateFormOnOpen);
    }
  }, [props.validateFormOnOpen]);*/

  /*if (initialValidationStateNum === ValidationSubmitState.UNVALIDATED) {
    return <div></div>;
  }*/

  return (
    <div>
      <form onSubmit={formMethods.handleSubmit(onSubmit, onError)}>
        <LoadFormInputsTypeSelect disabled={props.isAutoTTRecRunning} initialValue={props.initialLoadFormInputsType}/>
        <br/>
        <strong>Other program settings:</strong>
        <ValidateFormOnOpen disabled={props.isAutoTTRecRunning} initialValue={props.validateFormOnOpen}/>
        <ExpandUnselectedChoiceInputs_Memo disabled={props.isAutoTTRecRunning} formMethods={formMethods} validateAndDisplayFormErrorsViaSubmitSync={validateAndDisplayFormErrorsViaSubmitSync}/>
  <br/>
        <ImportTemplate_Memo disabled={props.isAutoTTRecRunning} formMethods={formMethods} setUnrenderFormToggle={setUnrenderFormToggle} onError={onError}/>
        <ClearAllFields_Memo disabled={props.isAutoTTRecRunning} formMethods={formMethods} setUnrenderFormToggle={setUnrenderFormToggle}/>
        <fieldset disabled={props.isAutoTTRecRunning}>
          <AutoTTRecConfigFormComponents_Memo formMethods={formMethods} forceUpdate={forceUpdateToggle} unrenderFormToggle={unrenderFormToggle} isAutoTTRecRunning={props.isAutoTTRecRunning} initialValidateFormOnOpen={props.validateFormOnOpen} validateAndDisplayFormErrorsViaSubmitSync={validateAndDisplayFormErrorsViaSubmitSync}/>
        </fieldset>
        <AutoTTRecSubmitAbortButtons_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} onAbortCallback={props.onAbortCallback} setRunAutoTTRecOnSubmitCallback={(() => {}) as any}/>
      </form>
      {renderCounter}
    </div>
  );
}
