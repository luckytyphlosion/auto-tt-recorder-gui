import React, { useState } from "react";

import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponents2Props {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents2() {  
  const renderCounter = useRenderCounter();

  return (
    <>
      <ISOWBFSFileInput/>
      <ChadsoftGhostPageInput/>
      <OutputVideoFilenameInput/>
      {renderCounter}
    </>
  );
}
