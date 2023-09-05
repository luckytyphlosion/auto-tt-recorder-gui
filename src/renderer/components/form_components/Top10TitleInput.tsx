import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { Top10TitleManualInput } from "./Top10TitleManualInput";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const TOP_10_TITLE_TYPES = makeReadonlyArraySet(["auto", "manual"] as const);
export type Top10TitleType = ValidValues<typeof TOP_10_TITLE_TYPES>;

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export function Top10TitleInput() {
  const {getValues} = useFormContextAutoTT();
  const [top10TitleType, setTop10TitleType] = useState(getValues("top-10-title-type"));
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  function updateTop10TitleType(event?: Event) {
    setTop10TitleType(getValues("top-10-title-type"));
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-title">Top 10 Title: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="top-10-title-type" errorBelow={true}>
          <DeselectableRadioButton labelValue="Autogenerate:" id="top-10-title-type-auto" value="auto" onChange={updateTop10TitleType}/>
          <DeselectableRadioButton labelValue="Supply manually:" id="top-10-title-type-manual" value="manual" onChange={updateTop10TitleType}/>
        </DeselectableRadioButtonGroup>
      </div>
      {
        isValueOrFILLMEIsValue(top10TitleType, "manual") ? <Top10TitleManualInput/> : ""
      }
    </div>
  );
}
