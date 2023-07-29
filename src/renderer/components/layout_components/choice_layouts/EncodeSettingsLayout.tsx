import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { SizeBasedEncodeSettingsLayout } from "../sub_layouts/SizeBasedEncodeSettingsLayout";
import { CRFEncodeSettingsLayout } from "../sub_layouts/CRFEncodeSettingsLayout";
import { FormComplexity } from "../FormComplexityLayout";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";

import useRenderCounter from "../../../RenderCounter";

export const ENCODE_TYPES = makeReadonlyArraySet(["crf", "size"] as const);

export type EncodeType = ValidValues<typeof ENCODE_TYPES>;

const PixelFormatInput_Memo = memo(PixelFormatInput);

export function EncodeSettingsLayout(props: {formComplexity: FormComplexity}) {
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
      <h3>Encoding settings</h3>
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
        encodeType === "crf" ? <CRFEncodeSettingsLayout encodeTypeChanged={encodeTypeChanged} formComplexity={props.formComplexity}/> :
        encodeType === "size" ? <SizeBasedEncodeSettingsLayout encodeTypeChanged={encodeTypeChanged} formComplexity={props.formComplexity}/> :
        ''
      }
      {
        props.formComplexity === FormComplexity.ALL ? <PixelFormatInput_Memo/> : ""
      }
    </div>
  );
}
