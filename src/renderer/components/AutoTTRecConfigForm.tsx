import React, { useState, ReactNode } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import ISOWBFSFileInput from "./form_components/ISOWBFSFileInput";
import ChadsoftGhostPageInput from "./form_components/ChadsoftGhostPageInput";
import TrackNameInput from "./form_components/TrackNameInput";
import QualityInput from "./form_components/QualityInput";
import OutputVideoFilenameInput from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

export function AutoTTRecConfigForm(formComponents: ChildrenProps) {  
  const renderCounter = useRenderCounter();
  const formMethods = useForm();

  function onSubmit(d: any) {
    console.log(d);
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {formComponents.children}
        {renderCounter}
        <AutoTTRecSubmitAbortButtons/>
      </form>
    </FormProvider>
  );
}
