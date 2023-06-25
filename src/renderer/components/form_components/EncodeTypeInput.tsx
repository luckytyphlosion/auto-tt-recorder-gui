import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { SizeBasedEncodeSettingsLayout } from "../layout_components/SizeBasedEncodeSettingsLayout";
import { CRFEncodeSettingsLayout } from "../layout_components/CRFEncodeSettingsLayout";
import useRenderCounter from "../../RenderCounter";

export type EncodeType = "crf" | "size";

export function EncodeTypeInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [encodeType, setEncodeType] = useState(getValues("encode-type"));
  const [encodeTypeChanged, setEncodeTypeChanged] = useState(false);
  const renderCounter = useRenderCounter(false, "EncodeTypeInput");

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
        encodeType === "crf" ? <CRFEncodeSettingsLayout encodeTypeChanged={encodeTypeChanged}/> :
        encodeType === "size" ? <SizeBasedEncodeSettingsLayout encodeTypeChanged={encodeTypeChanged}/> :
        ''
      }
    </div>
  );
}
