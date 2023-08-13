
import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { DolphinResolutionInput } from "../../form_components/DolphinResolutionInput";
import { AspectRatio16By9Input } from "../../form_components/AspectRatio16By9Input";
import { HQTexturesInput } from "../../form_components/HQTexturesInput";
import { NoBackgroundBlurInput } from "../../form_components/NoBackgroundBlurInput";
import { NoBloomInput } from "../../form_components/NoBloomInput";
import { CRFValueInput } from "../../form_components/CRFValueInput";
import { FieldsetOr } from "../../FieldsetOr";

export function QualitySettingsLayout(props: {formComplexity: FormComplexity, isNoEncode: boolean}) {
  return <div>
    <FieldsetOr>
      <legend>Quality settings</legend>
      <div className="like-input-group">
        {
          props.formComplexity > FormComplexity.SIMPLE ?
          <>
            <DolphinResolutionInput enableOutputWidth={!props.isNoEncode} formComplexity={props.formComplexity}/>
            {!props.isNoEncode && props.formComplexity === FormComplexity.ALL ? <AspectRatio16By9Input/> : ""}
            <NoBackgroundBlurInput/>
            <NoBloomInput/>
          </> : <DolphinResolutionInput enableOutputWidth={false} formComplexity={props.formComplexity}/>
        }
      </div>
    </FieldsetOr>
  </div>
}




