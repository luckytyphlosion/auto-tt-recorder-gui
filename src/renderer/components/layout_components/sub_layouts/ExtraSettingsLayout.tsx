import React from "react";

import { FormComplexity } from "../FormComplexityLayout";
import { UseFFV1Input } from "../../form_components/UseFFV1Input";
import { EncodeOnlyInput } from "../../form_components/EncodeOnlyInput";
import { InputDisplayDontCreateInput } from "../../form_components/InputDisplayDontCreateInput";
import { KeepWindowInput } from "../../form_components/KeepWindowInput";
import { ChadsoftReadCacheInputAndSettingsLayout } from "./ChadsoftReadCacheInputAndSettingsLayout";
import { IgnoreAutoAddMissingFilesInput } from "../../form_components/IgnoreAutoAddMissingFilesInput";
import { PurgeAutoAddInput } from "../../form_components/PurgeAutoAddInput";
import { FieldsetOr } from "../../reusable_components/FieldsetOr";

export function ExtraSettingsLayout(props: {formComplexity: FormComplexity, isNoEncode: boolean}) {
  return (
    <>
      {
        props.formComplexity > FormComplexity.SIMPLE ?
          <FieldsetOr>
            <legend>Extra settings</legend>
            <div className="like-input-group">
              <IgnoreAutoAddMissingFilesInput/>
              {
                props.formComplexity === FormComplexity.ALL ? <>
                  <PurgeAutoAddInput/>
                  <UseFFV1Input/>
                  <EncodeOnlyInput/>
                </> : ""
              }
              {
                props.formComplexity === FormComplexity.ALL && !props.isNoEncode ? <>
                  <InputDisplayDontCreateInput/>
                </> : ""
              }
              {
                props.formComplexity === FormComplexity.ALL ? <>
                  <KeepWindowInput/>
                  <ChadsoftReadCacheInputAndSettingsLayout/>
                </> : ""
              }
            </div>
          </FieldsetOr> : ""
      }
    </>
  );
}
