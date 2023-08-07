import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";

export function GhostSourceLayout() {
  return (
    <fieldset>
      <legend>Ghosts</legend>
      <MainGhostSourceInput/>
      <ComparisonGhostSourceInput/>
    </fieldset>
  );
}
