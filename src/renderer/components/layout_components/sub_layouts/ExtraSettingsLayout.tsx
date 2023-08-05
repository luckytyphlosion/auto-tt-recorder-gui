import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { UseFFV1Input } from "../../form_components/UseFFV1Input";
import { EncodeOnlyInput } from "../../form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "../../form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "../../form_components/KeepWindowInput";
import { ChadsoftReadCacheAndSettingsInput } from "../../form_components/ChadsoftReadCacheAndSettingsInput";
import { IgnoreAutoAddMissingFilesInput } from "../../form_components/IgnoreAutoAddMissingFilesInput";
import { PurgeAutoAddInput } from "../../form_components/PurgeAutoAddInput";

export function ExtraSettingsLayout(props: {formComplexity: FormComplexity}) {
  return (
    <>
      {
        props.formComplexity > FormComplexity.SIMPLE ?
          <>
            <h3>Extra settings</h3>
            <IgnoreAutoAddMissingFilesInput/>
            {
              props.formComplexity === FormComplexity.ALL ?
                <>
                  <PurgeAutoAddInput/>
                  <UseFFV1Input/>
                  <EncodeOnlyInput/>
                  <InputDisplayDontCreateInput/>
                  <KeepWindowInput/>
                  <ChadsoftReadCacheAndSettingsInput/>
                </> : ""
            }
          </> : ""
      }
    </>
  );
}
