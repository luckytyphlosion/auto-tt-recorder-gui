import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { CRFEncodeSettingsInput } from "./CRFEncodeSettingsInput";

export function EncodeTypeInput() {
  const {register, getValues} = useFormContext();
  const [encodeType, setEncodeType] = useState(getValues("encode-type"));

  function updateEncodeType(event: Event) {
    setEncodeType(getValues("encode-type"));
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
      {
        encodeType === "crf" ? <CRFEncodeSettingsInput/> : ""
      }
    </div>
  );
}
