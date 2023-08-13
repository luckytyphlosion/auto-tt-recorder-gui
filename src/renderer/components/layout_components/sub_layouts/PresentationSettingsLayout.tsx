import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { FadeInAtStartInput } from "../../form_components/FadeInAtStartInput";
import { EndingDelayInput } from "../../form_components/EndingDelayInput";
import { InputDisplayInput } from "../../form_components/InputDisplayInput";
import { EndingMessageInput } from "../../form_components/EndingMessageInput";
import { FieldsetOr } from "../../FieldsetOr";

export function PresentationSettingsLayout(props: {formComplexity: FormComplexity, enableFadeInAtStart: boolean}) {
  return <>{
    props.formComplexity > FormComplexity.SIMPLE ?
    <div>
      <FieldsetOr>
        <legend>Presentation settings</legend>
        <div>
          <div className="like-input-group">
            <InputDisplayInput/>
            {
              props.enableFadeInAtStart ? <FadeInAtStartInput/> : ""
            }
            <EndingDelayInput/>
            <EndingMessageInput/>
          </div>
        </div>
      </FieldsetOr>
    </div> : ""
  }</>
}
