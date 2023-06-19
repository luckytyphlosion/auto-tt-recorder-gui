import React, { useState, ReactNode } from "react";

import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import { useForm, FormProvider, UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

import { ISOWBFSFileInput } from "./form_components/ISOWBFSFileInput";
import { ChadsoftGhostPageInput } from "./form_components/ChadsoftGhostPageInput";
import { TrackNameInput } from "./form_components/TrackNameInput";
import { QualityInput } from "./form_components/QualityInput";
import { OutputVideoFilenameInput } from "./form_components/OutputVideoFilenameInput";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { MainGhostFilenameInput } from "./form_components/MainGhostFilenameInput";

import useRenderCounter from "../RenderCounter";

interface AutoTTRecConfigFormComponentsProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

type ChildrenProps = {
  children: ReactNode
}

export function AutoTTRecConfigForm(props: {whichUI: boolean}) {  
  const renderCounter = useRenderCounter();
  const formMethods = useForm({
    criteriaMode: "all",
    defaultValues: {
      "dolphin-resolution": "1440p",
      "timeline-category": "notop10",
      "no-top-10-category": "mkchannel",
      "main-ghost-source": "chadsoft",
      "szs-source": "automatic",
      "background-music": "bgm-music-filename"
    }
  });
  //const isoWbfsFileInput = <ISOWBFSFileInput/>;
  //const mainGhostFilenameInput = <MainGhostFilenameInput arg={1}/>;

  function onSubmit(d: any) {
    console.log(d);
  }
  // <AutoTTRecConfigFormComponents/>
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <AutoTTRecConfigFormComponents whichUI={props.whichUI}/>
          <AutoTTRecSubmitAbortButtons/>
        </form>
      </FormProvider>
      {renderCounter}
    </div>
  );
}
