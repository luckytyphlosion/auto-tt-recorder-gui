import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
import { PixelFormatInput } from "../../form_components/PixelFormatInput";
import { EncodeSettingsContentsLayout } from "../sub_layouts/EncodeSettingsContentsLayout";
import { FormComplexity } from "../FormComplexityLayout";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../../generic_components/DeselectableRadioButton";
import { FieldsetOr } from "../../reusable_components/FieldsetOr";

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
      <FieldsetOr>
        <legend>Encoding settings</legend>
        <div className="like-input-group">
          <div className="grid-contents">
          <label className="start-label">Encode type: </label>
          <div className="start-label-contents">
            <DeselectableRadioButtonGroup name="encode-type" errorBelow={true}>
              <DeselectableRadioButton labelValue="CRF (For YouTube or offline): " id="encode-type-crf" value="crf" onChange={updateEncodeType}/>
              <DeselectableRadioButton labelValue="Size based (for Discord uploads): " id="encode-type-size" value="size" onChange={updateEncodeType}/>
            </DeselectableRadioButtonGroup>
            {renderCounter}
          </div>
          <EncodeSettingsContentsLayout formComplexity={props.formComplexity} encodeType={encodeType}/>
          {
            props.formComplexity === FormComplexity.ALL ? <PixelFormatInput_Memo/> : ""
          }
          </div>
        </div>
      </FieldsetOr>
    </div>
  );
}
