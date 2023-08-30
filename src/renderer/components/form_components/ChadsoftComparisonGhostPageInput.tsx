import React from "react";
import { TextInput } from "../generic_components/TextInput";

import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";

export function ChadsoftComparisonGhostPageInput() {
  return (
    <TextInput name="chadsoft-comparison-ghost-page" startLabel="Comparison ghost page link: " pattern={
      {value: chadsoftGhostPageLinkRegex, message: "Must be a valid chadsoft ghost link."}
    }/>
  );
}
