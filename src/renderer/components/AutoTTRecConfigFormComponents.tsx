import React, { memo, useState } from "react";



import "../styles/AutoTTRecConfigFormComponents.css";

import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { FormComplexityLayout } from "./layout_components/FormComplexityLayout";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";

import { ExpandUnselectedChoiceInputsInput } from "./form_components/ExpandUnselectedChoiceInputsInput";

import useRenderCounter from "../RenderCounter";

const ISOWBFSFileInput_Memo = memo(ISOWBFSFileInput);
const FormComplexityLayout_Memo = memo(FormComplexityLayout);

export function AutoTTRecConfigFormComponents(props: {
    formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
    forceUpdate: boolean,
    unrenderFormToggle: boolean,
    isAutoTTRecRunning: boolean,
    expandUnselectedChoiceInputs: boolean}) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormComponents");
  console.log("Rendering AutoTTRecConfigFormComponents. forceUpdate: ", props.forceUpdate);

  return (
    <div className="auto-tt-rec-config-form">
      <FormProvider {...props.formMethods}>
        <input type="hidden" {...props.formMethods.register("expand-unselected-choice-inputs")}/>
        <ISOWBFSFileInput_Memo/>
        <FormComplexityLayout_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} unrenderFormToggle={props.unrenderFormToggle}/>
        {renderCounter}
      </FormProvider>
    </div>
  );
}
