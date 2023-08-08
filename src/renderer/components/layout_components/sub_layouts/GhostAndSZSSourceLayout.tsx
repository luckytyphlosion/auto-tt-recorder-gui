import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";

export function GhostAndSZSSourceLayout() {
  return (
    <>
      <fieldset>
        <legend>Ghosts and Track SZS</legend>
        <MainGhostSourceInput/>
        <br/>
        <ComparisonGhostSourceInput/>
        <br/>
        <SZSSourceInput/>
      </fieldset>
    </>
  );
}