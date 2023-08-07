import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";

export function GhostSourceLayout() {
  return (
    <fieldset>
      <legend>Main and comparison ghost source</legend>
      <MainGhostSourceInput/>
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      <ComparisonGhostSourceInput/>
    </fieldset>
  );
}