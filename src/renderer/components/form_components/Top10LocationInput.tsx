import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { Top10LocationCountryInput } from "./Top10LocationCountryInput";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { EmptyGridRow } from "../reusable_components/EmptyGridRow";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const TOP_10_LOCATION_REGIONS = makeReadonlyArraySet(["worldwide", "regional", "country"] as const);
export type Top10LocationRegion = ValidValues<typeof TOP_10_LOCATION_REGIONS>;

export function Top10LocationInput() {
  const {getValues, formState} = useFormContextAutoTT();
  const [top10LocationRegion, setTop10LocationRegion] = useState(getValues("top-10-location-region"));
  //const [showErrorMessage, setShowErrorMessage] = useState(true);
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  function updateTop10LocationRegion(event?: Event) {
    let newTop10LocationRegion = getValues("top-10-location-region");
    setTop10LocationRegion(newTop10LocationRegion);
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-location-region">Region: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="top-10-location-region" nameAsId={true} errorBelow={true} onChange={updateTop10LocationRegion}>
          <option value="worldwide">Worldwide</option>
          <option value="regional">Regional</option>
          <option value="country">Country</option>
        </DeselectableDropdown>
      </div>
      {
        isValueOrFILLMEIsValue(top10LocationRegion, "regional") ? <Top10LocationRegionalInput top10LocationRegion={top10LocationRegion}/> : ""
      }
      {
        isValueOrFILLMEIsValue(top10LocationRegion, "country") ? <Top10LocationCountryInput top10LocationRegion={top10LocationRegion}/> : ""
      }
    </div>
  );
}
