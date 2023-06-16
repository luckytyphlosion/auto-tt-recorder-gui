import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AutoTTRecArgs } from "../../auto-tt-rec-args";

import ISOWBFSFileInput from "./form_components/ISOWBFSFileInput";
import ChadsoftGhostPageInput from "./form_components/ChadsoftGhostPageInput";
import TrackNameInput from "./form_components/TrackNameInput";
import QualityInput from "./form_components/QualityInput";
import OutputVideoFilenameInput from "./form_components/OutputVideoFilenameInput";

import useRenderCounter from "../RenderCounter";

function AutoTTRecConfigForm() {
  const {register, handleSubmit, setValue} = useForm();
  const [autoTTRecArgs, setAutoTTRecArgs] = useState(new AutoTTRecArgs());
  const renderCounter = useRenderCounter();

  function onSubmit(d: any) {
    console.log(d);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ISOWBFSFileInput autoTTRecArgs={autoTTRecArgs} register={register} setValue={setValue}/>
        <ChadsoftGhostPageInput register={register}/>
        <TrackNameInput register={register}/>
        <QualityInput register={register}/>
        <OutputVideoFilenameInput register={register} setValue={setValue}/>
        <input type="submit"/>
      </form>
      {renderCounter}
    </div>
  );
}

export default AutoTTRecConfigForm;