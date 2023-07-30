import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { SizeBasedEncodeSettingsLayout } from "../sub_layouts/SizeBasedEncodeSettingsLayout";
import { CRFEncodeSettingsLayout } from "../sub_layouts/CRFEncodeSettingsLayout";
import { FormComplexity } from "../FormComplexityLayout";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../../DeselectableRadioButton";

import useRenderCounter from "../../../RenderCounter";

export const ENCODE_TYPES = makeReadonlyArraySet(["crf", "size"] as const);

export type EncodeType = ValidValues<typeof ENCODE_TYPES>;

const PixelFormatInput_Memo = memo(PixelFormatInput);

export function EncodeSettingsLayout(props: {formComplexity: FormComplexity}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [encodeType, setEncodeType] = useState(getValues("encode-type"));
  const renderCounter = useRenderCounter(false, "EncodeTypeInput");

  function updateEncodeType(event?: Event) {
    setEncodeType(getValues("encode-type"));
  }

  return (
    <div>
      <h3>Encoding settings</h3>
      <label htmlFor="encode-type">Encode type: </label>
      <DeselectableRadioButtonGroup name="encode-type">
       <DeselectableRadioButton labelValue="CRF (For YouTube or offline): " id="encode-type-crf" value="crf" onChange={updateEncodeType}/>
        <DeselectableRadioButton labelValue="Size based (for Discord uploads): " id="encode-type-size" value="size" onChange={updateEncodeType}/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
      {
        encodeType === "crf" ? <CRFEncodeSettingsLayout formComplexity={props.formComplexity}/> :
        encodeType === "size" ? <SizeBasedEncodeSettingsLayout formComplexity={props.formComplexity}/> :
        ''
      }
      {
        props.formComplexity === FormComplexity.ALL ? <PixelFormatInput_Memo/> : ""
      }
    </div>
  );
}
