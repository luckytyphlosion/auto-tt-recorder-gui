
import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { DolphinResolutionInput } from "../../form_components/DolphinResolutionInput";
import { AspectRatio16By9Input } from "../../form_components/AspectRatio16By9Input";
import { HQTexturesInput } from "../../form_components/HQTexturesInput";
import { NoBackgroundBlurInput } from "../../form_components/NoBackgroundBlurInput";
import { NoBloomInput } from "../../form_components/NoBloomInput";

export function ExtraSettingsLayout(props: {formComplexity: FormComplexity}) {
  return <>
    <h3>Quality settings</h3>
    {
      props.formComplexity > FormComplexity.SIMPLE ?
      <>
        <DolphinResolutionInput enableOutputWidth={true}/>
        <AspectRatio16By9Input/>
        <HQTexturesInput/>
        <NoBackgroundBlurInput/>
        <NoBloomInput/>
      </> : <DolphinResolutionInput enableOutputWidth={false}/>
    }
  </>
}




