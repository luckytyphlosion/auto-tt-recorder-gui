import React, { memo, useState, useCallback, useEffect, useRef } from "react";



import "../styles/AutoTTRecConfigFormComponents.css";

import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { FormComplexityLayout } from "./layout_components/FormComplexityLayout";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";

import useRenderCounter from "../RenderCounter";

const ISOWBFSFileInput_Memo = memo(ISOWBFSFileInput);
const FormComplexityLayout_Memo = memo(FormComplexityLayout);

export function AutoTTRecConfigFormComponents(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  forceUpdate: boolean,
  unrenderFormToggle: boolean,
  isAutoTTRecRunning: boolean,
  initialValidateFormOnOpen: boolean
}) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormComponents");
  //console.log("Rendering AutoTTRecConfigFormComponents. forceUpdate: ", props.forceUpdate);

  /*useEffect(() => {
    //console.log("AutoTTRecConfigFormComponents useEffect renderCount:", renderCount.current);
    if (props.formMethods.formState.submitCount === 0) {
      // I tried figuring out why a form reset had to be done for error messages to show up
      // before submitting the form
      // but I was unable to
      // so we have to submit the form on open so that error messages show
      // validate form on open just controls whether to show the errors
      console.log("Do form submission at start:", props.formMethods.formState, ", submitCount:", props.formMethods.formState.submitCount);
      props.validateFormViaSubmitSync(props.initialValidateFormOnOpen);
    }
  }, [props.initialValidateFormOnOpen]);*/
  
  return (
    <div className="auto-tt-rec-config-form">
      <FormProvider {...props.formMethods}>
        <input type="hidden" {...props.formMethods.register("expand-unselected-choice-inputs")}/>
        <input type="hidden" {...props.formMethods.register("is-submitting")}/>
        <ISOWBFSFileInput_Memo/>
        <FormComplexityLayout_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} unrenderFormToggle={props.unrenderFormToggle}/>
        {renderCounter}
      </FormProvider>
    </div>
  );
}
