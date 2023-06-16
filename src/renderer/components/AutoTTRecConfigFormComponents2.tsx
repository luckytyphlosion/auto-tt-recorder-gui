import React, { useState } from "react";

import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import ISOWBFSFileInput from "./form_components/ISOWBFSFileInput";
import ChadsoftGhostPageInput from "./form_components/ChadsoftGhostPageInput";
import TrackNameInput from "./form_components/TrackNameInput";
import QualityInput from "./form_components/QualityInput";
import OutputVideoFilenameInput from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponents2Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents2() {  
  const renderCounter = useRenderCounter();
  const {register, handleSubmit, setValue} = useForm();

  function onSubmit(d: any) {
    console.log(d);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ISOWBFSFileInput register={register} setValue={setValue}/>
      <ChadsoftGhostPageInput register={register}/>
      <OutputVideoFilenameInput register={register} setValue={setValue}/>
      {renderCounter}
      <AutoTTRecSubmitAbortButtons/>
    </form>
  );
}