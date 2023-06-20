import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { SizeBasedEncodeSettingsInput } from "./SizeBasedEncodeSettingsInput";
import { CRFEncodeSettingsInput } from "./CRFEncodeSettingsInput";
import useRenderCounter from "../../RenderCounter";

export function EncodeTypeInput() {
  const {register, getValues} = useFormContext();
  const [encodeType, setEncodeType] = useState(getValues("encode-type"));
  const [encodeTypeChanged, setEncodeTypeChanged] = useState(false);
  const renderCounter = useRenderCounter();

  function updateEncodeType(event: Event) {
    setEncodeType(getValues("encode-type"));
    setEncodeTypeChanged(true);
  }

  return (
    <div>
      <label htmlFor="encode-type">Encode type: </label>
      <label htmlFor="encode-type-crf">CRF (For YouTube or offline): </label>
      <input type="radio" id="encode-type-crf" value="crf"
        {...register("encode-type", {onChange: updateEncodeType})}
      ></input>
      <label htmlFor="encode-type-size">Size based (for Discord uploads): </label>
      <input type="radio" id="encode-type-size" value="size"
        {...register("encode-type", {onChange: updateEncodeType})}
      ></input>
      {renderCounter}
      {
        encodeType === "crf" ? <CRFEncodeSettingsInput encodeTypeChanged={encodeTypeChanged}/> :
        encodeType === "size" ? <SizeBasedEncodeSettingsInput encodeTypeChanged={encodeTypeChanged}/> :
        ''
      }
    </div>
  );
}
