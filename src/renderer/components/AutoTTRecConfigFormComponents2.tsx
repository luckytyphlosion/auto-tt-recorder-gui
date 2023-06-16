import React, { useState } from "react";

import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import ISOWBFSFileInput from "./form_components/ISOWBFSFileInput";
import ChadsoftGhostPageInput from "./form_components/ChadsoftGhostPageInput";
import TrackNameInput from "./form_components/TrackNameInput";
import QualityInput from "./form_components/QualityInput";
import OutputVideoFilenameInput from "./form_components/OutputVideoFilenameInput";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponents2Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents2(props: AutoTTRecConfigFormComponents2Props) {  
  const renderCounter = useRenderCounter();

  return (
    <div>
        <ISOWBFSFileInput register={props.register} setValue={props.setValue}/>
        <ChadsoftGhostPageInput register={props.register}/>
        <OutputVideoFilenameInput register={props.register} setValue={props.setValue}/>
        {renderCounter}
    </div>
  );
}
