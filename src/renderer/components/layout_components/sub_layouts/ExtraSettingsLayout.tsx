import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { UseFFV1Input } from "../../form_components/UseFFV1Input";
import { EncodeOnlyInput } from "../../form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "../../form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "../../form_components/KeepWindowInput";
import { ChadsoftReadCacheAndSettingsInput } from "../../form_components/ChadsoftReadCacheAndSettingsInput";

export function ExtraSettingsLayout(props: {formComplexity: FormComplexity}) {
  return <>{
    props.formComplexity === FormComplexity.ALL ?
    <>
      <h3>Extra settings</h3>
      <UseFFV1Input/>
      <EncodeOnlyInput/>
      <InputDisplayDontCreateInput/>
      <KeepWindowInput/>
      <ChadsoftReadCacheAndSettingsInput/>
    </> : ""
  }</>
}
