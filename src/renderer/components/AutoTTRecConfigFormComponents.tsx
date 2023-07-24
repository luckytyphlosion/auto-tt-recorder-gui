import React, { memo } from "react";



import "../styles/AutoTTRecConfigFormComponents.css";

import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { FormComplexityLayout } from "./layout_components/FormComplexityLayout";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecFormFieldsAndArgs";

import useRenderCounter from "../RenderCounter";

const ISOWBFSFileInput_Memo = memo(ISOWBFSFileInput);


export function AutoTTRecConfigFormComponents(props: {
    formMethods: UseFormReturn<AutoTTRecConfigFormFieldTypes, any, undefined>,
    forceUpdate: boolean,
    isAutoTTRecRunning: boolean}) {  
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormComponents");
  console.log("Rendering AutoTTRecConfigFormComponents. forceUpdate: ", props.forceUpdate);
  // remaining components
  // handling top 10 vs no top 10
  // top 10 censors
  // top 10 gecko code filename
  // dolphin volume

  return (
    <div className="auto-tt-rec-config-form">
      <FormProvider {...props.formMethods}>
        <ISOWBFSFileInput_Memo/>
        <FormComplexityLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/>
        {renderCounter}
      </FormProvider>
    </div>
  );
}
