import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const TOP_10_TITLE_TYPES = makeReadonlyArraySet(["auto", "manual"] as const);
export type Top10TitleType = ValidValues<typeof TOP_10_TITLE_TYPES>;

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export function Top10TitleInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [top10TitleType, setTop10TitleType] = useState(getValues("top-10-title-type"));

  function updateTop10TitleType(event?: Event) {
    setTop10TitleType(getValues("top-10-title-type"));
  }

  return (
    <div>
      <label htmlFor="top-10-title">Top 10 Title: </label>
      <DeselectableRadioButtonGroup name="top-10-title-type">
        <DeselectableRadioButton labelValue="Autogenerate:" id="top-10-title-type-auto" value="auto" onChange={updateTop10TitleType}/>
        <DeselectableRadioButton labelValue="Supply manually:" id="top-10-title-type-manual" value="manual" onChange={updateTop10TitleType}/>
      </DeselectableRadioButtonGroup>
      {
        top10TitleType === "manual" ? <>
          <input type="text"
            {...register("top-10-title", {required: {
              value: true,
              message: "This input is required."
            }})}
          ></input>
          <SimpleErrorMessage name="top-10-title"/>
        </> : ""
      }
      
    </div>
  );
}
