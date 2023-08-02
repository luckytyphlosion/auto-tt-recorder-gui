import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { FadeInAtStartInput } from "../../form_components/FadeInAtStartInput";
import { EndingDelayInput } from "../../form_components/EndingDelayInput";
import { InputDisplayDontCreateInput } from "../../form_components/InputDisplayDontCreateInput";
import { EndingMessageInput } from "../../form_components/EndingMessageInput";

export function PresentationSettingsLayout(props: {formComplexity: FormComplexity, enableFadeInAtStart: boolean}) {
  return <>{
    props.formComplexity > FormComplexity.SIMPLE ?
    <>
      <h3>Presentation settings</h3>
      {
        props.enableFadeInAtStart ? <FadeInAtStartInput/> : ""
      }
      <EndingDelayInput/>
      <EndingMessageInput/>
    </> : ""
  }</>
}
