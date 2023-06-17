import React, { useState } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export function AutoTTRecConfigFormComponents() {  
  const renderCounter = useRenderCounter();

  return (
    <>
      <ISOWBFSFileInput/>
      <MainGhostFilenameInput/>
      <ChadsoftGhostPageInput/>
      <TrackNameInput/>
      <QualityInput/>
      <OutputVideoFilenameInput/>
      {renderCounter}
    </>
  );
}
